const row=(country,currency,period,series,denomination,yearFrom,yearTo,o={})=>({country,currency,period,series,denomination,yearFrom,yearTo,mintMark:o.mintMark||'',metal:o.metal||'',weight:o.weight??null,diameter:o.diameter??null,obverse:o.obverse||'',reverse:o.reverse||'',edge:o.edge||'',type:o.type||'Regular circulation',authority:o.authority,source:o.source,researchPriority:o.researchPriority||'Interesting',researchReason:o.researchReason||'Older or otherwise research-worthy coinage; verify exact year, type, composition and condition.',metadataStatus:o.metadataStatus||((o.weight!=null&&o.diameter!=null&&o.metal)?'Official physical specification present':'Official series reference; exact physical specification still needs issue-level verification'),scope:o.scope||'Priority historical'});
const AU_HIST='https://www.ramint.gov.au/collect/coin-production/coin-history';
const AU_DEC='https://www.ramint.gov.au/collect/coin-production/decimal-currency';
const AU_CUR='https://www.ramint.gov.au/collect/national-coin-collection/circulating-coins';
const NZ_HIST='https://www.rbnz.govt.nz/money-and-cash/-';
const NZ_MINT='https://www.rbnz.govt.nz/en/statistics/series/reserve-bank/coin-mintings';
const FJ='https://currency.rbf.gov.fj/collections/coins';
const PNG='https://www.bankpng.gov.pg/currency';
const PNG50='https://www.bankpng.gov.pg/publications/media/bank-papua-new-guinea-unveils-commemorative-currency-designs';
const WS='https://cbs.gov.ws/samoan-commemorative-coins';
const TO='https://www.reservebank.to/index.php/banknotes/currency/coins';
const SB='https://www.cbsi.com.sb/financial-stability/currency-management/currency-overview';
const VU='https://www.rbv.gov.vu/index.php/en/currency/our-responsibility-for-vatu-banknotes-and-coins';
const VUH='https://www.rbv.gov.vu/index.php/en/?catid=2&id=4%3Awelcome&view=article';
export const WORLD_BATCH06_OCEANIA_REFERENCE_DB=[
row('Australia','Australian pound','Colonial / early national','Holey dollar, dump, sovereigns and pre-decimal coinage','Various',1813,1909,{authority:'Royal Australian Mint',source:AU_HIST,type:'Historical colonial coinage',researchPriority:'Interesting',researchReason:'Australia’s first official coinage includes the 1813 holey dollar/dump and later gold sovereign-era issues; exact type and mint are important.'}),
row('Australia','Australian pound','Commonwealth pre-decimal','Halfpenny / penny / threepence / sixpence / shilling / florin / crown','Various',1910,1966,{authority:'Royal Australian Mint',source:AU_DEC,metal:'Bronze and silver alloys depending on denomination/year',type:'Pre-decimal circulation',researchPriority:'Interesting'}),
row('Australia','Australian dollar (AUD)','Decimal transition','First decimal circulation','1c / 2c / 5c / 10c / 20c / 50c',1966,1983,{authority:'Royal Australian Mint',source:AU_DEC,type:'Early decimal circulation',researchPriority:'Possibly interesting'}),
row('Australia','Australian dollar (AUD)','Modern selected interest','Commemorative circulating and collector issues','$1 / $2 / 50c and collector denominations',1970,2026,{authority:'Royal Australian Mint',source:AU_CUR,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Australia','Australian dollar (AUD)','Modern baseline','Ordinary current circulation baseline','5c / 10c / 20c / 50c / $1 / $2',1984,2026,{authority:'Royal Australian Mint',source:AU_CUR,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('New Zealand','New Zealand pound','Pre-decimal New Zealand','Threepence / sixpence / shilling / florin / half crown / penny','Various',1933,1967,{authority:'Reserve Bank of New Zealand',source:NZ_HIST,type:'Pre-decimal circulation',researchPriority:'Interesting'}),
row('New Zealand','New Zealand dollar (NZD)','Decimal transition','First decimal circulation','1c / 2c / 5c / 10c / 20c / 50c / $1',1967,1989,{authority:'Reserve Bank of New Zealand',source:NZ_HIST,type:'Early decimal circulation',researchPriority:'Possibly interesting'}),
row('New Zealand','New Zealand dollar (NZD)','Modern selected interest','Commemorative and collector coins','Various NZ$',1967,2026,{authority:'Reserve Bank of New Zealand',source:NZ_HIST,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('New Zealand','New Zealand dollar (NZD)','Modern baseline','Ordinary current circulation baseline','10c / 20c / 50c / $1 / $2',2006,2026,{authority:'Reserve Bank of New Zealand',source:NZ_MINT,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Fiji','Fiji pound / dollar','Colonial to decimal transition','Pre-decimal and early dollar coinage','Various',1934,1969,{authority:'Reserve Bank of Fiji',source:FJ,type:'Historical / transition circulation',researchPriority:'Interesting'}),
row('Fiji','Fijian dollar (FJD)','Independence era','1970 Independence silver proof and early dollar issues','$1 and related',1969,1980,{authority:'Reserve Bank of Fiji',source:FJ,metal:'Silver on selected proof issues',type:'Independence / commemorative',researchPriority:'Interesting'}),
row('Fiji','Fijian dollar (FJD)','Modern selected interest','Commemorative circulation and collector issues','20c / 50c / $1 / $2 / collector denominations',1980,2026,{authority:'Reserve Bank of Fiji',source:FJ,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Fiji','Fijian dollar (FJD)','Modern baseline','Flora & Fauna ordinary circulation baseline','5c / 10c / 20c / 50c / $1 / $2',2012,2026,{authority:'Reserve Bank of Fiji',source:FJ,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Papua New Guinea','Colonial currencies / Australian dollar','Colonial era','German, Japanese and Australian currency-use periods','Various',1880,1975,{authority:'Bank of Papua New Guinea',source:PNG,type:'Colonial currency-use history',researchPriority:'Interesting'}),
row('Papua New Guinea','Kina (PGK)','Independence currency launch','First kina/toea coinage','1 toea to K1',1975,1985,{authority:'Bank of Papua New Guinea',source:PNG,type:'Independence-era circulation',researchPriority:'Interesting'}),
row('Papua New Guinea','Kina (PGK)','Modern selected interest','50th Independence commemorative 50 toea','50 toea',2025,2025,{authority:'Bank of Papua New Guinea',source:PNG50,type:'Commemorative circulation',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Papua New Guinea','Kina (PGK)','Modern baseline','Ordinary current circulation baseline','5t / 10t / 20t / 50t / K1 / K2',2000,2026,{authority:'Bank of Papua New Guinea',source:PNG,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Samoa','Samoan pound / tala','Pre-decimal and early independence','Pre-tala and early tala coinage','Various',1930,1970,{authority:'Central Bank of Samoa',source:'https://cbs.gov.ws/currency-collectibles',type:'Historical / independence transition',researchPriority:'Interesting'}),
row('Samoa','Samoan tala (WST)','Modern selected interest','2011 silver proof / 2012–2013 commemorative one-tala issues','1 tala and set denominations',2011,2013,{authority:'Central Bank of Samoa',source:WS,metal:'Silver on proof set; aluminium-zinc-bronze on one-tala issues',weight:20,diameter:38.74,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Samoa','Samoan tala (WST)','Modern baseline','2011 circulation coin family','10 / 20 / 50 sene / 1 / 2 tala',2011,2026,{authority:'Central Bank of Samoa',source:'https://cbs.gov.ws/',type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Tonga','Tongan paʻanga (TOP)','Royal historical coinage','Earlier paʻanga/seniti royal portrait series','Seniti / paʻanga denominations',1967,2014,{authority:'National Reserve Bank of Tonga',source:TO,type:'Historical royal circulation',researchPriority:'Interesting'}),
row('Tonga','Tongan paʻanga (TOP)','Modern selected interest','2015 coronation coin series','1 seniti to 1 paʻanga',2015,2015,{authority:'National Reserve Bank of Tonga',source:TO,type:'Coronation / new-series issue',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Tonga','Tongan paʻanga (TOP)','Modern physical reference','2015 series 1 paʻanga','1 paʻanga',2015,2026,{authority:'National Reserve Bank of Tonga',source:TO,metal:'Aluminium Bronze',weight:7.33,diameter:24,obverse:'King George Tupou V',reverse:'Coat of Arms',edge:'Interrupted Mill',type:'Modern circulation',researchPriority:'Normal',scope:'Modern compact baseline'}),
row('Tonga','Tongan paʻanga (TOP)','Modern baseline','Ordinary 2015-series circulation baseline','1 / 2 / 5 / 10 / 20 / 50 seniti / 1 paʻanga',2015,2026,{authority:'National Reserve Bank of Tonga',source:TO,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Solomon Islands','Solomon Islands dollar (SBD)','Currency independence','First national coin series','1c / 2c / 5c / 10c / 20c / $1 and related',1977,1987,{authority:'Central Bank of Solomon Islands',source:SB,type:'Independence-era circulation',researchPriority:'Interesting',researchReason:'CBSI records the launch of the Solomon Islands dollar in 1977; first-series coins are priority historical material.'}),
row('Solomon Islands','Solomon Islands dollar (SBD)','Later historical circulation','Queen-effigy and coat-of-arms transition','Various',1987,2016,{authority:'Central Bank of Solomon Islands',source:SB,type:'Historical design transition',researchPriority:'Possibly interesting'}),
row('Solomon Islands','Solomon Islands dollar (SBD)','Modern selected interest','40th-anniversary coloured $2 coin','$2',2018,2018,{authority:'Central Bank of Solomon Islands',source:SB,type:'Commemorative circulation',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Solomon Islands','Solomon Islands dollar (SBD)','Modern baseline','Ordinary current circulation baseline','10c / 20c / 50c / $1 / $2',2012,2026,{authority:'Central Bank of Solomon Islands',source:SB,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

row('Vanuatu','New Hebrides franc / Australian dollar','Pre-vatu currency period','New Hebrides and Australian currency-use','Various',1900,1981,{authority:'Reserve Bank of Vanuatu',source:VUH,type:'Colonial / transition currency',researchPriority:'Interesting'}),
row('Vanuatu','Vanuatu vatu (VUV)','Monetary reform','First vatu coinage','1 / 2 / 5 / 10 / 20 / 50 / 100 vatu',1981,1999,{authority:'Reserve Bank of Vanuatu',source:VUH,type:'Currency-reform circulation',researchPriority:'Interesting'}),
row('Vanuatu','Vanuatu vatu (VUV)','Modern selected interest','Commemorative vatu coinage','Various',1981,2026,{authority:'Reserve Bank of Vanuatu',source:'https://rbv.gov.vu/index.php/en/component/content/article/12-currency?Itemid=27',type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
row('Vanuatu','Vanuatu vatu (VUV)','Modern baseline','Ordinary current circulation baseline','5 / 10 / 20 / 50 / 100 vatu',2000,2026,{authority:'Reserve Bank of Vanuatu',source:VU,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'})
];
export const WORLD_BATCH06_OCEANIA_COUNTRIES=[
{country:'Australia',aliases:['australia','australian'],currencyAliases:['aud','australian dollar','australian pound']},
{country:'New Zealand',aliases:['new zealand','aotearoa'],currencyAliases:['nzd','new zealand dollar','new zealand pound']},
{country:'Fiji',aliases:['fiji','fijian'],currencyAliases:['fjd','fijian dollar','fiji pound']},
{country:'Papua New Guinea',aliases:['papua new guinea','png'],currencyAliases:['pgk','kina','toea']},
{country:'Samoa',aliases:['samoa','samoan'],currencyAliases:['wst','tala','sene']},
{country:'Tonga',aliases:['tonga','tongan'],currencyAliases:['top','paanga','paʻanga','seniti']},
{country:'Solomon Islands',aliases:['solomon islands','solomons'],currencyAliases:['sbd','solomon islands dollar']},
{country:'Vanuatu',aliases:['vanuatu','new hebrides'],currencyAliases:['vuv','vatu','new hebrides franc']}
];
export function worldBatch06OceaniaStats(){return {countries:WORLD_BATCH06_OCEANIA_COUNTRIES.length,records:WORLD_BATCH06_OCEANIA_REFERENCE_DB.length,historical:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Priority historical').length,selectedModern:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Selected modern interest').length,modernBaseline:WORLD_BATCH06_OCEANIA_REFERENCE_DB.filter(r=>r.scope==='Modern compact baseline').length};}
export function worldBatch06OceaniaExcelRows(){return WORLD_BATCH06_OCEANIA_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Period:r.period,Series:r.series,Denomination:r.denomination,'Year From':r.yearFrom,'Year To':r.yearTo,'Mint / Privy Mark':r.mintMark,Metal:r.metal,'Weight (g)':r.weight??'','Diameter (mm)':r.diameter??'',Obverse:r.obverse,Reverse:r.reverse,Edge:r.edge,Type:r.type,Scope:r.scope,'Official Authority':r.authority,'Official Source':r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason,'Metadata Status':r.metadataStatus}));}
