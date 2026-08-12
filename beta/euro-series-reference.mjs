// National-series refinements for euro coins, based on European Commission national-side catalogue.
const ROOT='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/national-sides-euro-coins';
const all8=['1 cent','2 cent','5 cent','10 cent','20 cent','50 cent','1 euro','2 euro'];
const low=['1 cent','2 cent','5 cent'], mid=['10 cent','20 cent','50 cent'], high=['1 euro','2 euro'];
const series=[];
function add(country,name,from,to,denoms,design,path,clues='',priority='Normal',reason='Official regular circulation series; verify year and national-side design.'){
 for(const denomination of denoms)series.push({country,currency:'Euro',denomination,series:name,yearFrom:from,yearTo:to,design,clues,authority:'European Commission',source:`${ROOT}/${path}_en`,catalogue:'EU official national-side series',researchPriority:priority,researchReason:reason});
}
add('Netherlands','Beatrix',2002,2013,all8,'Queen Beatrix','netherlands','Beatrix Koningin der Nederlanden');
add('Netherlands','Willem-Alexander',2014,2026,all8,'King Willem-Alexander','netherlands','Willem-Alexander; Koning der Nederlanden; mint mark');
add('Belgium','Albert II first design',2002,2007,all8,'King Albert II','belgium','Albert II; royal monogram A');
add('Belgium','Albert II modified design',2008,2013,all8,'King Albert II; country code and mint marks in inner part','belgium','BE; Albert II; mint marks');
add('Belgium','Philippe',2014,2026,all8,'King Philippe','belgium','Philippe; BE; royal monogram; mint marks');
add('France','First series cents',1999,2026,low,'Marianne','france','RF; Marianne');
add('France','First series Sower cents',1999,2023,mid,'The Sower','france','RF; Sower');
add('France','New cent series',2024,2026,mid,'New French 10, 20 and 50 cent national designs','france','RF; 2024 or later');
add('France','Tree series',1999,2021,high,'Tree symbolising life, growth and stability','france','Liberté Égalité Fraternité; tree');
add('France','New €1/€2 series',2022,2026,high,'New French €1 and €2 national designs','france','RF; 2022 or later');
add('Spain','First series',1999,2009,all8,'Spanish national motifs: cathedral, Cervantes and monarch by denomination','spain','ESPAÑA');
add('Spain','Second series',2010,2014,all8,'Modified Spanish national sides under common EU guidelines','spain','ESPAÑA');
add('Spain','Felipe VI high denominations',2015,2026,high,'King Felipe VI','spain','FELIPE VI; ESPAÑA');
add('Spain','Current cents',2015,2026,[...low,...mid],'Spanish cultural motifs','spain','ESPAÑA');
add('Monaco','Rainier III',2001,2005,all8,'Rainier III / Rainier III and Albert II / princely seal / coat of arms by denomination','monaco','MONACO; Rainier III');
add('Monaco','Albert II',2006,2026,all8,'Albert II / monogram / coat of arms by denomination','monaco','MONACO; Albert II');
add('San Marino','First series',2002,2016,all8,'San Marino landmarks and state symbols','san-marino','SAN MARINO');
add('San Marino','Second series',2017,2026,all8,'Second San Marino national-side series','san-marino','SAN MARINO');
add('Vatican City','John Paul II',2002,2005,all8,'Pope John Paul II','vatican-city','CITTÀ DEL VATICANO; IOANNES PAVLVS II');
add('Vatican City','Sede Vacante 2005',2005,2005,all8,'Sede Vacante emblem','vatican-city','SEDE VACANTE');
add('Vatican City','Benedict XVI',2006,2013,all8,'Pope Benedict XVI','vatican-city','BENEDICTVS XVI');
add('Vatican City','Francis portrait',2014,2016,all8,'Pope Francis portrait','vatican-city','FRANCISCVS');
add('Vatican City','Francis coat of arms',2017,2026,all8,'Papal coat of arms of Pope Francis','vatican-city','FRANCISCVS; coat of arms');
// Countries where the Commission catalogue describes a stable national-side system; denomination groups improve visual matching.
add('Germany','Federal motifs',2002,2026,low,'Oak twig','germany','oak twig; mint letter A/D/F/G/J','Possibly interesting','German coins carry mint letters; record exact year and mint letter.');
add('Germany','Federal motifs',2002,2026,mid,'Brandenburg Gate','germany','Brandenburg Gate; mint letter A/D/F/G/J','Possibly interesting','German coins carry mint letters; record exact year and mint letter.');
add('Germany','Federal motifs',2002,2026,high,'Federal eagle','germany','eagle; mint letter A/D/F/G/J','Possibly interesting','German coins carry mint letters; record exact year and mint letter.');
add('Bulgaria','First euro series',2026,2026,['1 cent'],'Madara Horseman','bulgaria','БЪЛГАРИЯ; СТОТИНКА; 2026');
add('Bulgaria','First euro series',2026,2026,['2 cent','5 cent','10 cent','20 cent','50 cent'],'Madara Horseman','bulgaria','БЪЛГАРИЯ; СТОТИНКИ; 2026');
add('Bulgaria','First euro series',2026,2026,['1 euro'],'St Ivan Rilski','bulgaria','БЪЛГАРИЯ; ЕВРО; 2026');
add('Bulgaria','First euro series',2026,2026,['2 euro'],'Paisius of Hilendar','bulgaria','БЪЛГАРИЯ; ЕВРО; 2026; БОЖЕ ПАЗИ БЪЛГАРИЯ');
export const EURO_SERIES_REFERENCE_DB=series;
export function euroSeriesRows(){return series.map(r=>({Country:r.country,Currency:r.currency,Denomination:r.denomination,Series:r.series,'Year From':r.yearFrom,'Year To':r.yearTo,Design:r.design,'Recognition Clues':r.clues,Authority:r.authority,Source:r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
export function euroSeriesStats(){return {records:series.length,countries:new Set(series.map(r=>r.country)).size,series:new Set(series.map(r=>`${r.country}|${r.series}`)).size};}
