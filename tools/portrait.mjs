// Portrenin duvarini beyaza ceker; boylece multiply ile kagida karisir, kutu gorunmez.
// Rengi sayfaya uydurur: doygunluk kisilir, tonlar murekkep rengine yaklasir.
// Cikti: src/assets/portrait-color.webp
//
// sharp gerekir. Portre degisince:
//   cd /tmp && mkdir pf-tools && cd pf-tools && npm i sharp
//   NODE_PATH=/tmp/pf-tools/node_modules node tools/portrait.mjs <kaynak.jpg>
// Ton denemesi icin: ... portrait.mjs <kaynak.jpg> [doygunluk 0-1] [murekkep 0-1] [cikti.webp]
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = process.argv[2];
if (!source) {
  console.error("Kullanim: node tools/portrait.mjs <kaynak.jpg>");
  process.exit(1);
}

// Kaynak 1200x1600; kisi alt ucte ikide. Kirpma kaynaga gore oranli.
const CROP = { left: 0.1, top: 0.3, width: 0.84, height: 0.7 };
const OUT_WIDTH = 760;
// Duvarin en koyu yeri de beyaza ciksin diye beyaz noktasi
const WHITE_POINT = 0.9;
// Sayfayla uyum. Doygunluk: 1 ham renk, 0 gri. Murekkep: 0 hic, 1 tam lacivert baski.
const SATURATION = Number(process.argv[3] ?? 0.68);
const INK_MIX = Number(process.argv[4] ?? 0.28);
// Yuzdeki parlamayi alir: orta tonlari biraz koyultur, beyaz duvar beyaz kalir
const GAMMA = 1.12;
const OUT = process.argv[5] ?? path.join(root, "src/assets/portrait-color.webp");
// Murekkep rengi tokenla ayni (--ink)
const INK = [0x14, 0x1c, 0x3a];

const meta = await sharp(source).metadata();
const region = {
  left: Math.round(meta.width * CROP.left),
  top: Math.round(meta.height * CROP.top),
  width: Math.round(meta.width * CROP.width),
  height: Math.round(meta.height * CROP.height),
};

const { data, info } = await sharp(source)
  .extract(region)
  .resize({ width: OUT_WIDTH })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const px = (x, y) => (y * width + x) * 3;

// Duvar rengi duz degil (koseler koyu). Kenar seritlerinden ornek alip her kanal
// icin a + b*x + c*y duzlemi oturtuyoruz; sonra goruntuyu bu duzleme boluyoruz.
const samples = [];
const band = Math.round(width * 0.05);
for (let y = 0; y < height; y += 4) {
  for (let x = 0; x < width; x += 4) {
    const top = y < height * 0.12;
    const side = (x < band || x > width - band) && y < height * 0.45;
    if (top || side) samples.push([x / width, y / height, px(x, y)]);
  }
}

function fitPlane(channel) {
  // En kucuk kareler: [1, x, y] -> deger
  let s = Array.from({ length: 3 }, () => [0, 0, 0, 0]);
  for (const [x, y, i] of samples) {
    const row = [1, x, y];
    const v = data[i + channel];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) s[r][c] += row[r] * row[c];
      s[r][3] += row[r] * v;
    }
  }
  // Gauss eleme
  for (let i = 0; i < 3; i++) {
    const pivot = s[i][i];
    for (let c = i; c < 4; c++) s[i][c] /= pivot;
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const f = s[r][i];
      for (let c = i; c < 4; c++) s[r][c] -= f * s[i][c];
    }
  }
  return [s[0][3], s[1][3], s[2][3]];
}

const planes = [fitPlane(0), fitPlane(1), fitPlane(2)];
const wall = (channel, x, y) => {
  const [a, b, c] = planes[channel];
  return Math.max(1, a + (b * x) / width + (c * y) / height);
};

const color = Buffer.alloc(width * height * 3);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = px(x, y);
    const flat = [0, 1, 2].map((ch) => Math.pow(Math.min(1, data[i + ch] / wall(ch, x, y) / WHITE_POINT), GAMMA));
    const luma = 0.2126 * flat[0] + 0.7152 * flat[1] + 0.0722 * flat[2];
    const light = Math.pow(luma, 1.25);
    const k = (y * width + x) * 3;
    for (let ch = 0; ch < 3; ch++) {
      const soft = luma + (flat[ch] - luma) * SATURATION;
      const print = (INK[ch] + (255 - INK[ch]) * light) / 255;
      color[k + ch] = Math.round((soft + (print - soft) * INK_MIX) * 255);
    }
  }
}

await sharp(color, { raw: { width, height, channels: 3 } })
  .webp({ quality: 88 })
  .toFile(OUT);

console.log(`portre: ${width}x${height}, duvar duzlemi`, planes.map((p) => p.map((n) => Math.round(n))));
