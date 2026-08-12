import { EUROPE_BATCH01_REFERENCE_DB } from './europe-batch01-reference.mjs';
import { EUROPE_BATCH02_REFERENCE_DB } from './europe-batch02-reference.mjs';
import { EUROPE_BATCH03_REFERENCE_DB } from './europe-batch03-reference.mjs';

const sourceRows=[...EUROPE_BATCH01_REFERENCE_DB,...EUROPE_BATCH02_REFERENCE_DB,...EUROPE_BATCH03_REFERENCE_DB];

function inferPeriod(row){
  if(row.period)return row.period;
  if(row.series&&/historical/i.test(row.series))return 'Historical coinage';
  if(row.yearFrom&&row.yearFrom<1950)return `Historical / long-running ${row.currency}`;
  return `Modern ${row.currency}`;
}

function inferMintMark(row){
  if(row.mintMark)return row.mintMark;
  return 'Not resolved at batch level — inspect mint/privy mark and verify exact issue in the official source';
}

function inferMetal(row){
  if(row.metal)return row.metal;
  return 'Varies by denomination / series — exact composition requires denomination-level verification';
}

function inferDesign(side,row){
  const existing=side==='obverse'?row.obverse:row.reverse;
  if(existing)return existing;
  if(row.type==='Historical')return `${side==='obverse'?'Obverse':'Reverse'} varies by historical period / ruler — verify exact type`;
  if(/commemorative|collector|special/i.test(row.type||''))return `${side==='obverse'?'Obverse':'Reverse'} issue-specific commemorative / collector design — verify exact issue`;
  return `${side==='obverse'?'National / issuer-side':'Denomination / series-side'} design — verify exact series and year`;
}

function statusFor(row){
  const exactPhysical=Number.isFinite(Number(row.weight))&&Number.isFinite(Number(row.diameter))&&row.metal&&row.obverse&&row.reverse;
  return exactPhysical?'Exact physical metadata present':'Series-level official reference; exact physical specification still requires denomination/year verification';
}

export const EUROPE_DEEP_REFERENCE_DB=sourceRows.map(row=>({
  country:row.country,
  historicalCurrency:row.currency,
  currency:row.currency,
  period:inferPeriod(row),
  series:row.series||row.period||`${row.country} coinage`,
  denomination:row.denomination,
  yearFrom:row.yearFrom??'',
  yearTo:row.yearTo??'',
  mintMark:inferMintMark(row),
  metal:inferMetal(row),
  weight:Number.isFinite(Number(row.weight))?Number(row.weight):null,
  diameter:Number.isFinite(Number(row.diameter))?Number(row.diameter):null,
  obverse:inferDesign('obverse',row),
  reverse:inferDesign('reverse',row),
  edge:row.edge||'Not resolved at batch level — verify exact issue',
  coinClass:row.type||'Regular circulation',
  type:row.type||'Regular circulation',
  authority:row.authority,
  source:row.source,
  researchPriority:row.researchPriority||row.priority||'Normal',
  researchReason:row.researchReason||row.reason||'Verify exact issue against official source.',
  metadataStatus:statusFor(row)
}));

export function deepRowsForCountry(country){return EUROPE_DEEP_REFERENCE_DB.filter(row=>row.country===country);}
export function europeDepthStats(){
  const exact=EUROPE_DEEP_REFERENCE_DB.filter(r=>r.metadataStatus==='Exact physical metadata present').length;
  return {records:EUROPE_DEEP_REFERENCE_DB.length,countries:new Set(EUROPE_DEEP_REFERENCE_DB.map(r=>r.country)).size,exact,needsPhysicalVerification:EUROPE_DEEP_REFERENCE_DB.length-exact};
}

export function europeDepthExcelRows(){return EUROPE_DEEP_REFERENCE_DB.map(r=>({
  Country:r.country,
  'Historical Currency':r.historicalCurrency,
  Period:r.period,
  Series:r.series,
  Denomination:r.denomination,
  'Year From':r.yearFrom,
  'Year To':r.yearTo,
  'Mint / Privy Mark':r.mintMark,
  Metal:r.metal,
  'Weight (g)':r.weight??'',
  'Diameter (mm)':r.diameter??'',
  Obverse:r.obverse,
  Reverse:r.reverse,
  Edge:r.edge,
  'Regular / Commemorative':r.coinClass,
  'Official Authority':r.authority,
  'Official Source':r.source,
  'Research Priority':r.researchPriority,
  'Research Reason':r.researchReason,
  'Metadata Status':r.metadataStatus
}));}
