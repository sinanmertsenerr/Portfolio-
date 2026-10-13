// Sayfayi uretir. Kaynak src/page.html (yalnizca Turkce) ve src/en.mjs (Ingilizce karsiliklar).
//   node build.mjs            -> index.html: Vite'in okudugu sayfa ("npm run build" bunu da calistirir)
//   node build.mjs --single   -> ../portfolyo-tasarim.html: tek dosya onizleme, her sey icine gomulu
//
// Dil: her metnin yanina Ingilizcesi eklenir (<span lang="tr"> / <span lang="en">).
// Karsiligi olmayan metin derleme sonunda listelenir.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { en, same } from "./src/en.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = (file) => path.join(root, "src", file);
const single = process.argv.includes("--single");
const OUT = single ? path.join(root, "..", "portfolyo-tasarim.html") : path.join(root, "index.html");

/* ---------- Tek dosya icin gomme ---------- */

const MIME = {
  ".woff2": "font/woff2",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const cache = new Map();
async function dataUri(file) {
  if (!cache.has(file)) {
    const type = MIME[path.extname(file)];
    if (!type) throw new Error(`Bilinmeyen dosya turu: ${file}`);
    cache.set(file, `data:${type};base64,${(await readFile(src(file))).toString("base64")}`);
  }
  return cache.get(file);
}

// "@asset/yol" -> data URI
async function embedAssets(text) {
  const refs = [...new Set(text.match(/@asset\/[\w./-]+/g) ?? [])];
  const uris = new Map(await Promise.all(refs.map(async (ref) => [ref, await dataUri(ref.slice(7))])));
  return text.replace(/@asset\/[\w./-]+/g, (ref) => uris.get(ref));
}

// "<!--@icon ad-->" -> src/icons/ad.svg (Simple Icons, CC0), tek renk
async function embedIcons(html) {
  const names = [...new Set([...html.matchAll(/<!--@icon ([\w-]+)-->/g)].map((m) => m[1]))];
  const icons = new Map(
    await Promise.all(
      names.map(async (name) => {
        const raw = await readFile(src(`icons/${name}.svg`), "utf8");
        const body = raw.replace(/<title>.*?<\/title>/s, "").match(/<svg[^>]*>(.*)<\/svg>/s)[1];
        return [name, `<svg class="logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`];
      }),
    ),
  );
  return html.replace(/<!--@icon ([\w-]+)-->/g, (_, name) => icons.get(name));
}

/* ---------- Dil ---------- */

const SKIP_TAGS = new Set(["script", "style", "title"]);
// Metni cevrilen ozellikler; content yalnizca sozlukte varsa cevrilir
const TEXT_ATTRS = ["alt", "aria-label", "data-name", "content"];
const identical = new Set(same);
const untranslated = new Set();

const keyOf = (text) => text.trim().replace(/\s+/g, " ");
const hasLetters = (text) => /\p{L}/u.test(text);
const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function localizeTag(tag) {
  let extra = "";
  for (const attr of TEXT_ATTRS) {
    const match = tag.match(new RegExp(`\\s${attr}="([^"]*)"`));
    if (!match) continue;
    const key = keyOf(match[1]);
    // "[ozellik] metin" seklinde isaretlenen ozellik cevrilmez (metin baska yerde cevrilse bile)
    if (identical.has(`[${attr}] ${key}`)) continue;
    const value = en[key];
    if (value === undefined) {
      if (attr !== "content" && hasLetters(key) && !identical.has(key)) untranslated.add(`[${attr}] ${key}`);
      continue;
    }
    extra += ` data-en-${attr}="${escapeAttr(value)}"`;
  }
  if (!extra) return tag;
  return tag.replace(/\s*(\/?)>$/, (_, slash) => ` data-i18n${extra}${slash ? " />" : ">"}`);
}

// Sablonu etiket ve metin parcalarina ayirir; sozlukte karsiligi olan her metni iki dilde yazar
function localize(html) {
  let skip = null;
  let svgDepth = 0;
  return html
    .split(/(<!--[\s\S]*?-->|<[^>]+>)/)
    .map((part) => {
      if (part.startsWith("<!--")) return part;
      if (part.startsWith("<")) {
        const closing = part.startsWith("</");
        const name = part.match(/^<\/?([\w-]+)/)?.[1].toLowerCase();
        if (skip) {
          if (closing && name === skip) skip = null;
          return part;
        }
        if (!closing && SKIP_TAGS.has(name)) skip = name;
        if (name === "svg") svgDepth += closing ? -1 : 1;
        return closing ? part : localizeTag(part);
      }
      const key = keyOf(part);
      if (skip || !key) return part;
      const value = en[key];
      if (value === undefined) {
        if (hasLetters(key) && !identical.has(key)) untranslated.add(key);
        return part;
      }
      const wrap = svgDepth > 0 ? "tspan" : "span";
      const [lead] = part.match(/^\s*/);
      const [trail] = part.match(/\s*$/);
      return `${lead}<${wrap} lang="tr">${part.trim()}</${wrap}><${wrap} lang="en">${value}</${wrap}>${trail}`;
    })
    .join("");
}

/* ---------- Derleme ---------- */

// Once dil (stil ve kod eklenmeden), sonra logolar
let html = await embedIcons(localize(await readFile(src("page.html"), "utf8")));

if (single) {
  const [css, js] = await Promise.all([readFile(src("styles.css"), "utf8"), readFile(src("app.js"), "utf8")]);
  const inlineCss = css.replace(/url\("\.\/fonts\//g, 'url("@asset/fonts/');
  html = html
    .replace("<!--@css-->", () => `<style>\n${inlineCss}</style>`)
    .replace("<!--@js-->", () => `<script>\n${js}</script>`);
  html = await embedAssets(html);
} else {
  // Stil, kod, yazi tipi ve gorselleri Vite paketler
  html = html
    .replace("<!--@css-->", '<link rel="stylesheet" href="/src/styles.css" />')
    .replace("<!--@js-->", '<script type="module" src="/src/app.js"></script>')
    .replace(/@asset\//g, "/src/")
    .replace("<!doctype html>", "<!doctype html>\n<!-- Bu dosyayi build.mjs uretir. Duzenlenecek dosya: src/page.html -->");
}

await writeFile(OUT, html);
console.log(`${path.relative(process.cwd(), OUT)}: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
if (untranslated.size) {
  console.log(`\nIngilizce karsiligi olmayan ${untranslated.size} metin (src/en.mjs):`);
  for (const text of untranslated) console.log(`  ${JSON.stringify(text)}`);
}
