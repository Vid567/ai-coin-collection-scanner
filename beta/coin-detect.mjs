function integral(values,width,height){const stride=width+1,out=new Float64Array((width+1)*(height+1));for(let y=0;y<height;y++){let row=0;for(let x=0;x<width;x++){row+=values[y*width+x];out[(y+1)*stride+(x+1)]=out[y*stride+(x+1)]+row;}}return out;}
function boxMean(ii,width,height,x,y,r){const stride=width+1,x0=Math.max(0,x-r),y0=Math.max(0,y-r),x1=Math.min(width-1,x+r),y1=Math.min(height-1,y+r);const sum=ii[(y1+1)*stride+(x1+1)]-ii[y0*stride+(x1+1)]-ii[(y1+1)*stride+x0]+ii[y0*stride+x0];return sum/((x1-x0+1)*(y1-y0+1));}
function binaryWindow(mask,width,height,r,mode){const ii=integral(mask,width,height),out=new Uint8Array(mask.length),stride=width+1;for(let y=0;y<height;y++)for(let x=0;x<width;x++){const x0=Math.max(0,x-r),y0=Math.max(0,y-r),x1=Math.min(width-1,x+r),y1=Math.min(height-1,y+r),sum=ii[(y1+1)*stride+(x1+1)]-ii[y0*stride+(x1+1)]-ii[(y1+1)*stride+x0]+ii[y0*stride+x0],total=(x1-x0+1)*(y1-y0+1);out[y*width+x]=mode==='dilate'?(sum>0?1:0):(sum>=total?1:0);}return out;}
function open(mask,width,height,r){return binaryWindow(binaryWindow(mask,width,height,r,'erode'),width,height,r,'dilate');}
function close(mask,width,height,r){return binaryWindow(binaryWindow(mask,width,height,r,'dilate'),width,height,r,'erode');}
export function candidateScore(item){const aspect=Math.min(item.width/item.height,item.height/item.width),fill=item.fill??0;const aspectScore=Math.max(0,Math.min(1,(aspect-.48)/.52)),fillScore=Math.max(0,Math.min(1,(fill-.32)/.45));return +(0.62*aspectScore+0.38*fillScore).toFixed(3);}
export function radialCandidateScore(perimeterMean,edgeThreshold,strongFraction,contrastRatio=1){if(!edgeThreshold)return 0;const edge=Math.max(0,Math.min(1,perimeterMean/(edgeThreshold*1.7))),strong=Math.max(0,Math.min(1,strongFraction/.72)),contrast=Math.max(0,Math.min(1,(contrastRatio-.95)/.55));return +(0.48*edge+0.38*strong+0.14*contrast).toFixed(3);}
export function backgroundDistance(r,g,b,bg){return Math.hypot(r-bg[0],g-bg[1],b-bg[2]);}

// Local (per-pixel) background estimate: a blurred downsample/upsample of the source canvas,
// using a blur footprint clearly larger than a single coin so the coin itself barely perturbs
// the background estimate at its own location. This is what makes the mask reliable across
// mixed backgrounds (mat + wood table in the same photo) and lighting gradients across a frame,
// unlike a single global (corner-sampled) background reference.
function localBackgroundField(sourceCanvas, width, height) {
  const small = document.createElement('canvas');
  const sw = Math.max(10, Math.round(width / 9)), sh = Math.max(10, Math.round(height / 9));
  small.width = sw; small.height = sh;
  const sctx = small.getContext('2d', { willReadFrequently: true });
  sctx.imageSmoothingEnabled = true; sctx.imageSmoothingQuality = 'high';
  sctx.drawImage(sourceCanvas, 0, 0, sw, sh);
  const big = document.createElement('canvas');
  big.width = width; big.height = height;
  const bctx = big.getContext('2d', { willReadFrequently: true });
  bctx.imageSmoothingEnabled = true; bctx.imageSmoothingQuality = 'high';
  bctx.drawImage(small, 0, 0, width, height);
  return bctx.getImageData(0, 0, width, height).data;
}

