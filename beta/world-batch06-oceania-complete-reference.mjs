import { WORLD_BATCH06_OCEANIA_REFERENCE_DB as BASE_DB, WORLD_BATCH06_OCEANIA_COUNTRIES as BASE_COUNTRIES } from './world-batch06-oceania-reference.mjs';

const RBNZ_TIMELINE='https://www.rbnz.govt.nz/museum/currency-timeline';
const KIRIBATI='https://www.dfat.gov.au/geo/kiribati/kiribati-country-brief';
const NAURU='https://www.nauru.gov.nr/about-nauru/visiting-nauru/currency.aspx';
const TUVALU='https://www.perthmint.com/news/collector/coin-collecting/explaining-tuvalus-role-in-modern-coins/';
const PALAU='https://www.doi.gov/oia/islands/palau';
const MARSHALL='https://www.doi.gov/oia/islands/marshallislands';
const FSM='https://www.doi.gov/oia/islands/fsm';

const row=(country,currency,period,series,denomination,yearFrom,yearTo,o={})=>({country,currency,period,series,denomination,yearFrom,yearTo,mintMark:o.mintMark||'',metal:o.metal||'',weight:o.weight??null,diameter:o.diameter??null,obverse:o.obverse||'',reverse:o.reverse||'',edge:o.edge||'',type:o.type||'Currency-use reference',authority:o.authority,source:o.source,researchPriority:o.researchPriority||'Normal',researchReason:o.researchReason||'Currency-use baseline; escalate only when an identifiable local, commemorative, precious-metal or historical issue is present.',metadataStatus:o.metadataStatus||'Official currency-use reference; no issue-level physical specification claimed',scope:o.scope||'Modern compact baseline'});

const patchedBase=BASE_DB.map(r=>r.country==='New Zealand'&&r.source.includes('/money-and-cash/-')?{...r,source:RBNZ_TIMELINE}:r);

const EXTRA_DB=[
 row('Kiribati','Australian dollar (AUD)','Independent-state currency use','Australian dollar legal-tender circulation','Australian circulating denominations',1979,2026,{authority:'Australian Government / Kiribati country brief',source:KIRIBATI,researchReason:'Australian currency is legal tender in Kiribati. Do not infer a separate Kiribati circulation type unless the coin itself carries Kiribati-specific issuing evidence.'}),
 row('Nauru','Australian dollar (AUD)','Independent-state currency use','Australian dollar legal-tender circulation','Australian circulating denominations',1968,2026,{authority:'Government of the Republic of Nauru',source:NAURU,researchReason:'Nauru government confirms Australian dollars are legal tender. Ordinary Australian coins remain baseline; Nauru-specific collector issues require separate evidence.'}),
 row('Tuvalu','Australian dollar / Tuvalu dollar','Post-independence local coinage','Tuvalu national circulation coinage','1c / 2c / 5c / 10c / 20c / 50c / $1',1976,1990,{authority:'The Perth Mint / Tuvalu issuing programme',source:TUVALU,type:'National circulation / historical modern',researchPriority:'Interesting',scope:'Priority historical',researchReason:'Tuvalu introduced its own national coins after Australian currency had served as sole circulating coinage. Older Tuvalu issues deserve exact attribution.'}),
 row('Tuvalu','Tuvalu dollar (TVD)','Modern selected interest','Tuvalu legal-tender precious-metal and numismatic programme','Various',1990,2026,{authority:'The Perth Mint under Tuvalu issuing authority',source:TUVALU,type:'Non-circulating legal tender / collector',researchPriority:'Interesting',scope:'Selected modern interest',researchReason:'Perth Mint manages Tuvalu legal-tender precious-metal, numismatic and base-metal programmes; these modern issues remain collector-relevant.'}),
 row('Tuvalu','Australian dollar (AUD)','Modern currency use','Australian dollar circulation baseline','Australian circulating denominations',1976,2026,{authority:'Australian Government / Tuvalu country brief and Perth Mint',source:TUVALU}),
 row('Palau','US dollar (USD)','Compact-era currency use','United States dollar official circulating legal tender','US circulating denominations',1994,2026,{authority:'U.S. Department of the Interior — Office of Insular Affairs',source:PALAU,researchReason:'Palau uses the U.S. dollar as official currency. Ordinary U.S. coins remain baseline; Palau-specific collector issues require separate issue evidence.'}),
 row('Marshall Islands','US dollar (USD)','Compact-era currency use','United States dollar circulation','US circulating denominations',1986,2026,{authority:'U.S. Department of the Interior — Office of Insular Affairs',source:MARSHALL,researchReason:'The Marshall Islands uses the U.S. dollar. Ordinary U.S. circulation should not be mistaken for a separate national coin series.'}),
 row('Federated States of Micronesia','US dollar (USD)','Compact-era currency use','United States dollar circulation','US circulating denominations',1986,2026,{authority:'U.S. Department of the Interior — Office of Insular Affairs',source:FSM,researchReason:'FSM uses the U.S. dollar. Ordinary U.S. circulation should not be mistaken for a separate national coin series.'})
];

export const WORLD_BATCH06_OCEANIA_REFERENCE_DB=[...patchedBase,...EXTRA_DB];
export const WORLD_BATCH06_OCEANIA_COUNTRIES=[...BASE_COUNTRIES,
 {country:'Kiribati',aliases:['kiribati'],currencyAliases:['aud','australian dollar']},
 {country:'Nauru',aliases:['nauru','naoero'],currencyAliases:['aud','australian dollar']},
 {country:'Tuvalu',aliases:['tuvalu','tuvaluan'],currencyAliases:['tvd','tuvalu dollar']},
 {country:'Palau',aliases:['palau','palauan'],currencyAliases:[]},
 {country:'Marshall Islands',aliases:['marshall islands','rmi'],currencyAliases:[]},
 {country:'Federated States of Micronesia',aliases:['federated states of micronesia','fsm','micronesia'],currencyAliases:[]}
];

export function worldBatch06OceaniaStats(){return {countries:WORLD_BATCH06_OCEANIA_COUNTRIES.length,records:WORLD_BATCH06_OCEANIA_REFERENCE_DB.length,historical:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Priority historical').length,selectedModern:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Selected modern interest').length,modernBaseline:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Modern compact baseline').length};}
export function worldBatch06OceaniaExcelRows(){return WORLD_BATCH06_OCEANIA_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Period:r.period,Series:r.series,Denomination:r.denomination,'Year From':r.yearFrom,'Year To':r.yearTo,'Mint / Privy Mark':r.mintMark,Metal:r.metal,'Weight (g)':r.weight??'','Diameter (mm)':r.diameter??'',Obverse:r.obverse,Reverse:r.reverse,Edge:r.edge,Type:r.type,Scope:r.scope,'Official Authority':r.authority,'Official Source':r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason,'Metadata Status':r.metadataStatus}));}
