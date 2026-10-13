// Canli sayfalarin ekran goruntulerinden iki surum uretir: renkli ve
// "tasa baski" (murekkep rengi -> kagit rengi). Cikti: src/assets/screens/.
//   NODE_PATH=/tmp/pf-tools/node_modules node tools/screens.mjs <klasor> ad1 ad2 ...
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const [dir, ...names] = process.argv.slice(2);
const out = path.join(root, "src/assets/screens");
await mkdir(out, { recursive: true });

const WIDTH = 900;
// Tokenlarla ayni: --ink ve --sheet
const INK = [0x14, 0x1c, 0x3a];
const SHEET = [0xf6, 0xf6, 0xf2];

for (const name of names) {
  const input = path.join(dir, `${name}.png`);
  const base = sharp(input).resize({ width: WIDTH });
  await base.clone().webp({ quality: 74 }).toFile(path.join(out, `${name}.webp`));

  const { data, info } = await base.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const duo = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < data.length; i++) {
    // Acik gri arayuzler soluk kalmasin diye orta tonlar biraz koyulur
    const t = Math.pow(data[i] / 255, 1.6);
    for (let c = 0; c < 3; c++) duo[i * 3 + c] = Math.round(INK[c] + (SHEET[c] - INK[c]) * t);
  }
  await sharp(duo, { raw: { width: info.width, height: info.height, channels: 3 } })
    .webp({ quality: 70 })
    .toFile(path.join(out, `${name}-duo.webp`));
  console.log(name, `${info.width}x${info.height}`);
}
