// €2 commemorative recognition/research layer. Official ECB catalogue / EU Official Journal descriptions.
export const EURO_COMM_ROOT='https://www.ecb.europa.eu/euro/coins/comm/html/index.en.html';
export const EU_COMM_ROOT='https://economy-finance.ec.europa.eu/euro/euro-coins-and-notes/euro-coins/commemorative-coins_en';
export const EURO_COMM_YEAR_CATALOGUE=Object.fromEntries(Array.from({length:22},(_,i)=>{const year=2004+i;return [year,`https://www.ecb.europa.eu/euro/coins/comm/html/comm_${year}.en.html`];}));
const joint=[
 {year:2007,subject:'50th anniversary of the Treaty of Rome',clues:'Treaty of Rome; open book; Campidoglio paving'},
 {year:2009,subject:'10 years of Economic and Monetary Union',clues:'1999-2009; EMU; WWU; UEM; human figure; euro symbol'},
 {year:2012,subject:'10 years of euro banknotes and coins',clues:'2002-2012; euro symbol; citizens; trade; industry'},
 {year:2015,subject:'30 years of the EU flag',clues:'1985-2015; European flag; 12 stars'},
 {year:2022,subject:'35 years of the Erasmus Programme',clues:'ERASMUS PROGRAMME; 1987-2022; Erasmus portrait'}
];
const exact=[
 {country:'Greece',year:2004,subject:'Olympic Games in Athens 2004',clues:'ATHENS 2004; Olympic; discobolus; Greece'},
 {country:'Italy',year:2004,subject:'50th anniversary of the World Food Programme',clues:'WORLD FOOD PROGRAMME; globe; wheat; maize; rice; RI'},
 {country:'Vatican City',year:2004,subject:'75th anniversary of the foundation of Vatican City State',clues:'75 ANNO DELLO STATO; 1929-2004; CITTÀ DEL VATICANO; St Peter Basilica'},
 {country:'Vatican City',year:2005,subject:'20th World Youth Day',clues:'XX GIORNATA MONDIALE DELLA GIOVENTÙ; Cologne Cathedral; comet; CITTÀ DEL VATICANO; 2005; R'},
 {country:'San Marino',year:2005,subject:'World Year of Physics',clues:'SAN MARINO; Galileo Galilei; planets; physics; 2005; R'},
 {country:'Vatican City',year:2006,subject:'500th anniversary of the Pontifical Swiss Guard',clues:'GUARDIA SVIZZERA PONTIFICIA; CITTÀ DEL VATICANO; Swiss Guard; 1506; 2006; R'},
 {country:'San Marino',year:2006,subject:'500th anniversary of the death of Christopher Columbus',clues:'SAN MARINO; Christopher Columbus; three caravels; compass rose; 2006; R'},
 {country:'Finland',year:2006,subject:'100th anniversary of universal and equal suffrage',clues:'1.10.1906; 20 FI 06; male face; female face; M'},
 {country:'Belgium',year:2006,subject:'Atomium',clues:'Atomium; B; 2006; LL'},
 {country:'Germany',year:2006,subject:'Schleswig-Holstein — Holstentor',clues:'Schleswig-Holstein; Holstentor; Bundesrepublik Deutschland; 2006; A; D; F; G; J'},
 {country:'Italy',year:2006,subject:'XX Olympic Winter Games — Turin 2006',clues:'GIOCHI INVERNALI; TORINO; skier; Mole Antonelliana; RI; R; 2006'},
 {country:'Luxembourg',year:2006,subject:'25th birthday of Grand-Duke Guillaume',clues:'LËTZEBUERG; Grand Duke Henri; Grand Duke Guillaume; 2006'},
 {country:'Germany',year:2007,subject:'Mecklenburg-Vorpommern — Schwerin Castle',clues:'MECKLENBURG-VORPOMMERN; Schwerin Castle; Bundesrepublik Deutschland; A; D; F; G; J'},
 {country:'Luxembourg',year:2007,subject:'Grand Ducal Palace',clues:'LËTZEBUERG; Grand Duke Henri; Grand Ducal Palace; 2007'},
 {country:'Portugal',year:2007,subject:'Portuguese Presidency of the European Union',clues:'PORTUGAL; PRESIDÊNCIA DO CONSELHO DA UE; cork oak; INCM; 2007'},
 {country:'Monaco',year:2007,subject:'25th anniversary of the death of Princess Grace',clues:'MONACO; Princess Grace; Grace Kelly; 2007; R.B.BARON'},
 {country:'Vatican City',year:2007,subject:'80th birthday of Pope Benedict XVI',clues:'BENEDICTI XVI; ANNO LXXX; CITTA DEL VATICANO; 2007'},
 {country:'San Marino',year:2007,subject:'Bicentenary of the birth of Giuseppe Garibaldi',clues:'SAN MARINO; Giuseppe Garibaldi; 2007; E.L.F.'},
 {country:'Finland',year:2007,subject:'90th anniversary of Finland’s independence',clues:'FI; 1917; 2007; nine-oar boat; rowers'},
 {country:'Vatican City',year:2008,subject:'Year of St Paul — 2000th anniversary of his birth',clues:'CITTÀ DEL VATICANO; ANNO SANCTO PAULO DICATO; Paul; Damascus; horse; 2008; R; VEROI'},
 {country:'Finland',year:2008,subject:'60th anniversary of the Universal Declaration of Human Rights',clues:'HUMAN RIGHTS; human being; heart; FI; 2008; K'},
 {country:'Portugal',year:2008,subject:'60th anniversary of the Universal Declaration of Human Rights',clues:'PORTUGAL; 60 ANOS DA DECLARAÇÃO UNIVERSAL DOS DIREITOS HUMANOS; 2008; INCM'},
 {country:'France',year:2008,subject:'French Presidency of the Council of the European Union',clues:'2008 PRÉSIDENCE FRANÇAISE UNION EUROPÉENNE RF'},
 {country:'Slovenia',year:2008,subject:'500th anniversary of Primož Trubar’s birth',clues:'PRIMOŽ TRUBAR; 1508; 1586; SLOVENIJA 2008'},
 {country:'Belgium',year:2008,subject:'60th anniversary of the Universal Declaration of Human Rights',clues:'60; UNIVERSAL DECLARATION OF HUMAN RIGHTS; BELGIE; BELGIQUE; BELGIEN; 2008'},
 {country:'Italy',year:2008,subject:'60th anniversary of the Universal Declaration of Human Rights',clues:'DIRITTI UMANI; RI; 60; man; woman; olive branch; corn; cogwheel; 2008; R'},
 {country:'Luxembourg',year:2008,subject:'Grand-Duke Henri and Château de Berg',clues:'LËTZEBUERG; Grand Duke Henri; Château de Berg; 2008'},
 {country:'Germany',year:2008,subject:'Hamburg — St Michaelis Church',clues:'HAMBURG; St Michaelis; Michel; BUNDESREPUBLIK DEUTSCHLAND; 2008; A; D; F; G; J'},
 {country:'Greece',year:2010,subject:'2500th anniversary of the Battle of Marathon',clues:'Marathon; warrior runner; shield; 2500; Greece'},
 {country:'Vatican City',year:2010,subject:'Year for Priests',clues:'Year for Priests; priestly year; shepherd; lamb; lion; Vatican'},
 {country:'Finland',year:2010,subject:'Currency Decree of 1860',clues:'FI; 2010; lion; currency decree; coin values'},
 {country:'Netherlands',year:2013,subject:'200 years Kingdom of the Netherlands',clues:'200 jaar Koninkrijk der Nederlanden; Willem-Alexander; Beatrix; Juliana; Wilhelmina; Willem III; Willem II; Willem I; 2013'},
 {country:'Germany',year:2024,subject:'Mecklenburg-Vorpommern — Königsstuhl',clues:'MECKLENBURG VORPOMMERN; KÖNIGSSTUHL; D; 2024; A; D; F; G; J'},
 {country:'Germany',year:2025,subject:'Saarland — Saarschleife',clues:'SAARLAND; Saarschleife; D; 2025; A; D; F; G; J'},
 {country:'Belgium',year:2025,subject:'National Lottery of Belgium',clues:'loterie nationale; loterij; Fortuna; BE; 2025'},
 {country:'Lithuania',year:2025,subject:'Lithuanian Ethnographic Regions — Lithuania Minor',clues:'LIETUVA; MAŽOJI LIETUVA; Vydūnas; 2025'},
 {country:'Slovenia',year:2025,subject:'100th anniversary of birth of Miki Muster',clues:'SLOVENIJA; MIKI; MUSTER; 1925; 2025'},
 {country:'Monaco',year:2025,subject:'Marquisat des Baux',clues:'MONACO; MARQUISAT DES BAUX; Les Baux'},
 {country:'Greece',year:2025,subject:'200 years from the death of Laskarina Bouboulina',clues:'ΛΑΣΚΑΡΙΝΑΣ ΜΠΟΥΜΠΟΥΛΙΝΑΣ; ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ; Bouboulina; 2025'}
];
function mk(r,country=r.country||'Euro area joint issue'){const source=EURO_COMM_YEAR_CATALOGUE[r.year]||EURO_COMM_ROOT;return {country,currency:'Euro',denomination:'2 euro',yearFrom:r.year,yearTo:r.year,type:`€2 commemorative — ${r.subject}`,design:r.subject,clues:r.clues,authority:'European Commission / ECB',source,catalogue:'Official €2 commemorative',research:true,researchPriority:'Interesting',researchReason:'Possible official €2 commemorative issue. Confirm issuing country, exact year, design and condition.'};}
export const EURO_JOINT_COMM_REFERENCE_DB=joint.map(r=>mk(r));export const EURO_EXACT_COMM_REFERENCE_DB=exact.map(r=>mk(r,r.country));export const EURO_COMM_REFERENCE_DB=[...EURO_JOINT_COMM_REFERENCE_DB,...EURO_EXACT_COMM_REFERENCE_DB];
function norm(v){return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/€/g,'euro');}
function score(record,r){let s=0;const country=norm(record.country),text=norm([record.referenceClues,record.obverseDesign,record.reverseDesign,record.notes].filter(Boolean).join(' ')),year=Number(record.year)||null;if(year===r.yearFrom)s+=8;if(country&&norm(r.country)!=='euro area joint issue'&&country===norm(r.country))s+=8;for(const k of norm(r.clues).split(';').map(x=>x.trim()).filter(x=>x.length>=2))if(text.includes(k))s+=3;return s;}
export function matchEuroCommemorative(record={}){const year=Number(record.year)||null;if(!year)return null;const ranked=EURO_COMM_REFERENCE_DB.map(r=>({r,s:score(record,r)})).filter(x=>x.s>=11).sort((a,b)=>b.s-a.s);return ranked[0]?.r||null;}
export function classifyEuroTwo(record={}){const denomination=norm(record.denomination).trim(),currency=norm(record.currency);if(!(denomination==='2 euro'||denomination==='2 euros'||denomination==='2eur'||denomination==='2 eur')||!(currency.includes('euro')||!currency))return null;const exactHit=matchEuroCommemorative(record);if(exactHit)return {researchPriority:'Interesting',researchReason:`Possible official €2 commemorative: ${exactHit.design}. Verify against the official ${exactHit.yearFrom} catalogue.`,referenceAuthority:'European Commission / ECB',referenceSource:exactHit.source,coinType:exactHit.type};const year=Number(record.year)||null,yearSource=EURO_COMM_YEAR_CATALOGUE[year]||EURO_COMM_ROOT,text=norm([record.referenceClues,record.obverseDesign,record.reverseDesign,record.notes].filter(Boolean).join(' '));const regularWords=['federal eagle','beatrix','willem-alexander','philippe','albert ii','harp','eesti','europa and the bull','double cross','cloudberries'];if(regularWords.some(k=>text.includes(norm(k))))return {researchPriority:'Normal',researchReason:'Visible clues are consistent with a regular €2 national side; still verify year and country.',referenceAuthority:'European Commission',referenceSource:EU_COMM_ROOT,coinType:'Regular €2 circulation'};return {researchPriority:'Possibly interesting',researchReason:'€2 is the circulating euro denomination used for commemorative national-side designs. Exact design is unresolved; compare it with the official catalogue for the coin year.',referenceAuthority:'European Commission / ECB',referenceSource:yearSource,coinType:'€2 — commemorative check required'};}
export function euroCommemorativeRows(){return EURO_COMM_REFERENCE_DB.map(r=>({Country:r.country,Currency:r.currency,Denomination:r.denomination,Year:r.yearFrom,Type:r.type,Design:r.design,'Recognition Clues':r.clues,Authority:r.authority,Source:r.source,'Research Priority':r.researchPriority,'Research Reason':r.researchReason}));}
export function euroCommemorativeStats(){return {knownIssues:EURO_COMM_REFERENCE_DB.length,jointIssues:EURO_JOINT_COMM_REFERENCE_DB.length,yearCatalogues:Object.keys(EURO_COMM_YEAR_CATALOGUE).length};}
