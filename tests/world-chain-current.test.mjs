import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const index=fs.readFileSync(new URL('../beta/index.html',import.meta.url),'utf8');
const m=index.match(/src="(coin-world\d+[^\"]*\.js)"/);assert.ok(m,'English scanner must load a world-chain entry module');
const entry=m[1];
test('English scanner uses latest world-chain entry',()=>assert.equal(entry,'coin-world18-historical-key-dates.js'));
test('world chain reaches every historical/geographic layer',()=>{let file=entry;const seen=new Set();for(let i=0;i<30;i++){seen.add(file);const text=fs.readFileSync(new URL(`../beta/${file}`,import.meta.url),'utf8');const parent=text.match(/import ['"]\.\/(coin-world\d+[^'"]*\.js)['"]/);if(!parent)break;file=parent[1]}for(const n of [6,7,8,9,10,11,12,13,14,15,16,17,18])assert.ok([...seen].some(x=>x.startsWith(`coin-world${String(n).padStart(2,'0')}`)),`world${n} missing from active chain`)});