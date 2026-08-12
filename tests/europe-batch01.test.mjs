import assert from 'node:assert/strict';
import { EUROPE_BATCH01, EUROPE_BATCH01_REFERENCE_DB, europeBatch01Stats } from '../beta/europe-batch01-reference.mjs';

const expectedCountries = [
  'Poland','Czechia','Hungary','Romania','Denmark',
  'Sweden','Norway','Switzerland','United Kingdom','Iceland',
];

const allowedPriority = new Set(['Normal','Possibly interesting','Interesting']);
const requiredMetadata = ['country','currency','denomination','type','authority','source','researchPriority'];

assert.equal(EUROPE_BATCH01.length, 10);
assert.deepEqual(EUROPE_BATCH01.map(x => x.country), expectedCountries);

for (const country of EUROPE_BATCH01) {
  assert.ok(country.authority && country.source, `${country.country}: official source missing`);
  assert.ok(Array.isArray(country.denominations) && country.denominations.length >= 4, `${country.country}: denominations missing`);

  const rows = EUROPE_BATCH01_REFERENCE_DB.filter(row => row.country === country.country);
  assert.ok(rows.length >= country.denominations.length + 1, `${country.country}: incomplete reference rows`);

  for (const denomination of country.denominations) {
    assert.ok(rows.some(row => row.denomination === denomination && row.type === 'Regular circulation'), `${country.country}: missing ${denomination}`);
  }

  assert.ok(rows.some(row => row.type === 'Historical'), `${country.country}: historical fallback missing`);

  for (const row of rows) {
    for (const field of requiredMetadata) {
      assert.ok(row[field] !== undefined && row[field] !== '', `${country.country}: missing ${field}`);
    }

    assert.ok(allowedPriority.has(row.researchPriority), `${country.country}: invalid research priority`);

    if (row.type === 'Regular circulation') {
      assert.ok(row.denomination, `${country.country}: regular coin without denomination`);
    }
  }

  const regular = rows.filter(row => row.type === 'Regular circulation');
  const uniqueRegular = new Set(regular.map(row => `${row.country}|${row.currency}|${row.denomination}|${row.yearFrom}|${row.yearTo}|${row.type}`));
  assert.equal(uniqueRegular.size, regular.length, `${country.country}: duplicate regular records`);
}

const interestingCountries = new Set(EUROPE_BATCH01_REFERENCE_DB.filter(row => row.researchPriority === 'Interesting').map(row => row.country));
for (const country of ['Poland','Czechia','Hungary','Denmark','Sweden','Norway','Switzerland','United Kingdom']) {
  assert.ok(interestingCountries.has(country), `${country}: missing research signal`);
}

const stats = europeBatch01Stats();
assert.equal(stats.countries, 10);
assert.equal(stats.records, EUROPE_BATCH01_REFERENCE_DB.length);
assert.ok(stats.interesting >= 10);

for (const country of EUROPE_BATCH01) {
  const sheet = `${country.country} Historical`;
  assert.ok(sheet.length <= 31, `Excel sheet too long: ${sheet}`);
}

console.log(`Europe batch 1 QA passed: ${stats.countries} countries, ${stats.records} rows`);