// Colour contrast between a candidate disk's interior and the surface immediately surrounding
// it (a local annulus, not the whole-image background). This is the key discriminator: a
// textured surface (keyboard weave, mousepad grid) has strong local *edges* but is the SAME
// colour as its own surroundings, while a real coin is a visibly different colour/tone from
// whatever it is resting on, wherever in the frame it happens to be. Works directly on the
// original pixel colours, so it validates a candidate regardless of how clean the mask is.
function diskAnnulusContrast(data, width, height, cx, cy, r, step = 3) {
  const innerR = r * 0.55;
  let inR = 0, inG = 0, inB = 0, inN = 0;
  for (let y = Math.max(0, Math.round(cy - innerR)); y <= Math.min(height - 1, Math.round(cy + innerR)); y += step) {
    for (let x = Math.max(0, Math.round(cx - innerR)); x <= Math.min(width - 1, Math.round(cx + innerR)); x += step) {
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy > innerR * innerR) continue;
      const i = (y * width + x) * 4;
      inR += data[i]; inG += data[i + 1]; inB += data[i + 2]; inN++;
    }
  }
  const rIn = r * 1.08, rOut = r * 1.4;
  let outR = 0, outG = 0, outB = 0, outN = 0;
  for (let y = Math.max(0, Math.round(cy - rOut)); y <= Math.min(height - 1, Math.round(cy + rOut)); y += step) {
    for (let x = Math.max(0, Math.round(cx - rOut)); x <= Math.min(width - 1, Math.round(cx + rOut)); x += step) {
      const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
      if (d2 < rIn * rIn || d2 > rOut * rOut) continue;
      const i = (y * width + x) * 4;
      outR += data[i]; outG += data[i + 1]; outB += data[i + 2]; outN++;
    }
  }
  if (!inN || !outN) return 0;
  return Math.hypot(inR / inN - outR / outN, inG / inN - outG / outN, inB / inN - outB / outN);
}

// Raw connected components of the (bridged) rim/foreground mask. A real coin almost always
// produces a roughly-square bounding box (its rim traces a circle) even when the mask itself is
// a thin ring rather than a solid disk, so this deliberately does NOT require high fill -
// fill is only used to reject degenerate shapes. Real acceptance is decided by candidateScore
// (aspect-driven) plus the colour-contrast gate below.
function rawComponents(mask, width, height) {
  const seen = new Uint8Array(mask.length), found = [];
  const dirs = [-1, 1, -width, width, -width - 1, -width + 1, width - 1, width + 1];
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start]) continue;
    const stack = [start]; seen[start] = 1;
    let area = 0, minX = width, maxX = 0, minY = height, maxY = 0;
    while (stack.length) {
      const p = stack.pop(), y = Math.floor(p / width), x = p - y * width;
      area++; minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      for (const d of dirs) {
        const q = p + d;
        if (q < 0 || q >= mask.length || seen[q] || !mask[q]) continue;
        const qy = Math.floor(q / width), qx = q - qy * width;
        if (Math.abs(qx - x) > 1 || Math.abs(qy - y) > 1) continue;
        seen[q] = 1; stack.push(q);
      }
    }
    const w = maxX - minX + 1, h = maxY - minY + 1;
    if (area < 8) continue;
    found.push({ x: minX, y: minY, width: w, height: h, area });
  }
  return found;
}

function validate(data, width, height, box, minSharePx) {
  const { x, y, width: w, height: h } = box;
  const cx = x + w / 2, cy = y + h / 2, r = (w + h) / 4;
  if (w < minSharePx || h < minSharePx) return null;
  const fill = (box.area ?? 0) / Math.max(1, w * h);
  const item = { x, y, width: w, height: h, cx, cy, fill: Math.min(1, fill) };
  item.score = candidateScore(item);
  const contrast = diskAnnulusContrast(data, width, height, cx, cy, r);
  // Two tiers: a confidently round shape only needs ordinary colour contrast, but a rougher /
  // partial shape (e.g. part of the rim washed out by a reflection) needs much stronger colour
  // evidence to compensate before it is trusted as a coin rather than background clutter.
  if (item.score < .5 && !(item.score >= .3 && contrast >= 34)) return null;
  if (contrast < 22) return null;
  item.contrast = contrast;
  item.source = 'blob';
  return item;
}

// Two coins that are touching (or nearly so) in the photo can survive gap-bridging as a single
// connected component whose bounding box is roughly twice as wide (or tall) as it is the other
// way. Rather than silently dropping that pair, split it at the midpoint of its long axis into
// two square-ish halves and validate each half independently.
function splitTouchingPair(data, width, height, box, minSharePx) {
  const long = Math.max(box.width, box.height), short = Math.min(box.width, box.height);
  const ratio = long / Math.max(1, short);
  if (ratio < 1.5 || ratio > 2.7) return [];
  const horizontal = box.width >= box.height;
  const out = [];
  if (horizontal) {
    const half = box.width / 2;
    out.push(validate(data, width, height, { x: box.x, y: box.y, width: half, height: box.height, area: (box.area ?? 0) / 2 }, minSharePx));
    out.push(validate(data, width, height, { x: box.x + half, y: box.y, width: half, height: box.height, area: (box.area ?? 0) / 2 }, minSharePx));
  } else {
    const half = box.height / 2;
    out.push(validate(data, width, height, { x: box.x, y: box.y, width: box.width, height: half, area: (box.area ?? 0) / 2 }, minSharePx));
    out.push(validate(data, width, height, { x: box.x, y: box.y + half, width: box.width, height: half, area: (box.area ?? 0) / 2 }, minSharePx));
  }
  return out.filter(Boolean).map(item => ({ ...item, source: 'blob-split' }));
}

