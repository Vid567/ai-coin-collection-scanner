import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const flows=[
 ['en/index.html','docs/en/photo-guide.html','beta/index.html'],
 ['nl/index.html','docs/nl/fotohandleiding.html','beta/nl/index.html'],
 ['es/index.html','docs/es/guia-fotos.html','beta/es/index.html'],
 ['es-us/index.html','docs/es/guia-fotos.html','beta/es-us/index.html'],
 ['fr/index.html','docs/fr/guide-photos.html','beta/fr/index.html'],
 ['de/index.html','docs/de/fotoanleitung.html','beta/de/index.html'],
 ['pt-br/index.html','docs/pt-br/guia-fotos.html','beta/pt-br/index.html'],
 ['zh-cn/index.html','docs/zh-cn/photo-guide.html','beta/zh-cn/index.html']
];

for(const flow of flows){
 test(`public flow exists: ${flow[0]}`,()=>{
  for(const file of flow) assert.ok(fs.existsSync(file),`Missing ${file}`);
 });
}

test('empty Excel template exists',()=>{
 assert.ok(fs.existsSync('docs/AI-Coin-Inventory-Empty-Beta.xlsx'));
});
