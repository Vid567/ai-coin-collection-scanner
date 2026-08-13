// World batch 5 — Asia, priority-focused strategy.
// Deep coverage emphasizes older, precious-metal, transition, commemorative and otherwise research-worthy coins.
// Ordinary modern circulation is represented by compact baseline rows only.

const row=(country,currency,period,series,denomination,yearFrom,yearTo,opts={})=>({
 country,currency,period,series,denomination,yearFrom,yearTo,
 mintMark:opts.mintMark||'',metal:opts.metal||'',weight:opts.weight??null,diameter:opts.diameter??null,
 obverse:opts.obverse||'',reverse:opts.reverse||'',edge:opts.edge||'',type:opts.type||'Regular circulation',
 authority:opts.authority,source:opts.source,researchPriority:opts.researchPriority||'Interesting',
 researchReason:opts.researchReason||'Older or otherwise research-worthy coinage; verify exact year, variety, composition and condition.',
 metadataStatus:opts.metadataStatus||((opts.weight!=null&&opts.diameter!=null&&opts.metal)?'Official physical specification present':'Official series reference; exact physical specification still needs issue-level verification'),
 scope:opts.scope||'Priority historical'
});

const JP_HIST='https://www.imes.boj.or.jp/cm/english/history/';
const JP_FAQ='https://www.imes.boj.or.jp/cm/english/FAQs/FAQcurrency/index.html';
const CN_PBC='https://www.pbc.gov.cn/';
const CN_PM='https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4700569/2025122910473066683/index.html';
const IN_RBI='https://www.rbi.org.in/scripts/FS_FAQs.aspx?Id=136&fn=2753';
const KR_BOK='https://www.bok.or.kr/eng/main/contents.do?menuNo=400113';
const TW_CBC='https://museum.cbc.gov.tw/web/en-us/circulation/currency';
const TW_1='https://www.cbc.gov.tw/en/cp-775-26908-6E769-2.html';
const HK_HKMA='https://www.hkma.gov.hk/eng/key-functions/money/hong-kong-currency/coin-collection-programme/';
const SG_MAS='https://www.mas.gov.sg/currency/circulation-currency/circulation-coins';
const MY_BNM='https://www.bnm.gov.my/currency';
const TH_BOT='https://www.bot.or.th/en/our-roles/banknotes/History-and-Series-of-Banknote-And-Commemorative/banknote-evolution.html';
const ID_BI='https://www.bi.go.id/en/rupiah/gambar-uang/Default.aspx';
const ID_WITHDRAWN='https://www.bi.go.id/en/rupiah/uang-dicabut/default.aspx';