function components(mask, width, height, data) {
  const raw = rawComponents(mask, width, height), areaAll = width * height, found = [];
  const minSharePx = Math.max(10, Math.round(Math.min(width, height) * .028));
  for (const box of raw) {
    const share = box.area / areaAll;
    if (share < 0.0015 || share > 0.55) continue;
    const long = Math.max(box.width, box.height), short = Math.max(1, Math.min(box.width, box.height));
    const ratio = long / short;
    if (ratio <= 1.45) {
      const item = validate(data, width, height, box, minSharePx);
      if (item) found.push(item);
    } else if (ratio <= 2.7) {
      found.push(...splitTouchingPair(data, width, height, box, minSharePx));
    }
    // wider/flatter fragments (ratio > 2.7) are treated as edges/text/shadow, not coins.
  }
  return found;
}

export function clusterCircleCandidates(items, { centerFactor = .42, radiusRatio = .55 } = {}) { const kept = []; for (const item of [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) { const r = Math.max(1, (item.width + item.height) / 4); if (kept.some(k => { const kr = Math.max(1, (k.width + k.height) / 4), center = Math.hypot(item.cx - k.cx, item.cy - k.cy), ratio = Math.min(r, kr) / Math.max(r, kr); return center <= Math.min(r, kr) * centerFactor && ratio >= radiusRatio; })) continue; kept.push(item); } return kept; }
export function boxIoU(a, b) { const x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y), x2 = Math.min(a.x + a.width, b.x + b.width), y2 = Math.min(a.y + a.height, b.y + b.height), inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1); if (!inter) return 0; return inter / (a.width * a.height + b.width * b.height - inter); }
export function nonMaxSuppression(items, threshold = .42) { const kept = []; for (const item of [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) { if (kept.every(k => boxIoU(item, k) < threshold)) kept.push(item); } return kept; }

// Containment-aware dedup: plain IoU (used above) misses a small candidate that sits almost
// entirely INSIDE a larger one (low IoU because the areas differ a lot) even though it is
// obviously the same physical coin. Containment (intersection over the smaller box's own area)
// catches that case; used as a second pass after ordinary NMS.
function containment(a, b) { const x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y), x2 = Math.min(a.x + a.width, b.x + b.width), y2 = Math.min(a.y + a.height, b.y + b.height), inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1); return inter / Math.max(1, a.width * a.height); }
function mergeDetections(items) {
  const kept = [];
  for (const item of [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))) {
    const duplicate = kept.some(k => boxIoU(item, k) >= .32 || containment(item, k) >= .55 || containment(k, item) >= .85);
    if (!duplicate) kept.push(item);
  }
  return kept;
}

// Coins photographed together are usually similar in size; something 3x+ smaller than the rest
// of the accepted candidates in the same photo (a keyboard key's icon, a stray logo) is much
// more likely to be background clutter than a genuine coin. Only applied once there are enough
// candidates for "median size" to be meaningful.
function filterSizeOutliers(items) {
  if (items.length < 3) return items;
  // Anchor on the largest candidate rather than the median: coins photographed together are
  // usually similar in size, and a coin is essentially always bigger than a keyboard key's icon
  // or other small clutter, so the biggest candidate found is a safe stand-in for "coin size" -
  // unlike the median, it doesn't get dragged down when clutter candidates outnumber real coins.
  const sizes = items.map(i => (i.width + i.height) / 2);
  const largest = Math.max(...sizes);
  return items.filter((i, idx) => sizes[idx] >= largest * 0.55);
}

