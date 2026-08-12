import './coin-batch02.js';
import { EUROPE_BATCH03, EUROPE_BATCH03_REFERENCE_DB, europeBatch03Stats } from './europe-batch03-reference.mjs';

const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/€/g,'euro').replace(/\s+/g,' ');
const field=(card,key)=>card?.querySelector(`[data-field="${key}"]`)?.value||'';
const setField=(card,key,value)=>{const el=card?.querySelector(`[data-field="${key}"]`);if(!el||value==null||value==='')return;el.value=String(value);el.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));};
const parseYear=v=>{const m=String(v||'').match(/\b(18|19|20)\d{2}\b/);return m?Number(m[0]):null;};
const countries=new Map(EUROPE_BATCH03.map(c=>[c.country,{...c,database:EUROPE_BATCH03_REFERENCE_DB.filter(r=>r.country===c.country)}]));

function identify(snapshot){
 const countryText=norm(snapshot.country);
 const byName=[...countries.values()].filter(c=>countryText&&c.aliases.some(a=>countryText.includes(norm(a))));
 if(byName.length===1)return byName[0];
 const currencyText=norm(snapshot.currency);
 const byCurrency=[...countries.values()].filter(c=>c.matchByCurrency&&currencyText&&(currencyText===norm(c.currency)||norm(c.currency).includes(currencyText)||currencyText.includes(norm(c.currency))));
 return byCurrency.length===1?byCurrency[0]:null;
}
function choose(country,snapshot){
 const denomination=norm(snapshot.denomination);const year=parseYear(snapshot.year);
 const best=country.database.filter(r=>r.type==='Regular circulation').map(row=>({row,score:(denomination&&denomination===norm(row.denomination)?8:0)+(year&&year>=Number(row.yearFrom)&&year<=Number(row.yearTo)?6:0)})).sort((a,b)=>b.score-a.score)[0];
 if(best?.score>=8)return best;
 const historical=country.database.find(r=>r.type==='Historical');
 if(historical&&year&&year<Number(country.yearFrom||9999))return {row:historical,score:11};
 return null;
}
function apply(card,hit){const r=hit.row;setField(card,'country',r.country);setField(card,'currency',r.currency);setField(card,'coinType',`${r.denomination} — ${r.series}`);setField(card,'referenceMatch',`Matched to official ${r.authority} reference`);setField(card,'referenceAuthority',r.authority);setField(card,'referenceSource',r.source);setField(card,'researchPriority',r.researchPriority);setField(card,'researchReason',r.researchReason);setField(card,'confidence',hit.score>=14?'High':'Medium');}

document.querySelector('#records')?.addEventListener('click',event=>{
 const button=event.target.closest('button[data-action="verify-reference"]');if(!button)return;
 const card=button.closest('.record-card');if(!card)return;const id=card.dataset.id;
 const snapshot={country:field(card,'country'),currency:field(card,'currency'),denomination:field(card,'denomination'),year:field(card,'year')};
 const country=identify(snapshot);if(!country)return;const hit=choose(country,snapshot);
 setTimeout(()=>{const fresh=document.querySelector(`.record-card[data-id="${CSS.escape(id)}"]`);if(!fresh)return;if(hit)apply(fresh,hit);else{setField(fresh,'country',country.country);setField(fresh,'currency',country.currency);setField(fresh,'referenceAuthority',country.authority);setField(fresh,'referenceSource',country.source);}},0);
});

const rows=data=>data.map(r=>({Country:r.country,'Historical Currency':r.currency,'Period / Series':r.series,Denomination:r.denomination,'Year From':r.yearFrom,'Year To':r.yearTo,'Regular / Commemorative':r.type,'Official Authority':r.authority,'Official Source':r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));
function appendSheet(wb,name,data){if(!data?.length||wb.SheetNames.includes(name))return;const ws=XLSX.utils.json_to_sheet(data);ws['!cols']=Object.keys(data[0]).map(k=>({wch:Math.min(60,Math.max(14,k.length+2))}));XLSX.utils.book_append_sheet(wb,ws,name);}
function installExcelHook(){if(!globalThis.XLSX?.writeFile||XLSX.writeFile.__batch03Hook)return false;const prev=XLSX.writeFile.bind(XLSX);const hook=(wb,...args)=>{for(const c of countries.values())appendSheet(wb,`${c.country} Historical`.slice(0,31),rows(c.database));return prev(wb,...args);};hook.__batch03Hook=true;XLSX.writeFile=hook;return true;}
if(!installExcelHook())window.addEventListener('load',installExcelHook,{once:true});
const status=document.querySelector('#reference-db-status');if(status){const s=europeBatch03Stats();setTimeout(()=>{if(!status.textContent.includes('Europe batch 3 coverage'))status.textContent+=` Europe batch 3 coverage: ${s.countries} countries, ${s.records} reference records.`;},0);}
