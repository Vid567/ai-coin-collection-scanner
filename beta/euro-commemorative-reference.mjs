// €2 commemorative recognition/research layer.
// Authoritative basis: European Commission Official Journal; ECB catalogue is used as a practical official index.
export const EURO_COMM_ROOT='https://www.ecb.europa.eu/euro/coins/comm/html/index.en.html';
export const EU_COMM_ROOT='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/commemorative-coins_en';
export const EURO_COMM_YEAR_CATALOGUE=Object.fromEntries(Array.from({length:22},(_,i)=>{const year=2004+i;return [year,`https://www.ecb.europa.eu/euro/coins/comm/html/comm_${year}.en.html`];}));
const joint=[
 {year:2007,subject:'50th anniversary of the Treaty of Rome',clues:'Treaty of Rome; open book; Campidoglio paving'},
 {year:2009,subject:'10 years of Economic and Monetary Union',clues:'1999-2009; EMU; WWU; UEM; human figure; euro symbol'},
 {year:2012,subject:'10 years of euro banknotes and coins',clues:'2002-2012; euro symbol; citizens; trade; industry'},
 {year:2015,subject:'30 years of the EU flag',clues:'1985-2015; European flag; 12 stars'},
 {year:2022,subject:'35 years of the Erasmus Programme',clues:'ERASMUS PROGRAMME; 1987-2022; Erasmus portrait'}
];
const exact=[
 {country:'Greece',year:2004,subject:'Olympic Games in Athens 2004',clues:'ATHENS 2004; Olympic; discobolus; Greece'},
 {country:'Germany',year:2024,subject:'Mecklenburg-Vorpommern — Königsstuhl',clues:'MECKLENBURG VORPOMMERN; KÖNIGSSTUHL; D; 2024; A; D; F; G; J'},
 {country:'Germany',year:2025,subject:'Saarland — Saarschleife',clues:'SAARLAND; Saarschleife; D; 2025; A; D; F; G; J'},
 {country:'Belgium',year:2025,subject:'National Lottery of Belgium',clues:'loterie nationale; loterij; Fortuna; BE; 2025'},
 {country:'Lithuania',year:2025,subject:'Lithuanian Ethnographic Regions — Lithuania Minor',clues:'LIETUVA; MAŽOJI LIETUVA; Vydūnas; 2025'},
 {country:'Slovenia',year:2025,subject:'100th anniversary of birth of Miki Muster',clues:'SLOVENIJA; MIKI; MUSTER; 1925; 2025'},
 {country:'Monaco',year:2025,subject:'Marquisat des Baux',clues:'MONACO; MARQUISAT DES BAUX; Les Baux'},
 {country:'Greece',year:2025,subject:'200 years from the death of Laskarina Bouboulina',clues:'ΛΑΣΚΑΡΙΝΑΣ ΜΠΟΥΜΠΟΥΛΙΝΑΣ; ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ; Bouboulina; 2025'}
];
function mk(r,country=r.country||'Euro area joint issue'){
 const source=EURO_COMM_YEAR_CATALOGUE[r.year]||EURO_COMM_ROOT;
 return {country,currency:'Euro',denomination:'2 euro',yearFrom:r.year,yearTo:r.year,type:`€2 commemorative — ${r.subject}`,design:r.subject,clues:r.clues,authority:'European Commission / ECB',source,catalogue:'Official €2 commemorative',research:true,researchPriority:'Interesting',researchReason:'Possible official €2 commemorative issue. Confirm issuing country, exact year, design and condition.'};
}
export const EURO_JOINT_COMM_REFERENCE_DB=joint.map(r=>mk(r));
export const EURO_EXACT_COMM_REFERENCE_DB=exact.map(r=>mk(r,r.country));
export const EURO_COMM_REFERENCE_DB=[...EURO_JOINT_COMM_REFERENCE_DB,...EURO_EXACT_COMM_REFERENCE_DB];
function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/€/g,'euro');}
function score(record,r){let s=0;const country=norm(record.country),text=norm([record.referenceClues,record.obverseDesign,record.reverseDesign,record.notes].filter(Boolean).join(' ')),year=Number(record.year)||null;if(year===r.yearFrom)s+=8;if(country&&norm(r.country)!=='euro area joint issue'&&country===norm(r.country))s+=8;for(const k of norm(r.clues).split(';').map(x=>x.trim()).filter(x=>x.length>=2))if(text.includes(k))s+=3;return s;}
export function matchEuroCommemorative(record={}){
 const year=Number(record.year)||null;if(!year)return null;
 const ranked=EURO_COMM_REFERENCE_DB.map(r=>({r,s:score(record,r)})).filter(x=>x.s>=11).sort((a,b)=>b.s-a.s);
 return ranked[0]?.r||null;
}
export function classifyEuroTwo(record={}){
 const denomination=norm(record.denomination).trim();const currency=norm(record.currency);
 if(!(denomination==='2 euro'||denomination==='2 euros'||denomination==='2eur'||denomination==='2 eur')||!(currency.includes('euro')||!currency))return null;
 const exactHit=matchEuroCommemorative(record);
 if(exactHit)return {researchPriority:'Interesting',researchReason:`Possible official €2 commemorative: ${exactHit.design}. Verify against the official ${exactHit.yearFrom} catalogue.`,referenceAuthority:'European Commission / ECB',referenceSource:exactHit.source,coinType:exactHit.type};
 const year=Number(record.year)||null;const yearSource=EURO_COMM_YEAR_CATALOGUE[year]||EURO_COMM_ROOT;
 const text=norm([record.referenceClues,record.obverseDesign,record.reverseDesign,record.notes].filter(Boolean).join(' '));
 const regularWords=['federal eagle','beatrix','willem-alexander','philippe','albert ii','harp','eesti','europa and the bull','double cross','cloudberries'];
 if(regularWords.some(k=>text.includes(norm(k))))return {researchPriority:'Normal',researchReason:'Visible clues are consistent with a regular €2 national side; still verify year and country.',referenceAuthority:'European Commission',referenceSource:EU_COMM_ROOT,coinType:'Regular €2 circulation'};
 return {researchPriority:'Possibly interesting',researchReason:'€2 is the circulating euro denomination used for commemorative national-side designs. Exact design is unresolved; compare it with the official catalogue for the coin year.',referenceAuthority:'European Commission / ECB',referenceSource:yearSource,coinType:'€2 — commemorative check required'};
}
export function euroCommemorativeRows(){return EURO_COMM_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Denomination:r.denomination,Year:r.yearFrom,Type:r.type,Design:r.design,'Recognition Clues':r.clues,Authority:r.authority,Source:r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
export function euroCommemorativeStats(){return {knownIssues:EURO_COMM_REFERENCE_DB.length,jointIssues:EURO_JOINT_COMM_REFERENCE_DB.length,yearCatalogues:Object.keys(EURO_COMM_YEAR_CATALOGUE).length};}
