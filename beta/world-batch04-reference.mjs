// World batch 4 — North America, priority-focused strategy.
// Deep coverage is intentionally concentrated on older, precious-metal, commemorative,
// scarce/transition and otherwise research-worthy coinage. Modern ordinary circulation
// is represented only by compact baseline rows instead of one row per year.

const US_MINT_HISTORY='https://www.usmint.gov/learn/history/us-circulating-coins';
const US_MINT_SPECS='https://www.usmint.gov/learn/coins-and-medals/circulating-coins/coin-specifications';
const US_MINT_MARKS='https://www.usmint.gov/learn/collecting-basics/mint-marks';
const US_MINT_ARCHIVE='https://www.usmint.gov/learn/coins-and-medals';
const CANADA_CIRC='https://www.mint.ca/en/discover/canadian-circulation';
const CANADA_1C='https://www.mint.ca/en/discover/canadian-circulation/1-cent';
const CANADA_5C='https://www.mint.ca/en/discover/canadian-circulation/5-cents';
const CANADA_10C='https://www.mint.ca/en/discover/canadian-circulation/10-cents';
const CANADA_25C='https://www.mint.ca/en/discover/canadian-circulation/25-cents';
const CANADA_50C='https://www.mint.ca/en-us/discover/canadian-circulation/50-cents';
const CANADA_1D='https://www.mint.ca/en/discover/canadian-circulation/1-dollar';
const MEXICO_OLD='https://www.banxico.org.mx/stdview.html?url=%2Fservicios%2Fvalor-monedas-que-ya-no-se-fa.html';
const MEXICO_CURRENT='https://www.banxico.org.mx/billetes-y-monedas/caracteristicas-billetes-mo.html';
const MEXICO_B='https://www.banxico.org.mx/billetes-y-monedas/monedas-en-nuevos-pesos-circu.html';

const row=(country,currency,period,series,denomination,yearFrom,yearTo,opts={})=>({
 country,currency,period,series,denomination,yearFrom,yearTo,
 mintMark:opts.mintMark||'',metal:opts.metal||'',weight:opts.weight??null,diameter:opts.diameter??null,
 obverse:opts.obverse||'',reverse:opts.reverse||'',edge:opts.edge||'',type:opts.type||'Regular circulation',
 authority:opts.authority,source:opts.source,researchPriority:opts.researchPriority||'Interesting',
 researchReason:opts.researchReason||'Older or otherwise research-worthy coinage; verify exact year, variety and condition.',
 metadataStatus:opts.metadataStatus||((opts.weight!=null&&opts.diameter!=null&&opts.metal)?'Official physical specification present':'Official series reference; exact physical specification still needs issue-level verification'),
 scope:opts.scope||'Priority historical'
});

