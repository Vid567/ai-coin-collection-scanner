// Europe batch 3 — remaining European / transcontinental coverage with official national sources.
// Belarus, Russia, Kosovo, Andorra, Monaco, San Marino, Vatican City, Liechtenstein, Azerbaijan, Kazakhstan.

export const EUROPE_BATCH03 = [
 {country:'Belarus',aliases:['belarus','belarusian','wit-rusland','witrusland'],currency:'Belarusian ruble (BYN)',authority:'National Bank of the Republic of Belarus',source:'https://www.nb-rb.by/engl/coinsbanknotes/coins/17.htm',denominations:['1 copeck','2 copecks','5 copecks','10 copecks','20 copecks','50 copecks','1 ruble','2 rubles'],yearFrom:2016,matchByCurrency:true},
 {country:'Russia',aliases:['russia','russian','rusland','rossiya'],currency:'Russian ruble (RUB)',authority:'Bank of Russia',source:'https://www.cbr.ru/eng/cash_circulation/',denominations:['1 kopeck','5 kopecks','10 kopecks','50 kopecks','1 ruble','2 rubles','5 rubles','10 rubles'],yearFrom:1997,matchByCurrency:true},
 {country:'Kosovo',aliases:['kosovo','kosova','kosovan'],currency:'Euro',authority:'Central Bank of the Republic of Kosovo',source:'https://bqk-kos.org/operacionet-bankare/paraja-ne-qarkullim/?lang=en',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2002,matchByCurrency:false,note:'Kosovo uses the euro but is not an issuing euro-state; rows represent currency-in-use coverage.'},
 {country:'Andorra',aliases:['andorra','andorran'],currency:'Euro',authority:'Government of Andorra',source:'https://www.govern.ad/ca/w/el-govern-aprova-l-emissio-de-monedes-d-euro-andorranes-per-al-2026-per-un-valor-de-6-039-160-euros',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2014,matchByCurrency:false},
 {country:'Monaco',aliases:['monaco','monegasque','monégasque'],currency:'Euro',authority:'Government of Monaco / Journal de Monaco',source:'https://journaldemonaco.gouv.mc/Journaux/2025/Journal-8764/Ordonnance-Souveraine-n-11.455-du-5-septembre-2025-modifiant-l-Ordonnance-Souveraine-n-15.191-du-17-janvier-2002-autorisant-l-emission-et-la-mise-en-circulation-de-pieces-de-monnaie-de-0-01-0-02-0-05-0-10-0-20-0-50-1-et-2-euros-modifiee',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2002,matchByCurrency:false},
 {country:'San Marino',aliases:['san marino','sammarinese','sammarinese republic'],currency:'Euro',authority:'Poste San Marino',source:'https://www.poste.sm/the-san-marino-post-office-is-celebrating-the-450th-anniversary-of-the-death-of-titan-by-issuing-a-2-euro-coin-in-standard-proof-and-reverse-proof-quality/',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2002,matchByCurrency:false},
 {country:'Vatican City',aliases:['vatican','vatican city','vaticaanstad','citta del vaticano'],currency:'Euro',authority:'Governorate of Vatican City State',source:'https://www.vaticanstate.va/en/news/3629-new-numismatic-issues-year-2025-of-the-governorate-of-the-vatican-city-state.html',denominations:['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'],yearFrom:2002,matchByCurrency:false},
 {country:'Liechtenstein',aliases:['liechtenstein','principality of liechtenstein'],currency:'Swiss franc (CHF)',authority:'Government of Liechtenstein / Swiss monetary area',source:'https://www.llv.li/de/landesverwaltung/amt-fuer-auswaertige-angelegenheiten/themen/bilaterale-beziehungen',denominations:['5 rappen','10 rappen','20 rappen','1/2 franc','1 franc','2 francs','5 francs'],yearFrom:1924,matchByCurrency:false,note:'Swiss-franc currency coverage; Liechtenstein does not issue a separate national circulation coin series.'},
 {country:'Azerbaijan',aliases:['azerbaijan','azerbeidzjan','azerbaycan'],currency:'Azerbaijani manat (AZN)',authority:'Central Bank of the Republic of Azerbaijan',source:'https://www.cbar.az/moneymarks/coins/index?category=1&language=en',denominations:['1 gapik','3 gapik','5 gapik','10 gapik','20 gapik','50 gapik'],yearFrom:2006,matchByCurrency:true},
 {country:'Kazakhstan',aliases:['kazakhstan','kazachstan','qazaqstan'],currency:'Kazakhstani tenge (KZT)',authority:'National Bank of Kazakhstan',source:'https://nationalbank.kz/en/catalog/coins',denominations:['1 tenge','2 tenge','5 tenge','10 tenge','20 tenge','50 tenge','100 tenge','200 tenge'],yearFrom:1993,matchByCurrency:true}
];

export const EUROPE_BATCH03_REFERENCE_DB = EUROPE_BATCH03.flatMap(country => [
 ...country.denominations.map(denomination => ({
  country:country.country,
  currency:country.currency,
  denomination,
  series:`${country.country} circulation / currency-use coins`,
  yearFrom:country.yearFrom,
  yearTo:2026,
  type:'Regular circulation',
  authority:country.authority,
  source:country.source,
  researchPriority:'Normal',
  researchReason:country.note || 'Standard circulation or official currency-use record. Increase priority for older series, scarce dates, errors, precious metals or commemorative issues.'
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
  researchReason:'Historical currency periods, design changes and collector issues require exact attribution.'
 }
]);

export function europeBatch03Stats(){
 return {countries:EUROPE_BATCH03.length,records:EUROPE_BATCH03_REFERENCE_DB.length};
}
