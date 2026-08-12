import assert from 'node:assert/strict';
import { EUROPE_BATCH02, EUROPE_BATCH02_REFERENCE_DB, europeBatch02Stats } from '../beta/europe-batch02-reference.mjs';

const expectedCountries = [
  'Bosnia and Herzegovina','Serbia','Montenegro','North Macedonia','Albania',
  'Moldova','Ukraine','Turkey','Georgia','Armenia',
];

const allowedPriority = new Set(['Normal','Possibly interesting','Interesting']);

assert.equal(EUROPE_BATCH02.length, 10);
assert.deepEqual(EUROPE_BATCH02.map(x => x.country), expectedCountries);

for (const country of EUROPE_BATCH02) {
  assert.ok(country.authority && country.source, `${country.country}: source missing`);
  assert.ok(country.denominations.length >= 4, `${country.country}: denominations missing`);

  const rows = EUROPE_BATCH02_REFERENCE_DB.filter(row => row.country === country.country);
  assert.ok(rows.length >= country.denominations.length + 1, `${country.country}: rows missing`);

  for (const row of rows) {
    assert.ok(row.country);
    assert.ok(row.currency);
    assert.ok(row.denomination);
    assert.ok(row.type);
    assert.ok(row.authority);
    assert.ok(row.source);
    assert.ok(allowedPriority.has(row.researchPriority));
  }

  assert.ok(rows.some(row => row.type === 'Historical'), `${country.country}: historical fallback missing`);
}

const stats = europeBatch02Stats();
assert.equal(stats.countries, 10);
assert.equal(stats.records, EUROPE_BATCH02_REFERENCE_DB.length);

console.log(`Europe batch 2 QA passed: ${stats.countries} countries, ${stats.records} rows`);
