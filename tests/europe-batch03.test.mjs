import test from 'node:test';
import assert from 'node:assert/strict';
import { EUROPE_BATCH03, EUROPE_BATCH03_REFERENCE_DB, europeBatch03Stats } from '../beta/europe-batch03-reference.mjs';

const expected=['Belarus','Russia','Kosovo','Andorra','Monaco','San Marino','Vatican City','Liechtenstein','Azerbaijan','Kazakhstan'];

test('batch 3 contains the intended ten countries',()=>{
 assert.equal(EUROPE_BATCH03.length,10);
 assert.deepEqual(EUROPE_BATCH03.map(x=>x.country),expected);
});

test('every batch 3 country has official-source metadata and reference rows',()=>{
 for(const c of EUROPE_BATCH03){
  assert.ok(c.authority);
  assert.match(c.source,/^https:\/\//);
  assert.ok(c.denominations.length>=6);
  const rows=EUROPE_BATCH03_REFERENCE_DB.filter(r=>r.country===c.country);
  assert.equal(rows.length,c.denominations.length+1);
  assert.ok(rows.some(r=>r.type==='Historical'));
 }
});

test('shared euro and franc currencies are never used as country-only inference',()=>{
 for(const name of ['Kosovo','Andorra','Monaco','San Marino','Vatican City','Liechtenstein']){
  assert.equal(EUROPE_BATCH03.find(c=>c.country===name).matchByCurrency,false);
 }
});

test('batch 3 stats match generated database',()=>{
 const stats=europeBatch03Stats();
 assert.equal(stats.countries,10);
 assert.equal(stats.records,EUROPE_BATCH03_REFERENCE_DB.length);
 assert.ok(stats.records>=70);
});
