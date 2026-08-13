import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_BATCH04_COUNTRIES, WORLD_BATCH04_REFERENCE_DB, worldBatch04ExcelRows, worldBatch04Stats } from '../beta/world-batch04-reference.mjs';

test('world batch 4 covers United States, Canada and Mexico',()=>{
 assert.deepEqual(WORLD_BATCH04_COUNTRIES.map(x=>x.country),['United States','Canada','Mexico']);
 for(const country of WORLD_BATCH04_COUNTRIES)assert.ok(WORLD_BATCH04_REFERENCE_DB.some(r=>r.country===country.country));
});

test('priority model avoids exhaustive modern year rows',()=>{
 const stats=worldBatch04Stats();
 assert.equal(stats.countries,3);
 assert.ok(stats.historical>stats.modernBaseline);
 assert.equal(stats.modernBaseline,3);
 assert.ok(stats.selectedModern>=3);
});

test('every row has provenance and explicit research priority',()=>{
 for(const r of WORLD_BATCH04_REFERENCE_DB){
  assert.ok(r.country&&r.period&&r.series&&r.denomination);
  assert.ok(r.authority);
  assert.match(r.source,/^https:\/\//);
  assert.ok(['Interesting','Possibly interesting','Normal'].includes(r.researchPriority));
  assert.ok(r.researchReason);
  assert.ok(r.metadataStatus);
 }
});

test('modern ordinary circulation is Normal while selected modern interest is escalated',()=>{
 for(const r of WORLD_BATCH04_REFERENCE_DB.filter(x=>x.scope==='Modern compact baseline'))assert.equal(r.researchPriority,'Normal');
 for(const r of WORLD_BATCH04_REFERENCE_DB.filter(x=>x.scope==='Selected modern interest'))assert.notEqual(r.researchPriority,'Normal');
});

test('Canadian official physical specifications are retained as numeric data',()=>{
 const exact=WORLD_BATCH04_REFERENCE_DB.filter(r=>r.country==='Canada'&&r.weight!=null&&r.diameter!=null);
 assert.ok(exact.length>=8);
 for(const r of exact){assert.ok(Number.isFinite(r.weight));assert.ok(Number.isFinite(r.diameter));assert.ok(r.metal);}
});

test('Excel rows expose the priority scope and provenance',()=>{
 const rows=worldBatch04ExcelRows();const keys=Object.keys(rows[0]);
 for(const key of ['Country','Currency','Period','Series','Denomination','Year From','Year To','Mint / Privy Mark','Metal','Weight (g)','Diameter (mm)','Obverse','Reverse','Edge','Type','Scope','Official Authority','Official Source','Research Priority','Research Reason','Metadata Status'])assert.ok(keys.includes(key),`missing ${key}`);
});