function sortReadingOrder(items) { if (items.length < 2) return items; const avgH = items.reduce((s, i) => s + i.height, 0) / items.length, tolerance = avgH * .55, rows = []; for (const item of [...items].sort((a, b) => a.cy - b.cy || a.cx - b.cx)) { let row = rows.find(r => Math.abs(r.cy - item.cy) <= tolerance); if (!row) { row = { cy: item.cy, items: [] }; rows.push(row) } row.items.push(item); row.cy = row.items.reduce((s, i) => s + i.cy, 0) / row.items.length; } rows.sort((a, b) => a.cy - b.cy); return rows.flatMap(r => r.items.sort((a, b) => a.cx - b.cx)); }
export function pairByNormalizedPosition(frontBoxes, backBoxes, frontSize, backSize, { maxDistance = .18 } = {}) { if (!frontBoxes?.length || frontBoxes.length !== backBoxes?.length) return { pairs: [], confidence: 'none', maxDistance: null }; const norm = (b, s) => ({ x: (b.x + b.width / 2) / s.width, y: (b.y + b.height / 2) / s.height }); const available = new Set(backBoxes.map((_, i) => i)), pairs = []; let worst = 0, total = 0; for (let i = 0; i < frontBoxes.length; i++) { const f = norm(frontBoxes[i], frontSize); let best = -1, bestD = Infinity; for (const j of available) { const b = norm(backBoxes[j], backSize), d = Math.hypot(f.x - b.x, f.y - b.y); if (d < bestD) { bestD = d; best = j; } } if (best < 0 || bestD > maxDistance) return { pairs: [], confidence: 'low', maxDistance: bestD }; available.delete(best); pairs.push([i, best]); worst = Math.max(worst, bestD); total += bestD; } const avg = total / pairs.length, confidence = worst <= .07 && avg <= .045 ? 'high' : worst <= .12 && avg <= .08 ? 'medium' : 'low'; return { pairs, confidence, maxDistance: worst, averageDistance: avg }; }
async function bitmapFromBlob(blob) { if (globalThis.createImageBitmap) return createImageBitmap(blob); const url = URL.createObjectURL(blob); try { return await new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = url }) } finally { URL.revokeObjectURL(url) } }

export async function detectCoins(blob, { maxDimension = 700 } = {}) {
  const bitmap = await bitmapFromBlob(blob), sourceWidth = bitmap.width, sourceHeight = bitmap.height;
  const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight)), width = Math.max(1, Math.round(sourceWidth * scale)), height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;

  // Foreground mask driven by colour distance from the local (blurred) background estimate.
  const bgField = localBackgroundField(canvas, width, height);
  const mask = new Uint8Array(width * height);
  let distSum = 0; const dist = new Float32Array(width * height);
  for (let p = 0; p < width * height; p++) {
    const i = p * 4;
    const d = Math.hypot(data[i] - bgField[i], data[i + 1] - bgField[i + 1], data[i + 2] - bgField[i + 2]);
    dist[p] = d; distSum += d;
  }
  const meanDist = distSum / (width * height), maskThreshold = Math.max(24, Math.min(70, meanDist * 1.7));
  for (let p = 0; p < width * height; p++) mask[p] = dist[p] > maskThreshold ? 1 : 0;

  // Denoise fine background texture (radius 1), then bridge small gaps in a coin's own rim
  // (radius chosen to close typical rim breaks without also fusing two separate nearby coins).
  const denoised = open(mask, width, height, 1);
  const bridged = close(denoised, width, height, 6);

  const detected = sortReadingOrder(filterSizeOutliers(mergeDetections(components(bridged, width, height, data))));
  const boxes = detected.map((d, index) => {
    const pad = Math.round(Math.max(d.width, d.height) * .08);
    const x = Math.max(0, d.x - pad), y = Math.max(0, d.y - pad);
    const x2 = Math.min(width, d.x + d.width + pad), y2 = Math.min(height, d.y + d.height + pad);
    const score = d.score;
    return { index: index + 1, x: x / scale, y: y / scale, width: (x2 - x) / scale, height: (y2 - y) / scale, score, confidence: score >= .75 ? 'high' : score >= .56 ? 'medium' : 'low', detector: d.source || 'blob' };
  });
  bitmap.close?.();
  return { count: boxes.length, boxes, analysisWidth: width, analysisHeight: height, sourceWidth, sourceHeight };
}

export async function cropCoin(blob, box, type = 'image/jpeg') { const bitmap = await bitmapFromBlob(blob), canvas = document.createElement('canvas'), x = Math.max(0, Math.floor(box.x)), y = Math.max(0, Math.floor(box.y)), w = Math.min(bitmap.width - x, Math.ceil(box.width)), h = Math.min(bitmap.height - y, Math.ceil(box.height)); canvas.width = w; canvas.height = h; canvas.getContext('2d').drawImage(bitmap, x, y, w, h, 0, 0, w, h); bitmap.close?.(); return await new Promise(resolve => canvas.toBlob(resolve, type === 'image/png' ? 'image/png' : 'image/jpeg', .92)); }
