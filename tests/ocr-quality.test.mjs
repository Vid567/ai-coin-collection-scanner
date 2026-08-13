import test from 'node:test';import assert from 'node:assert/strict';import {cleanOcrText,ocrSignal,chooseBestOcr,mergeOcrText} from '../beta/coin-ocr-quality.mjs';
test('OCR text cleanup preserves useful coin characters',()=>assert.equal(cleanOcrText('  REPUBLIK@@ 1974 €  '),'REPUBLIK 1974 €'));
test('very weak OCR is rejected',()=>assert.equal(ocrSignal('I',82).accepted,false));
test('low confidence OCR noise is rejected',()=>assert.equal(ocrSignal('LIBERTY 1943',22).accepted,false));
test('usable coin inscription is accepted',()=>{const r=ocrSignal('LIBERTY 1943',76);assert.equal(r.accepted,true);assert.equal(r.level,'high')});
test('best OCR variant wins by confidence',()=>assert.equal(chooseBestOcr([{text:'LIBERTY',confidence:51},{text:'LIBERTY 1943',confidence:79}]).text,'LIBERTY 1943'));
test('OCR clue merge avoids duplicate text',()=>assert.equal(mergeOcrText('LIBERTY 1943','liberty 1943'),'LIBERTY 1943'));