export const WORLD_BATCH05_ASIA_REFERENCE_DB=[
 // JAPAN
 row('Japan','Japanese yen (JPY)','Ancient coinage','Fuhon-sen / Wado Kaichin and early state coinage','Various cash-type coins',650,958,{authority:'Bank of Japan Currency Museum',source:JP_FAQ,obverse:'Square-hole cast coin designs / legends',reverse:'Varies by issue',type:'Ancient historical coinage',researchPriority:'Interesting',researchReason:'Bank of Japan Currency Museum documents coinage predating and including Wado Kaichin; ancient Japanese cast coins are high-priority research objects.'}),
 row('Japan','Japanese yen (JPY)','Medieval / early-modern coinage','Imported cash, local issues and Tokugawa monetary system','Various',1150,1867,{authority:'Bank of Japan Currency Museum',source:JP_HIST,metal:'Copper, silver and gold systems depending on period',type:'Historical coinage',researchPriority:'Interesting'}),
 row('Japan','Japanese yen (JPY)','Meiji monetary reform','Early modern yen coinage','1 sen / 5 sen / 10 sen / 20 sen / 50 sen / 1 yen and gold denominations',1871,1912,{authority:'Bank of Japan Currency Museum',source:JP_HIST,metal:'Copper, silver and gold depending on denomination',researchPriority:'Interesting',researchReason:'Early yen coinage after Meiji monetary reform; denomination, metal and date are major attribution signals.'}),
 row('Japan','Japanese yen (JPY)','Prewar / wartime yen','Taisho / early Showa coinage','Various sen and yen',1912,1945,{authority:'Bank of Japan Currency Museum',source:JP_HIST,type:'Historical / wartime circulation',researchPriority:'Interesting'}),
 row('Japan','Japanese yen (JPY)','Modern selected interest','Commemorative and precious-metal Japanese issues','Various yen',1964,2026,{authority:'Bank of Japan / Japan Mint ecosystem',source:JP_HIST,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Japan','Japanese yen (JPY)','Modern baseline','Ordinary current circulation baseline','1 / 5 / 10 / 50 / 100 / 500 yen',1955,2026,{authority:'Bank of Japan Currency Museum',source:JP_HIST,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline',researchReason:'Compact modern baseline; escalate older alloys, commemoratives, scarce dates and errors.'}),

 // CHINA
 row('China','Chinese historical currencies','Imperial cash coinage','Dynastic cash / round coins with square hole','Various cash denominations',-221,1911,{authority:'People’s Bank of China / Chinese monetary heritage',source:CN_PBC,obverse:'Dynastic reign title / denomination legends',reverse:'Mint / denomination / blank depending on issue',type:'Imperial historical coinage',researchPriority:'Interesting',researchReason:'Imperial Chinese cash coins span many dynasties; reign title, calligraphy, mint and metal are essential attribution signals.'}),
 row('China','Chinese yuan / dollar systems','Late Qing / Republic coinage','Machine-struck silver and copper coinage','Cash / cents / jiao / yuan / dollars',1889,1949,{authority:'People’s Bank of China',source:CN_PBC,metal:'Copper and silver issues common; verify exact type',type:'Historical machine-struck coinage',researchPriority:'Interesting'}),
 row('China','Renminbi (CNY)','People’s Republic early coinage','Fen and early yuan circulation','1 / 2 / 5 fen and related',1955,1999,{authority:'People’s Bank of China',source:CN_PBC,type:'Historical PRC circulation',researchPriority:'Possibly interesting'}),
 row('China','Renminbi (CNY)','Modern selected interest','Precious-metal commemorative programme','Various yuan',1979,2026,{authority:'People’s Bank of China',source:CN_PM,metal:'Gold / silver / platinum depending on issue',type:'Precious-metal commemorative',researchPriority:'Interesting',scope:'Selected modern interest',researchReason:'PBOC issues legal-tender precious-metal commemorative coins; exact metal, weight, denomination and mintage are collector-relevant.'}),
 row('China','Renminbi (CNY)','Modern baseline','Ordinary current circulation baseline','1 jiao / 5 jiao / 1 yuan',2000,2026,{authority:'People’s Bank of China',source:CN_PBC,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // INDIA
 row('India','Indian rupee (INR)','British India / princely transition','Colonial and pre-Republic rupee coinage','Pice / anna / rupee denominations',1835,1950,{authority:'Reserve Bank of India / Government of India',source:IN_RBI,metal:'Copper, nickel and silver issues depending on denomination and date',type:'Historical colonial circulation',researchPriority:'Interesting'}),
 row('India','Indian rupee (INR)','Early Republic','Anna and pre-decimal Republic coinage','Pice / anna / rupee',1950,1957,{authority:'Reserve Bank of India',source:IN_RBI,type:'Historical Republic transition',researchPriority:'Interesting'}),
 row('India','Indian rupee (INR)','Decimalisation','Naya Paisa transition','1 / 2 / 3 / 5 / 10 / 25 / 50 naya paise',1957,1964,{authority:'Reserve Bank of India',source:IN_RBI,type:'Currency reform transition',researchPriority:'Interesting'}),
 row('India','Indian rupee (INR)','Modern selected interest','Commemorative circulation and collector issues','Various rupee denominations',1964,2026,{authority:'Reserve Bank of India / Government of India',source:IN_RBI,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('India','Indian rupee (INR)','Modern baseline','Ordinary current circulation baseline','50 paise / ₹1 / ₹2 / ₹5 / ₹10 / ₹20',2011,2026,{authority:'Reserve Bank of India',source:IN_RBI,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline',researchReason:'RBI confirms these denominations in circulation; compact baseline only, with older designs and commemoratives escalated.'}),

 // SOUTH KOREA
 row('South Korea','South Korean won (KRW)','Early Republic won/hwan','Postwar currency transitions','Hwan / won denominations',1945,1966,{authority:'Bank of Korea',source:KR_BOK,type:'Historical currency transition',researchPriority:'Interesting'}),
 row('South Korea','South Korean won (KRW)','Current-series origins','Early current won coinage','1 / 5 / 10 / 50 / 100 won',1966,1981,{authority:'Bank of Korea',source:KR_BOK,obverse:'National symbols / historic figures depending on denomination',type:'Early modern circulation',researchPriority:'Possibly interesting'}),
 row('South Korea','South Korean won (KRW)','Modern selected interest','Commemorative coins','Various won',1970,2026,{authority:'Bank of Korea',source:'https://www.bok.or.kr/portal/submain/submain/crrncy.do?menuNo=200016&viewType=SUBMAIN',type:'Commemorative',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('South Korea','South Korean won (KRW)','Modern baseline','Ordinary current circulation baseline','1 / 5 / 10 / 50 / 100 / 500 won',1966,2026,{authority:'Bank of Korea',source:KR_BOK,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),
 row('South Korea','South Korean won (KRW)','Modern physical reference','500 won current series','500 won',1982,2026,{authority:'Bank of Korea',source:KR_BOK,metal:'Cu 75%, Ni 25%',weight:7.7,diameter:26.5,obverse:'Crane',edge:'Milled',researchPriority:'Normal',scope:'Modern compact baseline'}),
 row('South Korea','South Korean won (KRW)','Modern physical reference','100 won current series','100 won',1970,2026,{authority:'Bank of Korea',source:KR_BOK,metal:'Cu 75%, Ni 25%',weight:5.42,diameter:24,obverse:'Admiral Yi Sun-Shin',edge:'Milled',researchPriority:'Normal',scope:'Modern compact baseline'}),
 row('South Korea','South Korean won (KRW)','Modern physical reference','50 won current series','50 won',1972,2026,{authority:'Bank of Korea',source:KR_BOK,metal:'Cu 70%, Zn 18%, Ni 12%',weight:4.16,diameter:21.6,obverse:'Stalk of rice',edge:'Milled',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // TAIWAN
 row('Taiwan','New Taiwan dollar (TWD)','Early New Taiwan dollar','Early coin series','Various cents / dollars',1949,1980,{authority:'Central Bank of the Republic of China (Taiwan)',source:TW_CBC,type:'Historical New Taiwan dollar',researchPriority:'Interesting'}),
 row('Taiwan','New Taiwan dollar (TWD)','Modern physical reference','NT$1 Chiang Kai-shek type','NT$1',1981,2026,{authority:'Central Bank of the Republic of China (Taiwan)',source:TW_1,metal:'Aluminium-bronze',weight:3.8,diameter:20,obverse:'Chiang Kai-Shek portrait',reverse:'Face value',researchPriority:'Normal',scope:'Modern compact baseline'}),
 row('Taiwan','New Taiwan dollar (TWD)','Modern selected interest','Commemorative / special NT dollar coins','Various NT$',1965,2026,{authority:'Central Bank of the Republic of China (Taiwan)',source:TW_CBC,type:'Commemorative / special',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Taiwan','New Taiwan dollar (TWD)','Modern baseline','Ordinary current circulation baseline','NT$1 / 5 / 10 / 20 / 50',1981,2026,{authority:'Central Bank of the Republic of China (Taiwan)',source:TW_CBC,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // HONG KONG
 row('Hong Kong','Hong Kong dollar (HKD)','Colonial beginnings','Early Hong Kong legal-tender coinage','1 mil / 1 cent / 5 cents / 10 cents / 20 cents / 50 cents',1863,1941,{authority:'Hong Kong Monetary Authority',source:HK_HKMA,metal:'Copper and silver issues depending on denomination/date',type:'Colonial historical circulation',researchPriority:'Interesting',researchReason:'HKMA notes the first Hong Kong legal-tender coin in 1863 and early silver denominations; exact monarch, date and denomination are important.'}),
 row('Hong Kong','Hong Kong dollar (HKD)','Postwar Queen’s Head coinage','Elizabeth II circulation coinage','10c / 20c / 50c / $1 / $2 / $5',1955,1992,{authority:'Hong Kong Monetary Authority',source:HK_HKMA,obverse:'Queen Elizabeth II portrait',type:'Historical / withdrawn-from-recirculation portrait series',researchPriority:'Possibly interesting',researchReason:'HKMA states Queen’s Head coins returned to reserves have not been recirculated since 1993.'}),
 row('Hong Kong','Hong Kong dollar (HKD)','Modern selected interest','Commemorative / special HK coin issues','Various HK$',1975,2026,{authority:'Hong Kong Monetary Authority',source:HK_HKMA,type:'Commemorative / special',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Hong Kong','Hong Kong dollar (HKD)','Modern baseline','Ordinary current circulation baseline','10c / 20c / 50c / $1 / $2 / $5 / $10',1975,2026,{authority:'Hong Kong Monetary Authority',source:HK_HKMA,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // SINGAPORE
 row('Singapore','Singapore dollar (SGD)','First coin series','Marine / early independent Singapore coinage','1c / 5c / 10c / 20c / 50c / $1',1967,1985,{authority:'Monetary Authority of Singapore',source:SG_MAS,type:'Historical post-independence circulation',researchPriority:'Interesting'}),
 row('Singapore','Singapore dollar (SGD)','Second coin series','Flora series','1c / 5c / 10c / 20c / 50c / $1',1985,2013,{authority:'Monetary Authority of Singapore',source:SG_MAS,type:'Historical modern circulation',researchPriority:'Possibly interesting'}),
 row('Singapore','Singapore dollar (SGD)','Modern selected interest','Commemorative / numismatic Singapore issues','Various SGD',1967,2026,{authority:'Monetary Authority of Singapore',source:SG_MAS,type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Singapore','Singapore dollar (SGD)','Modern baseline','Third-series ordinary circulation','5c / 10c / 20c / 50c / $1',2013,2026,{authority:'Monetary Authority of Singapore',source:SG_MAS,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // MALAYSIA
 row('Malaysia','Malaysian ringgit (MYR)','Early Malaysia','First-series sen/ringgit coinage','1 / 5 / 10 / 20 / 50 sen / RM1',1967,1988,{authority:'Bank Negara Malaysia',source:MY_BNM,type:'Historical national circulation',researchPriority:'Interesting'}),
 row('Malaysia','Malaysian ringgit (MYR)','Second-series circulation','Second series sen/ringgit coinage','1 / 5 / 10 / 20 / 50 sen / RM1',1989,2011,{authority:'Bank Negara Malaysia',source:MY_BNM,type:'Historical modern circulation',researchPriority:'Possibly interesting'}),
 row('Malaysia','Malaysian ringgit (MYR)','Modern selected interest','BNM commemorative coin programme','Various RM',1967,2026,{authority:'Bank Negara Malaysia',source:'https://vas.bnm.gov.my/',type:'Commemorative / collector',researchPriority:'Interesting',scope:'Selected modern interest',researchReason:'BNM issues commemorative coins including precious-metal versions; exact metal, mintage and theme are collector-relevant.'}),
 row('Malaysia','Malaysian ringgit (MYR)','Modern baseline','Third-series ordinary circulation','5 / 10 / 20 / 50 sen',2012,2026,{authority:'Bank Negara Malaysia',source:MY_BNM,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // THAILAND
 row('Thailand','Thai baht (THB)','Pre-modern Siam','Cowrie / Prakab / Pot Duang and early flat coin transitions','Various',1300,1860,{authority:'Bank of Thailand',source:TH_BOT,type:'Pre-modern historical money',researchPriority:'Interesting',researchReason:'Bank of Thailand documents cowrie shells, Prakab and Pot Duang before flat modern coins; unusual forms warrant research.'}),
 row('Thailand','Thai baht (THB)','Modern Siam / monarchy coinage','Rama IV–VII flat coinage','Satang / baht denominations',1860,1935,{authority:'Bank of Thailand / Thai Treasury ecosystem',source:TH_BOT,type:'Historical royal coinage',researchPriority:'Interesting'}),
 row('Thailand','Thai baht (THB)','Modern selected interest','Royal / commemorative Thai coin issues','Various baht',1950,2026,{authority:'Bank of Thailand / Treasury Department',source:'https://app.bot.or.th/BTWS_STAT/statistics/BOTWEBSTAT.aspx?language=ENG&reportID=34',type:'Commemorative / special',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Thailand','Thai baht (THB)','Modern baseline','Ordinary current circulation baseline','25 / 50 satang / 1 / 2 / 5 / 10 baht',1970,2026,{authority:'Bank of Thailand / Treasury Department',source:'https://app.bot.or.th/BTWS_STAT/statistics/BOTWEBSTAT.aspx?language=ENG&reportID=34',type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'}),

 // INDONESIA
 row('Indonesia','Indonesian rupiah (IDR)','Early Republic','Early rupiah coinage','Sen / rupiah denominations',1949,1970,{authority:'Bank Indonesia',source:ID_WITHDRAWN,type:'Historical Republic circulation',researchPriority:'Interesting'}),
 row('Indonesia','Indonesian rupiah (IDR)','Older modern coinage','Withdrawn 1991/1993/1997 higher denominations','Rp500 / Rp1,000',1991,1997,{authority:'Bank Indonesia',source:'https://www.bi.go.id/id/publikasi/ruang-media/news-release/Pages/sp_2532223.aspx',type:'Withdrawn circulation',researchPriority:'Interesting',researchReason:'Bank Indonesia withdrew Rp500 1991, Rp1,000 1993 and Rp500 1997; exact year/type is therefore a useful historical signal.'}),
 row('Indonesia','Indonesian rupiah (IDR)','Modern selected interest','1995 50th Independence commemorative precious/high denomination coins','Rp300,000 / Rp850,000',1995,1995,{authority:'Bank Indonesia',source:'https://www.bi.go.id/en/publikasi/ruang-media/news-release/Pages/sp_2423522.aspx',type:'Commemorative / special',researchPriority:'Interesting',scope:'Selected modern interest',researchReason:'Withdrawn 1995 commemorative coins with unusually high denominations; clear further-research trigger.'}),
 row('Indonesia','Indonesian rupiah (IDR)','Modern selected interest','2001 Sukarno centenary special rupiah series','Various',2001,2001,{authority:'Bank Indonesia',source:'https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_042026.aspx',type:'Commemorative / special',researchPriority:'Interesting',scope:'Selected modern interest'}),
 row('Indonesia','Indonesian rupiah (IDR)','Modern baseline','Ordinary current circulation baseline','Rp100 / Rp200 / Rp500 / Rp1,000',2016,2026,{authority:'Bank Indonesia',source:ID_BI,type:'Modern baseline',researchPriority:'Normal',scope:'Modern compact baseline'})
];

export const WORLD_BATCH05_ASIA_COUNTRIES=[
 {country:'Japan',aliases:['japan','japanese','nihon','nippon'],currencyAliases:['jpy','yen']},
 {country:'China',aliases:['china','chinese','prc','zhongguo'],currencyAliases:['cny','rmb','renminbi','yuan']},
 {country:'India',aliases:['india','indian'],currencyAliases:['inr','rupee']},
 {country:'South Korea',aliases:['south korea','korea','republic of korea','korean'],currencyAliases:['krw','won']},
 {country:'Taiwan',aliases:['taiwan','republic of china','roc'],currencyAliases:['twd','new taiwan dollar','nt$']},
 {country:'Hong Kong',aliases:['hong kong','hk'],currencyAliases:['hkd','hong kong dollar']},
 {country:'Singapore',aliases:['singapore','singaporean'],currencyAliases:['sgd','singapore dollar']},
 {country:'Malaysia',aliases:['malaysia','malaysian'],currencyAliases:['myr','ringgit']},
 {country:'Thailand',aliases:['thailand','thai','siam'],currencyAliases:['thb','baht','satang']},
 {country:'Indonesia',aliases:['indonesia','indonesian'],currencyAliases:['idr','rupiah']}
];

export function worldBatch05AsiaStats(){
 return {
  countries:WORLD_BATCH05_ASIA_COUNTRIES.length,
  records:WORLD_BATCH05_ASIA_REFERENCE_DB.length,
  historical:WORLD_BATCH05_ASIA_REFERENCE_DB.filter(r=>r.scope==='Priority historical').length,
  selectedModern:WORLD_BATCH05_ASIA_REFERENCE_DB.filter(r=>r.scope==='Selected modern interest').length,
  modernBaseline:WORLD_BATCH05_ASIA_REFERENCE_DB.filter(r=>r.scope==='Modern compact baseline').length,
  interesting:WORLD_BATCH05_ASIA_REFERENCE_DB.filter(r=>r.researchPriority==='Interesting').length
 };
}

export function worldBatch05AsiaExcelRows(){return WORLD_BATCH05_ASIA_REFERENCE_DB.map(r=>({
 Country:r.country,Currency:r.currency,Period:r.period,Series:r.series,Denomination:r.denomination,
 'Year From':r.yearFrom,'Year To':r.yearTo,'Mint / Privy Mark':r.mintMark,Metal:r.metal,
 'Weight (g)':r.weight??'','Diameter (mm)':r.diameter??'',Obverse:r.obverse,Reverse:r.reverse,Edge:r.edge,
 Type:r.type,Scope:r.scope,'Official Authority':r.authority,'Official Source':r.source,
 'Research Priority':r.researchPriority,'Research Reason':r.researchReason,'Metadata Status':r.metadataStatus
}));}
