export const INVENTORY_FIELDS = [
  'Coin ID','Obverse Photo Number','Obverse Filename','Reverse Photo Number','Reverse Filename','Edge Photo Number','Edge Filename',
  'Country / Issuing Authority','Year','Approximate Period','Denomination','Currency','Mint Mark','Metal / Possible Composition',
  'Diameter (mm)','Weight (g)','Condition','Obverse Design','Reverse Design','Edge Description','Quantity','Confidence',
  'Coin Type','Public Reference Match','Reference Authority','Public Reference Source','Research Priority','Research Reason','Further Research','Research Source 1','Research Source 2','Research Source 3','Collector Notes','Information Status'
];

export function photoNumber(index){return `Photo ${String(index+1).padStart(3,'0')}`;}
export function nextCoinId(records){
  const used=records.map(r=>Number(String(r.id||'').replace(/\D/g,''))||0);
  return `C${String(Math.max(0,...used)+1).padStart(3,'0')}`;
}
export function partitionPhotoFiles(files,currentCount=0,maximum=30){
  const types=new Set(['image/jpeg','image/png','image/webp']);
  const available=Math.max(0,maximum-currentCount);
  const supported=[...files].filter(f=>types.has(f.type));
  return {accepted:supported.slice(0,available),unsupported:[...files].filter(f=>!types.has(f.type)),overLimit:Math.max(0,supported.length-available)};
}
export function createRecord(records=[], obversePhotoId='', reversePhotoId='', edgePhotoId=''){
  return {
    id:nextCoinId(records), obversePhotoId, reversePhotoId, edgePhotoId,
    country:'Unknown',year:'',period:'Unknown',denomination:'',currency:'',mintMark:'',metal:'',diameter:'',weight:'',condition:'Uncertain',
    obverseDesign:'',reverseDesign:'',edgeDescription:'',referenceClues:'',coinType:'',referenceMatch:'Not checked',referenceAuthority:'',referenceSource:'',researchPriority:'Normal',researchReason:'',researchSource1:'',researchSource2:'',researchSource3:'',quantity:1,confidence:'Needs review',furtherResearch:'No',notes:'',
    status:'AI not connected — manual review'
  };
}
function ref(photo){return photo?{number:photo.number,name:photo.name}:{number:'',name:''};}
export function exportRows(records,photos){return records.map(record=>{
  const o=ref(photos.find(p=>p.id===record.obversePhotoId));
  const r=ref(photos.find(p=>p.id===record.reversePhotoId));
  const e=ref(photos.find(p=>p.id===record.edgePhotoId));
  return {
    'Coin ID':record.id,'Obverse Photo Number':o.number,'Obverse Filename':o.name,'Reverse Photo Number':r.number,'Reverse Filename':r.name,
    'Edge Photo Number':e.number,'Edge Filename':e.name,'Country / Issuing Authority':record.country,'Year':record.year,'Approximate Period':record.period,
    'Denomination':record.denomination,'Currency':record.currency,'Mint Mark':record.mintMark,'Metal / Possible Composition':record.metal,
    'Diameter (mm)':record.diameter,'Weight (g)':record.weight,'Condition':record.condition,'Obverse Design':record.obverseDesign,'Reverse Design':record.reverseDesign,
    'Edge Description':record.edgeDescription,'Quantity':Number(record.quantity)||1,'Confidence':record.confidence,'Coin Type':record.coinType||'',
    'Public Reference Match':record.referenceMatch||'Not checked','Reference Authority':record.referenceAuthority||'','Public Reference Source':record.referenceSource||'','Research Priority':record.researchPriority||'Normal','Research Reason':record.researchReason||'',
    'Further Research':record.furtherResearch,'Research Source 1':record.researchSource1||'','Research Source 2':record.researchSource2||'','Research Source 3':record.researchSource3||'','Collector Notes':record.notes,'Information Status':record.status
  };
});}
export function csvEscape(value){return `"${String(value??'').replaceAll('"','""')}"`;}
export function toCsv(records,photos){const rows=exportRows(records,photos);return '\uFEFF'+[INVENTORY_FIELDS,...rows.map(row=>INVENTORY_FIELDS.map(f=>row[f]))].map(row=>row.map(csvEscape).join(',')).join('\r\n');}
