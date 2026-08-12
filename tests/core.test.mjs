import assert from 'node:assert/strict';import {photoNumber,nextCoinId,createRecord,exportRows,toCsv,partitionPhotoFiles} from '../beta/coin-core.mjs';
assert.equal(photoNumber(0),'Photo 001');assert.equal(photoNumber(11),'Photo 012');
assert.equal(nextCoinId([{id:'C001'},{id:'C003'}]),'C004');
const photos=[{id:'a',number:'Photo 001',name:'front.jpg'},{id:'b',number:'Photo 002',name:'back.jpg'}];
const rec=createRecord([], 'a','b','');assert.equal(rec.id,'C001');
const rows=exportRows([rec],photos);assert.equal(rows[0]['Obverse Filename'],'front.jpg');assert.equal(rows[0]['Reverse Filename'],'back.jpg');
assert.ok(toCsv([rec],photos).includes('Coin ID'));const files=[{type:'image/jpeg'},{type:'text/plain'}];const part=partitionPhotoFiles(files,0,30);assert.equal(part.accepted.length,1);assert.equal(part.unsupported.length,1);
console.log('Coin Scanner core tests passed');