export const WORLD_BATCH04_REFERENCE_DB=[
 // UNITED STATES — older/interesting first; current circulation only as compact baseline.
 row('United States','US dollar (USD)','Early federal coinage','Early copper, silver and gold circulation','Various',1793,1857,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'Philadelphia usually no mint mark in early period; later branch marks require verification',researchReason:'Early federal and pre-1857 circulating denominations include copper, silver and gold types; exact denomination, date and mint are high-priority research signals.'}),
 row('United States','US dollar (USD)','Classic silver coinage','Liberty and early federal silver denominations','Half dime / dime / quarter / half dollar / dollar',1794,1916,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'Historic P/no mark, C, D, O, CC, S depending on period',metal:'Silver issues common — verify exact type',researchReason:'Historic silver circulation. Mint mark, exact date, design and denomination can materially change collector significance.'}),
 row('United States','US dollar (USD)','Classic gold coinage','Gold eagle denominations','$2.50 / $5 / $10 / $20',1795,1933,{authority:'United States Mint',source:US_MINT_ARCHIVE,mintMark:'Historic P/no mark, C, D, O, CC, S depending on type',metal:'Gold',type:'Historic precious-metal circulation',researchPriority:'Interesting',researchReason:'Historic U.S. gold coinage is always a further-research trigger; authenticate exact date, mint and type.'}),
 row('United States','US dollar (USD)','20th-century cent','Lincoln Wheat cent','1 cent',1909,1958,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S depending on year',obverse:'Abraham Lincoln',reverse:'Wheat ears / ONE CENT',researchPriority:'Possibly interesting',researchReason:'Older Lincoln cents; exact year and mint mark matter, with some key dates/varieties requiring research.'}),
 row('United States','US dollar (USD)','Wartime transition','1943 steel cent','1 cent',1943,1943,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S',metal:'Zinc-coated steel',type:'Transition / wartime',researchPriority:'Interesting',researchReason:'Distinct wartime composition and famous transition/error context; exact metal and mint should be verified.'}),
 row('United States','US dollar (USD)','Classic nickel','Buffalo nickel','5 cents',1913,1938,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S depending on year',obverse:'Indigenous portrait type',reverse:'American bison',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Wartime nickel','Jefferson wartime silver-alloy nickel','5 cents',1942,1945,{authority:'United States Mint',source:US_MINT_MARKS,mintMark:'Large P, D or S mint mark above Monticello on wartime issues',type:'Wartime / composition transition',researchPriority:'Interesting',researchReason:'U.S. Mint documents the wartime nickel change and first use of the P mint mark; verify year and large mint mark.'}),
 row('United States','US dollar (USD)','Classic silver dime','Mercury dime','10 cents',1916,1945,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S',metal:'Silver alloy',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Silver Roosevelt dime','Roosevelt dime — silver era','10 cents',1946,1964,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S depending on year',metal:'Silver alloy',obverse:'Franklin D. Roosevelt',researchPriority:'Interesting',researchReason:'Pre-clad Roosevelt dimes are silver-era issues and should receive further research.'}),
 row('United States','US dollar (USD)','Classic silver quarter','Standing Liberty quarter','25 cents',1916,1930,{authority:'United States Mint',source:'https://www.usmint.gov/learn/coins-and-medals/circulating-coins/quarter',mintMark:'P/no mark, D, S',metal:'Silver alloy',obverse:'Standing Liberty',reverse:'Eagle',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Silver Washington quarter','Washington quarter — silver era','25 cents',1932,1964,{authority:'United States Mint',source:'https://www.usmint.gov/learn/coins-and-medals/circulating-coins/quarter',mintMark:'P/no mark, D, S',metal:'Silver alloy',obverse:'George Washington',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Classic silver half dollar','Walking Liberty half dollar','50 cents',1916,1947,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S',metal:'Silver alloy',obverse:'Walking Liberty',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Classic silver half dollar','Franklin half dollar','50 cents',1948,1963,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S',metal:'Silver alloy',obverse:'Benjamin Franklin',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Kennedy transition','Kennedy half dollar — silver transition','50 cents',1964,1970,{authority:'United States Mint',source:US_MINT_HISTORY,mintMark:'P/no mark, D, S depending on issue',metal:'Silver content varies by year — verify 1964 versus 1965–1970',obverse:'John F. Kennedy',type:'Composition transition',researchPriority:'Interesting'}),
 row('United States','US dollar (USD)','Classic silver dollar','Morgan / Peace silver-dollar era','1 dollar',1878,1935,{authority:'United States Mint',source:US_MINT_ARCHIVE,mintMark:'P/no mark, CC, D, O, S depending on type/year',metal:'Silver alloy',type:'Historic silver dollar',researchPriority:'Interesting',researchReason:'Classic U.S. silver dollars; exact Morgan/Peace type, year and mint mark are important collector signals.'}),
 row('United States','US dollar (USD)','Modern baseline','Ordinary current circulation baseline','1c / 5c / 10c / 25c / 50c / $1',1971,2026,{authority:'United States Mint',source:US_MINT_SPECS,type:'Modern baseline',researchPriority:'Normal',researchReason:'Compact modern baseline only. Escalate if commemorative, proof, precious-metal, scarce variety, error or unusual mint mark is detected.',scope:'Modern compact baseline'}),
 row('United States','US dollar (USD)','Modern selected interest','Commemorative / special circulation and collector programmes','50c / $1 / other authorized denominations',1971,2026,{authority:'United States Mint',source:US_MINT_ARCHIVE,type:'Commemorative / collector',researchPriority:'Interesting',researchReason:'Modern U.S. commemorative, proof, bullion and special programmes remain relevant despite the general older-coin focus.',scope:'Selected modern interest'}),

 // CANADA — exact official physical ranges where Royal Canadian Mint publishes them.
 row('Canada','Canadian dollar (CAD)','Early Canadian decimal','1-cent large cent','1 cent',1908,1920,{authority:'Royal Canadian Mint',source:CANADA_1C,metal:'95.5% copper, 3% tin, 1.5% zinc',weight:5.67,diameter:25.4,reverse:'Maple-leaf wreath',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Early Canadian decimal','5-cent silver','5 cents',1908,1919,{authority:'Royal Canadian Mint',source:CANADA_5C,metal:'92.5% silver, 7.5% copper',weight:1.167,diameter:14.494,reverse:'Crossed maple boughs',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Early Canadian decimal','5-cent silver transition','5 cents',1920,1921,{authority:'Royal Canadian Mint',source:CANADA_5C,metal:'80% silver, 20% copper',weight:1.167,diameter:14.494,reverse:'Crossed maple boughs',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Wartime nickel transition','12-sided / Victory 5-cent types','5 cents',1942,1945,{authority:'Royal Canadian Mint',source:CANADA_5C,metal:'Tombac in 1942–43; chrome-plated steel in 1944–45',weight:4.54,diameter:21.21,reverse:'12-sided wartime / Victory designs',type:'Wartime / transition',researchPriority:'Interesting',researchReason:'Distinct wartime composition and design changes; 1943–45 Victory types deserve exact-date attribution.'}),
 row('Canada','Canadian dollar (CAD)','Early Canadian decimal','10-cent sterling silver','10 cents',1908,1919,{authority:'Royal Canadian Mint',source:CANADA_10C,metal:'92.5% silver, 7.5% copper',weight:2.33,diameter:18.034,reverse:'Crossed maple boughs',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Canadian silver circulation','10-cent silver','10 cents',1920,1967,{authority:'Royal Canadian Mint',source:CANADA_10C,metal:'80% silver, 20% copper',weight:2.33,diameter:18.034,reverse:'Crossed maple boughs to 1936; Bluenose from 1937 except special 1967 design',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Canadian silver circulation','25-cent silver','25 cents',1920,1952,{authority:'Royal Canadian Mint',source:CANADA_25C,metal:'80% silver, 20% copper',weight:5.83,diameter:23.62,researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Canadian silver circulation','25-cent silver late era','25 cents',1953,1967,{authority:'Royal Canadian Mint',source:CANADA_25C,metal:'80% silver, 20% copper',weight:5.83,diameter:23.88,researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Silver transition','25-cent 1967–1968 transition','25 cents',1967,1968,{authority:'Royal Canadian Mint',source:CANADA_25C,metal:'50% silver, 50% copper',weight:5.05,diameter:23.88,type:'Composition transition',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Canadian silver circulation','50-cent silver','50 cents',1920,1967,{authority:'Royal Canadian Mint',source:CANADA_50C,metal:'80% silver, 20% copper',weight:11.66,diameter:29.72,reverse:'Maple-bough design to 1936; Canadian Arms designs thereafter; special 1967 wolf',researchPriority:'Interesting'}),
 row('Canada','Canadian dollar (CAD)','Canadian silver dollar','Voyageur and commemorative silver dollar','1 dollar',1935,1967,{authority:'Royal Canadian Mint',source:CANADA_1D,metal:'80% silver, 20% copper',weight:23.3,diameter:36.06,reverse:'Voyageur or year-specific commemorative design',researchPriority:'Interesting',researchReason:'Large Canadian silver dollars with many dated commemorative reverse designs; exact year is highly relevant.'}),
 row('Canada','Canadian dollar (CAD)','Modern selected interest','50-cent limited circulation / collector-interest baseline','50 cents',1968,2026,{authority:'Royal Canadian Mint',source:CANADA_50C,type:'Selected modern circulation',researchPriority:'Possibly interesting',researchReason:'The 50-cent denomination is infrequently used and issued in relatively limited quantities; retain as a selected modern research signal.',scope:'Selected modern interest'}),
 row('Canada','Canadian dollar (CAD)','Modern baseline','Ordinary current Canadian circulation baseline','5c / 10c / 25c / $1 / $2',1987,2026,{authority:'Royal Canadian Mint',source:CANADA_CIRC,type:'Modern baseline',researchPriority:'Normal',researchReason:'Compact modern baseline; escalate commemoratives, precious-metal collector versions, unusual mintages/varieties and transition compositions.',scope:'Modern compact baseline'}),

 // MEXICO — older families prioritized; current ordinary coins are compact baseline.
 row('Mexico','Mexican peso (MXN)','Pre-1993 peso','Family AA demonetized coinage','1c / 5c / 10c / 20c and other AA denominations',1970,1992,{authority:'Banco de México / Casa de Moneda de México',source:MEXICO_OLD,mintMark:'Casa de Moneda de México M° may appear',obverse:'Mexican national emblem / issue-specific design',reverse:'Denomination and historical/personality motifs vary by denomination',type:'Demonetized historical circulation',researchPriority:'Interesting',researchReason:'Family AA belongs to the pre-1993 monetary unit and is demonetized; exact denomination, design and year should be researched.'}),
 row('Mexico','Nuevo peso (MXN)','1993 monetary reform','Family B — nuevos pesos','1 / 2 / 5 / 10 nuevos pesos and related',1993,1995,{authority:'Banco de México / Casa de Moneda de México',source:MEXICO_B,mintMark:'M°',obverse:'National Coat of Arms',reverse:'N$ denomination, year, M° and Piedra del Sol motifs',type:'Currency-reform transition',researchPriority:'Interesting',researchReason:'Short-lived “nuevo peso” naming after the 1000:1 monetary reform makes these transition coins useful identification targets.'}),
 row('Mexico','Mexican peso (MXN)','Modern peso','Bimetallic 10-peso transition / earlier composition','10 pesos',1992,1997,{authority:'Banco de México / Casa de Moneda de México',source:'https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-2026-96-2-de-julio-de-1996/operaciones-caja-1996-disposi.html',mintMark:'M°',type:'Composition / legal-specification transition',researchPriority:'Possibly interesting',researchReason:'Banco de México documents a 1997 change to the 10-peso coin specifications; exact year/composition should be checked.'}),
 row('Mexico','Mexican peso (MXN)','Modern selected interest','20-peso commemorative circulation','20 pesos',2000,2026,{authority:'Banco de México / Casa de Moneda de México',source:MEXICO_CURRENT,mintMark:'M°',diameter:32,obverse:'National Coat of Arms',reverse:'Issue-specific commemorative motif',edge:'Interrupted reeding',type:'Commemorative circulation',researchPriority:'Interesting',researchReason:'Modern 20-peso commemoratives are retained despite the older-coin focus because their changing themes and lower collector-oriented issuance make exact attribution useful.',scope:'Selected modern interest'}),
 row('Mexico','Mexican peso (MXN)','Modern selected interest','Dodecagonal 20-peso commemoratives','20 pesos',2020,2026,{authority:'Banco de México / Casa de Moneda de México',source:MEXICO_CURRENT,mintMark:'M°',diameter:30,obverse:'National Coat of Arms',reverse:'Issue-specific commemorative motif',edge:'Interrupted reeding',type:'Commemorative circulation',researchPriority:'Interesting',researchReason:'From 2020 the 20-peso commemorative format changed to a 12-sided 30 mm coin with latent-image security feature.',scope:'Selected modern interest'}),
 row('Mexico','Mexican peso (MXN)','Modern baseline','Ordinary current circulation baseline','10c / 20c / 50c / 1 / 2 / 5 / 10 pesos',2009,2026,{authority:'Banco de México / Casa de Moneda de México',source:MEXICO_CURRENT,type:'Modern baseline',researchPriority:'Normal',researchReason:'Compact modern baseline only. Escalate older families, commemoratives, precious metal, errors and unusual transition types.',scope:'Modern compact baseline'})
];

export const WORLD_BATCH04_COUNTRIES=[
 {country:'United States',aliases:['united states','usa','u.s.','america','verenigde staten'],currencyAliases:['usd','us dollar','dollar']},
 {country:'Canada',aliases:['canada','canadian'],currencyAliases:['cad','canadian dollar']},
 {country:'Mexico',aliases:['mexico','méxico','mexican','mexico'],currencyAliases:['mxn','mexican peso','nuevo peso','peso']}
];

export function worldBatch04Stats(){
 return {
  countries:WORLD_BATCH04_COUNTRIES.length,
  records:WORLD_BATCH04_REFERENCE_DB.length,
  historical:WORLD_BATCH04_REFERENCE_DB.filter(r=>r.scope==='Priority historical').length,
  selectedModern:WORLD_BATCH04_REFERENCE_DB.filter(r=>r.scope==='Selected modern interest').length,
  modernBaseline:WORLD_BATCH04_REFERENCE_DB.filter(r=>r.scope==='Modern compact baseline').length,
  interesting:WORLD_BATCH04_REFERENCE_DB.filter(r=>r.researchPriority==='Interesting').length
 };
}

export function worldBatch04ExcelRows(){return WORLD_BATCH04_REFERENCE_DB.map(r=>({
 Country:r.country,Currency:r.currency,Period:r.period,Series:r.series,Denomination:r.denomination,
 'Year From':r.yearFrom,'Year To':r.yearTo,'Mint / Privy Mark':r.mintMark,Metal:r.metal,
 'Weight (g)':r.weight??'','Diameter (mm)':r.diameter??'',Obverse:r.obverse,Reverse:r.reverse,Edge:r.edge,
 Type:r.type,Scope:r.scope,'Official Authority':r.authority,'Official Source':r.source,
 'Research Priority':r.researchPriority,'Research Reason':r.researchReason,'Metadata Status':r.metadataStatus
}));}
