import assert from 'node:assert/strict';
import { EUROPE_BATCH01, EUROPE_BATCH01_REFERENCE_DB, europeBatch01Stats } from '../beta/europe-batch01-reference.mjs';

const expectedCountries = [
  'Poland','Czechia','Hungary','Romania','Denmark',
  'Sweden','Norway','Switzerland','United Kingdom','Iceland',
];

assert.equal(EUROPE_BATCH01.length, 10);
assert.deepEqual(EUROPE_BATCH01.map(x => x.country), expectedCountries);

for (const country of EUROPE_BATCH01) {
  assert.ok(Array.isArray(country.aliases) && country.aliases.length >= 3, `${country.country}: aliases missing`);
  assert.ok(country.authority && country.source, `${country.country}: official authority/source missing`);
  assert.ok(Array.isArray(country.denominations) && country.denominations.length >= 4, `${country.country}: denomination list too small`);

  const rows = EUROPE_BATCH01_REFERENCE_DB.filter(row => row.country === country.country);
  assert.ok(rows.length >= country.denominations.length + 1, `${country.country}: expected regular + historical rows`);

  for (const denomination of country.denominations) {
    assert.ok(
      rows.some(row => row.denomination === denomination && row.type === 'Regular circulation'),
      `${country.country}: missing regular denomination row ${denomination}`,
    );
  }

  assert.ok(
    rows.some(row => row.type === 'Historical'),
    `${country.country}: historical fallback row missing`,
  );
}

const specialCountries = new Set(
  EUROPE_BATCH01_REFERENCE_DB
    .filter(row => row.researchPriority === 'Interesting')
    .map(row => row.country),
);

for (const country of ['Poland','Czechia','Hungary','Denmark','Sweden','Norway','Switzerland','United Kingdom']) {
  assert.ok(specialCountries.has(country), `${country}: expected Interesting research signal`);
}

const stats = europeBatch01Stats();
assert.equal(stats.countries, 10);
assert.equal(stats.records, EUROPE_BATCH01_REFERENCE_DB.length);
assert.ok(stats.interesting >= 10);

const excelSheetNames = EUROPE_BATCH01.map(country => `${country.country} Historical`);
assert.equal(new Set(excelSheetNames).size, 10);
for (const name of excelSheetNames) {
  assert.ok(name.length <= 31, `Excel sheet name too long: ${name}`);
}

console.log(`Europe batch 1 tests passed: ${stats.countries} countries, ${stats.records} reference rows, ${stats.interesting} interesting signals`);
