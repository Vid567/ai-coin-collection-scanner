import './coin-euro.js';
import { EUROPE_BATCH02, EUROPE_BATCH02_REFERENCE_DB, europeBatch02Stats } from './europe-batch02-reference.mjs';

const norm = value => String(value || '')
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/€/g, 'euro')
  .replace(/\s+/g, ' ');

const field = (card, key) => card?.querySelector(`[data-field="${key}"]`)?.value || '';
const setField = (card, key, nextValue) => {
  const element = card?.querySelector(`[data-field="${key}"]`);
  if (!element || nextValue == null || nextValue === '') return;
  element.value = String(nextValue);
  element.dispatchEvent(new Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
};
const parseYear = value => {
  const match = String(value || '').match(/\b(18|19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
};

const batch02ByCountry = new Map(EUROPE_BATCH02.map(country => [country.country, {
  ...country,
  database: EUROPE_BATCH02_REFERENCE_DB.filter(row => row.country === country.country),
}]));

function identifyCountry(snapshot) {
  const countryText = norm(snapshot.country);
  const currencyText = norm(snapshot.currency);

  const byCountry = [...batch02ByCountry.values()].filter(country =>
    countryText && country.aliases.some(alias => countryText.includes(norm(alias)))
  );
  if (byCountry.length === 1) return byCountry[0];

  const byCurrency = [...batch02ByCountry.values()].filter(country => {
    const expected = norm(country.currency);
    return currencyText && (currencyText === expected || expected.includes(currencyText) || currencyText.includes(expected));
  });
  return byCurrency.length === 1 ? byCurrency[0] : null;
}

function chooseRow(country, snapshot) {
  const denomination = norm(snapshot.denomination);
  const year = parseYear(snapshot.year);
  const rows = country.database;

  const regular = rows
    .filter(row => row.type === 'Regular circulation')
    .map(row => ({
      row,
      score: (denomination && denomination === norm(row.denomination) ? 8 : 0) +
        (year && year >= Number(row.yearFrom || 0) && year <= Number(row.yearTo || 9999) ? 6 : 0),
    }))
    .sort((a, b) => b.score - a.score)[0];

  if (regular?.score >= 8) return { row: regular.row, score: regular.score };

  const historical = rows.find(row => row.type === 'Historical');
  if (historical && year && year < Number(country.yearFrom || 9999)) {
    return { row: historical, score: 11 };
  }
  return null;
}

function applyBatch02(card, country, hit) {
  const row = hit.row;
  setField(card, 'country', row.country);
  setField(card, 'currency', row.currency);
  setField(card, 'coinType', `${row.denomination} — ${row.series}`);
  setField(card, 'referenceMatch', `Matched to official ${row.authority} reference`);
  setField(card, 'referenceAuthority', row.authority);
  setField(card, 'referenceSource', row.source);
  setField(card, 'researchPriority', row.researchPriority);
  setField(card, 'researchReason', row.researchReason);
  setField(card, 'confidence', hit.score >= 14 ? 'High' : 'Medium');
}

document.querySelector('#records')?.addEventListener('click', event => {
  const button = event.target.closest('button[data-action="verify-reference"]');
  if (!button) return;

  const card = button.closest('.record-card');
  if (!card) return;

  const id = card.dataset.id;
  const snapshot = {
    country: field(card, 'country'),
    currency: field(card, 'currency'),
    denomination: field(card, 'denomination'),
    year: field(card, 'year'),
  };
  const country = identifyCountry(snapshot);
  if (!country) return;
  const hit = chooseRow(country, snapshot);

  setTimeout(() => {
    const freshCard = document.querySelector(`.record-card[data-id="${CSS.escape(id)}"]`);
    if (!freshCard) return;
    if (hit) applyBatch02(freshCard, country, hit);
    else {
      setField(freshCard, 'country', country.country);
      setField(freshCard, 'currency', country.currency);
      setField(freshCard, 'referenceAuthority', country.authority);
      setField(freshCard, 'referenceSource', country.source);
    }
  }, 0);
});

function batch02Rows(rows) {
  return rows.map(row => ({
    Country: row.country,
    'Historical Currency': row.currency,
    'Period / Series': row.series,
    Denomination: row.denomination,
    'Year From': row.yearFrom,
    'Year To': row.yearTo,
    'Mint Mark': row.mintMark || '',
    Metal: row.metal || '',
    'Weight (g)': row.weight || '',
    'Diameter (mm)': row.diameter || '',
    Obverse: row.obverse || '',
    Reverse: row.reverse || '',
    'Regular / Commemorative': row.type,
    'Official Authority': row.authority,
    'Official Source': row.source,
    'Research Priority': row.researchPriority,
    'Research Reason': row.researchReason,
  }));
}

function appendSheet(workbook, name, rows) {
  if (!rows?.length || workbook.SheetNames.includes(name)) return;
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = Object.keys(rows[0]).map(key => ({ wch: Math.min(60, Math.max(14, key.length + 2)) }));
  XLSX.utils.book_append_sheet(workbook, worksheet, name);
}

function installExcelHook() {
  if (!globalThis.XLSX?.writeFile || XLSX.writeFile.__batch02Hook) return false;
  const previousWriteFile = XLSX.writeFile.bind(XLSX);

  const hookedWriteFile = (workbook, ...args) => {
    for (const country of batch02ByCountry.values()) {
      const name = `${country.country} Historical`.slice(0, 31);
      appendSheet(workbook, name, batch02Rows(country.database));
    }
    return previousWriteFile(workbook, ...args);
  };

  hookedWriteFile.__batch02Hook = true;
  XLSX.writeFile = hookedWriteFile;
  return true;
}

if (!installExcelHook()) {
  window.addEventListener('load', installExcelHook, { once: true });
}

const status = document.querySelector('#reference-db-status');
if (status) {
  const stats = europeBatch02Stats();
  setTimeout(() => {
    if (!status.textContent.includes('Europe batch 2 coverage')) {
      status.textContent += ` Europe batch 2 coverage: ${stats.countries} countries, ${stats.records} reference records.`;
    }
  }, 0);
}
