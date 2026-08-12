import './coin.js';

import { EURO_REFERENCE_DB, euroReferenceRows } from './euro-reference.mjs';
import { EURO_SERIES_REFERENCE_DB, euroSeriesRows } from './euro-series-reference.mjs';
import { classifyEuroTwo, euroCommemorativeRows } from './euro-commemorative-reference.mjs';
import { GERMANY_HISTORICAL_REFERENCE_DB, germanyHistoricalRows } from './europe-historical-germany.mjs';
import { GERMANY_5DM_COMM } from './germany-5dm-commemoratives.mjs';
import { GERMANY_10DM_COMM } from './germany-10dm-commemoratives.mjs';
import { GERMANY_DDR_REFERENCE_DB, germanyDdrRows } from './germany-ddr-reference.mjs';
import { IRELAND_HISTORICAL_REFERENCE_DB, irelandHistoricalRows } from './europe-historical-ireland.mjs';
import { NETHERLANDS_HISTORICAL_REFERENCE_DB, netherlandsHistoricalRows, netherlandsHistoricalStats } from './europe-historical-netherlands.mjs';
import { BELGIUM_HISTORICAL_REFERENCE_DB, belgiumHistoricalRows, belgiumHistoricalStats } from './europe-historical-belgium.mjs';
import { FRANCE_HISTORICAL_REFERENCE_DB, franceHistoricalRows, franceHistoricalStats } from './europe-historical-france.mjs';
import { SPAIN_HISTORICAL_REFERENCE_DB, spainHistoricalRows, spainHistoricalStats } from './europe-historical-spain.mjs';
import { ITALY_HISTORICAL_REFERENCE_DB, italyHistoricalRows, italyHistoricalStats } from './europe-historical-italy.mjs';
import { AUSTRIA_HISTORICAL_REFERENCE_DB, austriaHistoricalRows, austriaHistoricalStats } from './europe-historical-austria.mjs';
import { PORTUGAL_HISTORICAL_REFERENCE_DB, portugalHistoricalRows, portugalHistoricalStats } from './europe-historical-portugal.mjs';
import { GREECE_HISTORICAL_REFERENCE_DB, greeceHistoricalRows, greeceHistoricalStats } from './europe-historical-greece.mjs';
import { FINLAND_HISTORICAL_REFERENCE_DB, finlandHistoricalRows, finlandHistoricalStats } from './europe-historical-finland.mjs';
import { LUXEMBOURG_HISTORICAL_REFERENCE_DB, luxembourgHistoricalRows, luxembourgHistoricalStats } from './europe-historical-luxembourg.mjs';
import { SLOVENIA_HISTORICAL_REFERENCE_DB, sloveniaHistoricalRows, sloveniaHistoricalStats } from './europe-historical-slovenia.mjs';
import { CYPRUS_HISTORICAL_REFERENCE_DB, cyprusHistoricalRows, cyprusHistoricalStats } from './europe-historical-cyprus.mjs';
import { MALTA_HISTORICAL_REFERENCE_DB, maltaHistoricalRows, maltaHistoricalStats } from './europe-historical-malta.mjs';
import { SLOVAKIA_HISTORICAL_REFERENCE_DB, slovakiaHistoricalRows, slovakiaHistoricalStats } from './europe-historical-slovakia.mjs';
import { ESTONIA_HISTORICAL_REFERENCE_DB, estoniaHistoricalRows, estoniaHistoricalStats } from './europe-historical-estonia.mjs';
import { LATVIA_HISTORICAL_REFERENCE_DB, latviaHistoricalRows, latviaHistoricalStats } from './europe-historical-latvia.mjs';
import { LITHUANIA_HISTORICAL_REFERENCE_DB, lithuaniaHistoricalRows, lithuaniaHistoricalStats } from './europe-historical-lithuania.mjs';
import { CROATIA_HISTORICAL_REFERENCE_DB, croatiaHistoricalRows, croatiaHistoricalStats } from './europe-historical-croatia.mjs';
import { BULGARIA_HISTORICAL_REFERENCE_DB, bulgariaHistoricalRows, bulgariaHistoricalStats } from './europe-historical-bulgaria.mjs';
import { EUROPE_BATCH01, EUROPE_BATCH01_REFERENCE_DB, europeBatch01Stats } from './europe-batch01-reference.mjs';

