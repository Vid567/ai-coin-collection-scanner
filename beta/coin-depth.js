import './coin-batch03.js';
import { EUROPE_DEEP_REFERENCE_DB, europeDepthExcelRows, europeDepthStats } from './europe-depth-reference.mjs';

const norm=v=>String(v||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/€/g,'euro').replace(/\s+/g,' ');
const field=(card,key)=>card?.querySelector(`[data-field="${key}"]`)?.value||'';
const setField=(card,key,value)=>{const el=card?.querySelector(`[data-field="${key}"]`);if(!el||value==null||value==='')return;el.value=String(value);el.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}));};
const yearOf=v=>{const m=String(v||'').match(/\b(18|19|20)\d{2}\b/);return m?Number(m[0]):null;};

function candidates(snapshot){
 const country=norm(snapshot.country),denom=norm(snapshot.denomination),year=yearOf(snapshot.year);
 return EUROPE_DEEP_REFERENCE_DB.map(row=>{
  let score=0;
  if(country&&norm(row.country)===country)score+=20;else if(country&&norm(row.country).includes(country))score+=12;
  if(denom&&norm(row.denomination)===denom)score+=12;else if(denom&&norm(row.denomination).includes(denom))score+=6;
  if(year&&row.yearFrom!==''&&year>=Number(row.yearFrom)&&year<=Number(row.yearTo||9999))score+=8;
  return {row,score};
 }).filter(x=>x.score>=20).sort((a,b)=>b.score-a.score);
}

function applyDeep(card,hit){
 const r=hit.row;
 setField(card,'period',r.period);setField(card,'mintMark',r.mintMark);setField(card,'metal',r.metal);
 if(r.weight!=null)setField(card,'weight',r.weight);if(r.diameter!=null)setField(card,'diameter',r.diameter);
 setField(card,'obverseDesign',r.obverse);setField(card,'reverseDesign',r.reverse);setField(card,'edgeDescription',r.edge);
 setField(card,'referenceAuthority',r.authority);setField(card,'referenceSource',r.source);
 setField(card,'researchPriority',r.researchPriority);setField(card,'researchReason',`${r.researchReason} Metadata: ${r.metadataStatus}.`);
}

document.querySelector('#records')?.addEventListener('click',event=>{
 if(!event.target.closest('button[data-action="verify-reference"]'))return;
 const card=event.target.closest('.record-card');if(!card)return;const id=card.dataset.id;
 const snapshot={country:field(card,'country'),denomination:field(card,'denomination'),year:field(card,'year')};
 const hits=candidates(snapshot);if(!hits.length)return;
 const best=hits[0];
 setTimeout(()=>{const fresh=document.querySelector(`.record-card[data-id="${CSS.escape(id)}"]`);if(fresh)applyDeep(fresh,best);},0);
});

function appendSheet(wb,name,rows){if(!rows.length||wb.SheetNames.includes(name))return;const ws=XLSX.utils.json_to_sheet(rows);ws['!cols']=Object.keys(rows[0]).map(k=>({wch:Math.min(65,Math.max(14,k.length+2))}));XLSX.utils.book_append_sheet(wb,ws,name);}
function install(){if(!globalThis.XLSX?.writeFile||XLSX.writeFile.__depthHook)return false;const prev=XLSX.writeFile.bind(XLSX);const hook=(wb,...args)=>{appendSheet(wb,'Europe Deep Reference',europeDepthExcelRows());return prev(wb,...args);};hook.__depthHook=true;XLSX.writeFile=hook;return true;}
if(!install())window.addEventListener('load',install,{once:true});
const status=document.querySelector('#reference-db-status');if(status){const s=europeDepthStats();setTimeout(()=>{if(!status.textContent.includes('Deep European schema'))status.textContent+=` Deep European schema: ${s.records} records across ${s.countries} batch countries; ${s.exact} exact physical rows and ${s.needsPhysicalVerification} rows explicitly marked for exact physical verification.`;},0);}
