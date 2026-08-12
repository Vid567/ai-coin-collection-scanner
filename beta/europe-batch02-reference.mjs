// Europe batch 2 — official-source country reference layer.
// Bosnia and Herzegovina, Serbia, Montenegro, North Macedonia, Albania, Moldova, Ukraine, Turkey, Georgia, Armenia.

export const EUROPE_BATCH02 = [
 {country:'Bosnia and Herzegovina',aliases:['bosnia','bosnie','bosnia and herzegovina','bih'],currency:'Convertible mark (BAM)',authority:'Central Bank of Bosnia and Herzegovina',source:'https://www.cbbh.ba/',denominations:['5 feninga','10 feninga','20 feninga','50 feninga','1 marka','2 marke','5 maraka'],yearFrom:1998},
 {country:'Serbia',aliases:['serbia','servie','srbija','serbian'],currency:'Serbian dinar (RSD)',authority:'National Bank of Serbia',source:'https://www.nbs.rs/en/novac-i-placanja/kovani-novac/',denominations:['1 dinar','2 dinara','5 dinara','10 dinara','20 dinara'],yearFrom:2003},
 {country:'Montenegro',aliases:['montenegro','montenegrin','crna gora'],currency:'Euro (unilateral use)',authority:'Central Bank of Montenegro',source:'https://www.cbcg.me/',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2002},
 {country:'North Macedonia',aliases:['north macedonia','macedonia','noord macedonie','makedonija'],currency:'Macedonian denar (MKD)',authority:'National Bank of the Republic of North Macedonia',source:'https://www.nbrm.mk/',denominations:['1 denar','2 denari','5 denari','10 denari','50 denari'],yearFrom:1993},
 {country:'Albania',aliases:['albania','albanië','shqiperia'],currency:'Albanian lek (ALL)',authority:'Bank of Albania',source:'https://www.bankofalbania.org/',denominations:['1 lek','5 lek','10 lek','20 lek','50 lek','100 lek'],yearFrom:1992},
 {country:'Moldova',aliases:['moldova','moldavie','moldova'],currency:'Moldovan leu (MDL)',authority:'National Bank of Moldova',source:'https://www.bnm.md/en/content/coins',denominations:['1 ban','5 bani','10 bani','25 bani','50 bani','1 leu','2 lei','5 lei','10 lei'],yearFrom:1993},
 {country:'Ukraine',aliases:['ukraine','oekraine','ukraina'],currency:'Ukrainian hryvnia (UAH)',authority:'National Bank of Ukraine',source:'https://bank.gov.ua/en/uah/coins',denominations:['10 kopiyok','50 kopiyok','1 hryvnia','2 hryvnia','5 hryvnia','10 hryvnia'],yearFrom:1996},
 {country:'Turkey',aliases:['turkey','turkiye','turkije'],currency:'Turkish lira (TRY)',authority:'Central Bank of the Republic of Turkey',source:'https://www.tcmb.gov.tr/',denominations:['1 kuruş','5 kuruş','10 kuruş','25 kuruş','50 kuruş','1 lira'],yearFrom:2005},
 {country:'Georgia',aliases:['georgia','georgie','sakartvelo'],currency:'Georgian lari (GEL)',authority:'National Bank of Georgia',source:'https://nbg.gov.ge/en/',denominations:['1 tetri','2 tetri','5 tetri','10 tetri','20 tetri','50 tetri','1 lari','2 lari'],yearFrom:1995},
 {country:'Armenia',aliases:['armenia','armenie','hayastan'],currency:'Armenian dram (AMD)',authority:'Central Bank of Armenia',source:'https://www.cba.am/en/SitePages/Coins.aspx',denominations:['10 dram','20 dram','50 dram','100 dram','200 dram','500 dram'],yearFrom:1994}
];

export const EUROPE_BATCH02_REFERENCE_DB = EUROPE_BATCH02.flatMap(country => [
 ...country.denominations.map(denomination => ({
  country:country.country,
  currency:country.currency,
  denomination,
  series:`${country.country} circulation coins`,
  yearFrom:country.yearFrom,
  yearTo:2026,
  type:'Regular circulation',
  authority:country.authority,
  source:country.source,
  researchPriority:'Normal',
  researchReason:'Standard circulation coin. Increase priority for older series, errors, precious metals, scarce varieties or commemorative issues.'
 })),
 {
  country:country.country,
  currency:country.currency,
  denomination:'Various',
  series:`${country.country} historical and commemorative coins`,
  yearFrom:1800,
  yearTo:2026,
  type:'Historical',
  authority:country.authority,
  source:country.source,
  researchPriority:'Possibly interesting',
  researchReason:'Historical periods, design changes and collector issues require exact attribution.'
 }
]);

export function europeBatch02Stats(){
 return {countries:EUROPE_BATCH02.length,records:EUROPE_BATCH02_REFERENCE_DB.length};
}