const norm = value => String(value || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/€/g, 'euro')
  .replace(/\s+/g, ' ');

const value = (card, key) => card?.querySelector(`[data-field="${key}"]`)?.value || '';

const set = (card, key, newValue) => {
  const element = card?.querySelector(`[data-field="${key}"]`);
  if (!element || newValue == null || newValue === '') return;
  element.value = String(newValue);
  element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
};

const yearOf = input => {
  const match = String(input || '').match(/\b(18|19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
};

function isEuro(card) {
  const currency = norm(value(card, 'currency'));
  const denomination = norm(value(card, 'denomination'));
  return currency.includes('euro') || /^(1|2|5|10|20|50) cent$/.test(denomination) || /^[12] euro/.test(denomination);
}

function scoreSeries(card, row) {
  let score = 0;
  const country = norm(value(card, 'country'));
  const denomination = norm(value(card, 'denomination'));
  const year = yearOf(value(card, 'year'));
  const text = norm([
    value(card, 'referenceClues'),
    value(card, 'obverseDesign'),
    value(card, 'reverseDesign'),
    value(card, 'notes'),
  ].join(' '));

  if (country && norm(row.country) === country) score += 8;
  if (denomination && norm(row.denomination) === denomination) score += 8;
  if (year && year >= row.yearFrom && year <= row.yearTo) score += 5;

  if (text) {
    for (const keyword of norm(`${row.design};${row.clues}`)
      .split(/[;,/]/)
      .map(item => item.trim())
      .filter(item => item.length >= 3)) {
      if (text.includes(keyword)) score += 2;
    }
  }

  return score;
}

function enrichEuroCard(card) {
  if (!card || !isEuro(card)) return;

  const country = norm(value(card, 'country'));
  const denomination = norm(value(card, 'denomination'));
  const year = yearOf(value(card, 'year'));

  const regular = EURO_REFERENCE_DB.find(row =>
    (!country || norm(row.country) === country) &&
    (!denomination || norm(row.denomination) === denomination) &&
    (!year || (year >= row.yearFrom && year <= row.yearTo))
  );

  const scored = EURO_SERIES_REFERENCE_DB
    .map(row => ({ r: row, s: scoreSeries(card, row) }))
    .filter(item => item.s > 0)
    .sort((left, right) => right.s - left.s);

  const series = scored[0]?.r;
  const seriesScore = scored[0]?.s || 0;
  const chosen = seriesScore >= 8 ? series : regular;

  if (chosen) {
    set(card, 'currency', 'Euro');
    set(card, 'country', chosen.country);
    set(card, 'coinType', seriesScore >= 8
      ? `${series.country} ${series.denomination} — ${series.series}`
      : chosen.type);
    set(card, 'referenceAuthority', 'European Commission');
    set(card, 'referenceSource', chosen.source);
  }

  const twoEuro = classifyEuroTwo({
    denomination: value(card, 'denomination'),
    currency: value(card, 'currency') || 'Euro',
    year: value(card, 'year'),
    country: value(card, 'country'),
    referenceClues: value(card, 'referenceClues'),
    obverseDesign: value(card, 'obverseDesign'),
    reverseDesign: value(card, 'reverseDesign'),
    notes: value(card, 'notes'),
  });

  if (twoEuro) {
    set(card, 'researchPriority', twoEuro.researchPriority);
    set(card, 'researchReason', twoEuro.researchReason);
    set(card, 'referenceSource', twoEuro.referenceSource);
  }
}

const allGerman = [
  ...GERMANY_HISTORICAL_REFERENCE_DB,
  ...GERMANY_5DM_COMM,
  ...GERMANY_10DM_COMM,
  ...GERMANY_DDR_REFERENCE_DB,
];

const batch01ByCountry = new Map(
  EUROPE_BATCH01.map(country => [country.country, {
    ...country,
    database: EUROPE_BATCH01_REFERENCE_DB.filter(row => row.country === country.country),
  }])
);

function scoreHist(card, row, aliases) {
  let score = 0;
  const country = norm(value(card, 'country'));
  const currency = norm(value(card, 'currency'));
  const denomination = norm(value(card, 'denomination'));
  const year = yearOf(value(card, 'year'));
  const text = norm([
    value(card, 'referenceClues'),
    value(card, 'obverseDesign'),
    value(card, 'reverseDesign'),
    value(card, 'notes'),
  ].join(' '));

  if (country && aliases.some(alias => country.includes(norm(alias)))) score += 5;
  if (currency && (
    currency === norm(row.currency) ||
    norm(row.currency).includes(currency) ||
    currency.includes(norm(row.currency))
  )) score += 8;
  if (denomination && denomination === norm(row.denomination)) score += 8;
  if (year && year >= Number(row.yearFrom || 0) && year <= Number(row.yearTo || 9999)) score += 6;

  for (const keyword of [row.subject, row.obverse, row.reverse, row.series].filter(Boolean).map(norm)) {
    if (keyword && text.includes(keyword)) score += 4;
  }

  return score;
}

function applyHist(card, hit, label) {
  const row = hit.r;
  set(card, 'country', row.country);
  set(card, 'currency', row.currency);
  set(card, 'coinType', row.subject
    ? `${row.denomination} — ${row.subject}`
    : `${row.denomination} — ${row.series}`);
  set(card, 'referenceMatch', `Matched to official ${label} historical reference`);
  set(card, 'referenceAuthority', row.authority);
  set(card, 'referenceSource', row.source);
  set(card, 'metal', row.metal || '');
  set(card, 'weight', row.weight || '');
  set(card, 'diameter', row.diameter || '');
  set(card, 'researchPriority', row.researchPriority || row.priority || 'Possibly interesting');
  set(card, 'researchReason', row.researchReason || row.reason);
  set(card, 'confidence', hit.s >= 22 ? 'High' : 'Medium');
}

function enrich(card, database, aliases, label) {
  if (!card || isEuro(card)) return;

  const hit = database
    .map(row => ({ r: row, s: scoreHist(card, row, aliases) }))
    .filter(item => item.s >= 13)
    .sort((left, right) => right.s - left.s)[0];

  if (hit) applyHist(card, hit, label);
}

function enrichBatch01(card) {
  for (const country of batch01ByCountry.values()) {
    enrich(card, country.database, country.aliases, country.authority);
  }
}

document.querySelector('#records')?.addEventListener('click', event => {
  const button = event.target.closest('button[data-action="verify-reference"]');
  if (!button) return;

  const id = button.closest('.record-card')?.dataset.id;

  setTimeout(() => {
    const card = document.querySelector(`.record-card[data-id="${CSS.escape(id)}"]`);

    enrichEuroCard(card);
    enrich(card, allGerman, ['germany', 'deutschland', 'ddr'], 'Deutsche Bundesbank');
    enrich(card, IRELAND_HISTORICAL_REFERENCE_DB, ['ireland', 'eire', 'irish'], 'Central Bank of Ireland');
    enrich(card, NETHERLANDS_HISTORICAL_REFERENCE_DB, ['netherlands', 'nederland', 'dutch'], 'De Nederlandsche Bank / NNC');
    enrich(card, BELGIUM_HISTORICAL_REFERENCE_DB, ['belgium', 'belgie', 'belgique', 'belgien', 'belgian'], 'National Bank of Belgium');
    enrich(card, FRANCE_HISTORICAL_REFERENCE_DB, ['france', 'frankrijk', 'francais', 'french'], 'Banque de France / Monnaie de Paris');
    enrich(card, SPAIN_HISTORICAL_REFERENCE_DB, ['spain', 'espana', 'spanje', 'spanish', 'espanol'], 'Banco de España / FNMT-RCM');
    enrich(card, ITALY_HISTORICAL_REFERENCE_DB, ['italy', 'italia', 'italie', 'italian', 'italiano'], 'Banca d’Italia / Museo della Zecca');
    enrich(card, AUSTRIA_HISTORICAL_REFERENCE_DB, ['austria', 'osterreich', 'oesterreich', 'oostenrijk', 'austrian'], 'Oesterreichische Nationalbank / Münze Österreich');
    enrich(card, PORTUGAL_HISTORICAL_REFERENCE_DB, ['portugal', 'portuguese', 'portugues', 'portugees'], 'Banco de Portugal / INCM — Casa da Moeda');
    enrich(card, GREECE_HISTORICAL_REFERENCE_DB, ['greece', 'griekenland', 'hellas', 'hellenic', 'greek'], 'Bank of Greece / Greek Mint');
    enrich(card, FINLAND_HISTORICAL_REFERENCE_DB, ['finland', 'suomi', 'finnish', 'fins', 'finlandia'], 'Bank of Finland');
    enrich(card, LUXEMBOURG_HISTORICAL_REFERENCE_DB, ['luxembourg', 'luxemburg', 'letzebuerg', 'luxembourgeois'], 'Banque centrale du Luxembourg');
    enrich(card, SLOVENIA_HISTORICAL_REFERENCE_DB, ['slovenia', 'slovenie', 'slovenija', 'slovene', 'slovenian'], 'Banka Slovenije');
    enrich(card, CYPRUS_HISTORICAL_REFERENCE_DB, ['cyprus', 'kypros', 'kibris', 'cypriot', 'κυπρος'], 'Central Bank of Cyprus');
    enrich(card, MALTA_HISTORICAL_REFERENCE_DB, ['malta', 'maltese', 'malti'], 'Central Bank of Malta');
    enrich(card, SLOVAKIA_HISTORICAL_REFERENCE_DB, ['slovakia', 'slowakije', 'slovensko', 'slovak'], 'Národná banka Slovenska');
    enrich(card, ESTONIA_HISTORICAL_REFERENCE_DB, ['estonia', 'estland', 'eesti', 'estonian', 'estisch'], 'Eesti Pank');
    enrich(card, LATVIA_HISTORICAL_REFERENCE_DB, ['latvia', 'letland', 'latvija', 'latvian', 'lets'], 'Latvijas Banka');
    enrich(card, LITHUANIA_HISTORICAL_REFERENCE_DB, ['lithuania', 'litouwen', 'lietuva', 'lithuanian', 'litouws'], 'Bank of Lithuania');
    enrich(card, CROATIA_HISTORICAL_REFERENCE_DB, ['croatia', 'kroatie', 'hrvatska', 'croatian', 'kroatisch'], 'Croatian National Bank');
    enrich(card, BULGARIA_HISTORICAL_REFERENCE_DB, ['bulgaria', 'bulgarije', 'българия', 'bulgarian', 'bulgaars'], 'Bulgarian National Bank');
    enrichBatch01(card);
  }, 0);
});

function append(workbook, name, rows) {
  if (!rows?.length || workbook.SheetNames.includes(name)) return;
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = Object.keys(rows[0]).map(key => ({
    wch: Math.min(60, Math.max(14, key.length + 2)),
  }));
  XLSX.utils.book_append_sheet(workbook, worksheet, name);
}

const comm = rows => rows.map(row => ({
  Country: row.country,
  Currency: row.currency,
  Series: row.series,
  Denomination: row.denomination,
  Subject: row.subject,
  Year: row.yearFrom,
  'Mint Mark': row.mintMark || '',
  Mintage: row.mintage || '',
  Source: row.source,
  'Research Priority': row.researchPriority,
}));

const genericRows = rows => rows.map(row => ({
  Country: row.country,
  Currency: row.currency,
  Period: row.period,
  Series: row.series,
  Denomination: row.denomination,
  'Year From': row.yearFrom,
  'Year To': row.yearTo,
  Type: row.type,
  Authority: row.authority,
  Source: row.source,
  'Research Priority': row.researchPriority,
  'Research Reason': row.researchReason,
}));

const hook = () => {
  if (!globalThis.XLSX?.writeFile || XLSX.writeFile.__euHook) return false;

  const originalWriteFile = XLSX.writeFile.bind(XLSX);
  const hookedWriteFile = (workbook, ...args) => {
    append(workbook, 'EU Euro Circulation', euroReferenceRows());
    append(workbook, 'EU National Series', euroSeriesRows());
    append(workbook, 'EU €2 Commemorative', euroCommemorativeRows());
    append(workbook, 'Germany DM', germanyHistoricalRows());
    append(workbook, 'Germany 5DM Comm', comm(GERMANY_5DM_COMM));
    append(workbook, 'Germany 10DM Comm', comm(GERMANY_10DM_COMM));
    append(workbook, 'Germany DDR', germanyDdrRows());
    append(workbook, 'Ireland Historical', irelandHistoricalRows());
    append(workbook, 'Netherlands Historical', netherlandsHistoricalRows());
    append(workbook, 'Belgium Historical', belgiumHistoricalRows());
    append(workbook, 'France Historical', franceHistoricalRows());
    append(workbook, 'Spain Historical', spainHistoricalRows());
    append(workbook, 'Italy Historical', italyHistoricalRows());
    append(workbook, 'Austria Historical', austriaHistoricalRows());
    append(workbook, 'Portugal Historical', portugalHistoricalRows());
    append(workbook, 'Greece Historical', greeceHistoricalRows());
    append(workbook, 'Finland Historical', finlandHistoricalRows());
    append(workbook, 'Luxembourg Historical', luxembourgHistoricalRows());
    append(workbook, 'Slovenia Historical', sloveniaHistoricalRows());
    append(workbook, 'Cyprus Historical', cyprusHistoricalRows());
    append(workbook, 'Malta Historical', maltaHistoricalRows());
    append(workbook, 'Slovakia Historical', slovakiaHistoricalRows());
    append(workbook, 'Estonia Historical', estoniaHistoricalRows());
    append(workbook, 'Latvia Historical', latviaHistoricalRows());
    append(workbook, 'Lithuania Historical', lithuaniaHistoricalRows());
    append(workbook, 'Croatia Historical', croatiaHistoricalRows());
    append(workbook, 'Bulgaria Historical', bulgariaHistoricalRows());

    for (const country of batch01ByCountry.values()) {
      append(workbook, `${country.country} Historical`, genericRows(country.database));
    }

    return originalWriteFile(workbook, ...args);
  };

  hookedWriteFile.__euHook = true;
  XLSX.writeFile = hookedWriteFile;
  return true;
};

if (!hook()) {
  window.addEventListener('load', hook, { once: true });
}

const status = document.querySelector('#reference-db-status');
if (status) {
  const n = netherlandsHistoricalStats();
  const b = belgiumHistoricalStats();
  const f = franceHistoricalStats();
  const s = spainHistoricalStats();
  const i = italyHistoricalStats();
  const a = austriaHistoricalStats();
  const p = portugalHistoricalStats();
  const g = greeceHistoricalStats();
  const fi = finlandHistoricalStats();
  const lu = luxembourgHistoricalStats();
  const si = sloveniaHistoricalStats();
  const cy = cyprusHistoricalStats();
  const mt = maltaHistoricalStats();
  const sk = slovakiaHistoricalStats();
  const ee = estoniaHistoricalStats();
  const lv = latviaHistoricalStats();
  const lt = lithuaniaHistoricalStats();
  const hr = croatiaHistoricalStats();
  const bg = bulgariaHistoricalStats();
  const batch01 = europeBatch01Stats();

  setTimeout(() => {
    if (!status.textContent.includes('Netherlands historical coverage')) status.textContent += ` Netherlands historical coverage: ${n.postWar} post-war + ${n.older} older Kingdom + ${n.special} commemorative reference records.`;
    if (!status.textContent.includes('Belgian historical coverage')) status.textContent += ` Belgian historical coverage: ${b.periods} historical periods, ${b.keySignals} key identification signals and ${b.records} reference records.`;
    if (!status.textContent.includes('French historical coverage')) status.textContent += ` French historical coverage: ${f.periods} historical franc periods, ${f.keySignals} key identification signals and ${f.records} reference records.`;
    if (!status.textContent.includes('Spanish historical coverage')) status.textContent += ` Spanish historical coverage: ${s.periods} peseta periods, ${s.keySignals} key identification signals and ${s.records} reference records.`;
    if (!status.textContent.includes('Italian historical coverage')) status.textContent += ` Italian historical coverage: ${i.periods} lira periods, ${i.keySignals} key identification signals and ${i.records} reference records.`;
    if (!status.textContent.includes('Austrian historical coverage')) status.textContent += ` Austrian historical coverage: ${a.periods} schilling periods, ${a.keySignals} key identification signals and ${a.records} reference records.`;
    if (!status.textContent.includes('Portuguese historical coverage')) status.textContent += ` Portuguese historical coverage: ${p.periods} escudo periods, ${p.keySignals} key identification signals and ${p.records} reference records.`;
    if (!status.textContent.includes('Greek historical coverage')) status.textContent += ` Greek historical coverage: ${g.periods} drachma periods, ${g.keySignals} key identification signals and ${g.records} reference records.`;
    if (!status.textContent.includes('Finnish historical coverage')) status.textContent += ` Finnish historical coverage: ${fi.periods} markka periods, ${fi.keySignals} key identification signals and ${fi.records} reference records.`;
    if (!status.textContent.includes('Luxembourg historical coverage')) status.textContent += ` Luxembourg historical coverage: ${lu.periods} franc periods, ${lu.keySignals} key identification signals and ${lu.records} reference records.`;
    if (!status.textContent.includes('Slovenian historical coverage')) status.textContent += ` Slovenian historical coverage: ${si.regularCoins} regular tolar coin types, ${si.keySignals} key identification/research signals and ${si.records} reference records.`;
    if (!status.textContent.includes('Cyprus historical coverage')) status.textContent += ` Cyprus historical coverage: ${cy.periods} pound/mil/cent periods, ${cy.keySignals} key identification/research signals and ${cy.records} reference records.`;
    if (!status.textContent.includes('Malta historical coverage')) status.textContent += ` Malta historical coverage: ${mt.periods} sterling/decimal-lira periods, ${mt.keySignals} key identification/research signals and ${mt.records} reference records.`;
    if (!status.textContent.includes('Slovak historical coverage')) status.textContent += ` Slovak historical coverage: ${sk.regularCoins} regular koruna coin types, ${sk.keySignals} key identification/research signals and ${sk.records} reference records.`;
    if (!status.textContent.includes('Estonian historical coverage')) status.textContent += ` Estonian historical coverage: ${ee.regularCoins} regular kroon coin types, ${ee.keySignals} key identification/research signals and ${ee.records} reference records.`;
    if (!status.textContent.includes('Latvian historical coverage')) status.textContent += ` Latvian historical coverage: ${lv.regularCoins} regular lats coin families, ${lv.keySignals} key identification/research signals and ${lv.records} reference records.`;
    if (!status.textContent.includes('Lithuanian historical coverage')) status.textContent += ` Lithuanian historical coverage: ${lt.regularCoins} regular litas coin families, ${lt.keySignals} key identification/research signals and ${lt.records} reference records.`;
    if (!status.textContent.includes('Croatian historical coverage')) status.textContent += ` Croatian historical coverage: ${hr.regularCoins} regular kuna/lipa coin families, ${hr.keySignals} key identification/research signals and ${hr.records} reference records.`;
    if (!status.textContent.includes('Bulgarian historical coverage')) status.textContent += ` Bulgarian historical coverage: ${bg.regularCoins} regular lev/stotinki coin families, ${bg.keySignals} key identification/research signals and ${bg.records} reference records.`;
    if (!status.textContent.includes('Europe batch 1 coverage')) status.textContent += ` Europe batch 1 coverage: ${batch01.countries} countries, ${batch01.records} reference records, ${batch01.interesting} interesting research signals.`;
  }, 0);
}
