import test from 'node:test';
import assert from 'node:assert/strict';
import { EUROPE_DEEP_REFERENCE_DB, europeDepthExcelRows, europeDepthStats } from '../beta/europe-depth-reference.mjs';

test('every batch reference row has normalized deep identification fields',()=>{
 assert.ok(EUROPE_DEEP_REFERENCE_DB.length>0);
 for(const row of EUROPE_DEEP_REFERENCE_DB){
  for(const key of ['country','historicalCurrency','period','series','denomination','mintMark','metal','obverse','reverse','edge','coinClass','authority','source','researchPriority','researchReason','metadataStatus']){
   assert.ok(String(row[key]??'').trim(),`${row.country}/${row.denomination}: missing ${key}`);
  }
  assert.match(row.source,/^https:\/\//);
 }
});

test('unknown physical specifications are never represented as fabricated numbers',()=>{
 for(const row of EUROPE_DEEP_REFERENCE_DB){
  assert.ok(row.weight===null||Number.isFinite(row.weight));
  assert.ok(row.diameter===null||Number.isFinite(row.diameter));
  if(row.metadataStatus!=='Exact physical metadata present'){
   assert.ok(row.weight===null||row.diameter===null||!row.obverse||!row.reverse||/verify|varies|not resolved/i.test(`${row.mintMark} ${row.metal} ${row.obverse} ${row.reverse} ${row.edge}`));
  }
 }
});

test('deep Excel schema contains all requested research columns',()=>{
 const rows=europeDepthExcelRows();
 const keys=Object.keys(rows[0]);
 for(const key of ['Country','Historical Currency','Period','Series','Denomination','Year From','Year To','Mint / Privy Mark','Metal','Weight (g)','Diameter (mm)','Obverse','Reverse','Regular / Commemorative','Official Authority','Official Source','Research Priority','Research Reason','Metadata Status'])assert.ok(keys.includes(key),`missing ${key}`);
});

test('depth stats cover all 30 batch countries',()=>{
 const stats=europeDepthStats();
 assert.equal(stats.countries,30);
 assert.equal(stats.records,EUROPE_DEEP_REFERENCE_DB.length);
 assert.equal(stats.exact+stats.needsPhysicalVerification,stats.records);
});
