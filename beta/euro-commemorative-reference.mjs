// €2 commemorative recognition/research layer.
// Authoritative basis: European Commission Official Journal; ECB catalogue is used as a practical official index.
export const EURO_COMM_ROOT='https://www.ecb.europa.eu/euro/coins/comm/html/index.en.html';
export const EU_COMM_ROOT='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/commemorative-coins_en';
const joint=[
 {year:2007,subject:'50th anniversary of the Treaty of Rome',clues:'Treaty of Rome; open book; Campidoglio paving'},
 {year:2009,subject:'10 years of Economic and Monetary Union',clues:'1999-2009; EMU/WWU/UEM; human figure and euro symbol'},
 {year:2012,subject:'10 years of euro banknotes and coins',clues:'2002-2012; euro symbol; citizens / trade / industry imagery'},
 {year:2015,subject:'30 years of the EU flag',clues:'1985-2015; European flag; 12 stars'},
 {year:2022,subject:'35 years of the Erasmus Programme',clues:'ERASMUS PROGRAMME; 1987-2022; Erasmus portrait'}
];
export const EURO_JOINT_COMM_REFERENCE_DB=joint.map(x=>({country:'Euro area joint issue',currency:'Euro',denomination:'2 euro',yearFrom:x.year,yearTo:x.year,type:`€2 commemorative — ${x.subject}`,design:x.subject,clues:x.clues,authority:'European Commission / ECB',source:EURO_COMM_ROOT,catalogue:'Official €2 commemorative',research:true,researchPriority:'Interesting',researchReason:'Possible official €2 commemorative issue. Confirm issuing country, exact year, design and condition.'}));
export function classifyEuroTwo(record={}){
 const denomination=String(record.denomination||'').toLowerCase().replace('€','euro').trim();
 const currency=String(record.currency||'').toLowerCase();
 if(!(denomination==='2 euro'||denomination==='2 euros'||denomination==='2eur'||denomination==='2 eur')||!(currency.includes('euro')||!currency))return null;
 const text=[record.referenceClues,record.obverseDesign,record.reverseDesign,record.notes].filter(Boolean).join(' ').toLowerCase();
 const year=Number(record.year)||null;
 const jointHit=joint.find(j=>year===j.year&&j.clues.toLowerCase().split(';').some(k=>k.trim()&&text.includes(k.trim())));
 if(jointHit)return {researchPriority:'Interesting',researchReason:`Possible joint €2 commemorative: ${jointHit.subject}. Verify issuing country and official design.`,referenceAuthority:'European Commission / ECB',referenceSource:EURO_COMM_ROOT,coinType:`€2 commemorative — ${jointHit.subject}`};
 const regularWords=['eagle','federal eagle','beatrix','willem-alexander','philippe','albert ii','harp','eesti','europa and the bull','double cross','cloudberries'];
 if(regularWords.some(k=>text.includes(k)))return {researchPriority:'Normal',researchReason:'Visible clues are consistent with a regular €2 national side; still verify year and country.',referenceAuthority:'European Commission',referenceSource:EU_COMM_ROOT,coinType:'Regular €2 circulation'};
 return {researchPriority:'Possibly interesting',researchReason:'€2 is the only circulating euro denomination used for commemorative national-side designs. Exact design is unresolved; compare it with the official EU/ECB commemorative catalogue.',referenceAuthority:'European Commission / ECB',referenceSource:EURO_COMM_ROOT,coinType:'€2 — commemorative check required'};
}
export function euroCommemorativeRows(){return EURO_JOINT_COMM_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Denomination:r.denomination,Year:r.yearFrom,Type:r.type,Design:r.design,'Recognition Clues':r.clues,Authority:r.authority,Source:r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
