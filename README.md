# Sinan Mert Şener Portfolyo

Tek sayfalık, TR/EN destekli kişisel portfolyo. Düz HTML, CSS ve JavaScript;
paketleme Vite ile. Hedef okur işe alım uzmanları ve mühendislik ekipleri:
özet, ana proje ve yan projeler, deneyim, GitHub, stack, iletişim.

Tasarım sözleşmesi `DESIGN.md` içindedir: renkler, yazı tipi, ölçek ve kurallar.
Yeni bir renk ya da boyut eklemeden önce oraya bakın.

## Yerelde Çalıştırma

```bash
npm install
npm run dev
```

`src/page.html` ya da `src/en.mjs` değişince `node build.mjs` yeniden çalıştırılır;
stil ve kod değişiklikleri kendiliğinden yenilenir.

## Production Build

```bash
npm run build
```

Yayınlanabilir çıktı `dist/` klasöründe oluşur. `main` dalına gönderilen her
commit Vercel'de yayına çıkar.

## Nasıl Çalışır

- `src/page.html`: sayfanın kendisi, yalnızca Türkçe yazılır.
- `src/en.mjs`: İngilizce karşılıklar. Anahtar, Türkçe metnin aynısıdır.
- `build.mjs`: ikisini birleştirip kökteki `index.html` dosyasını üretir
  (her metin iki dilde; logolar içine gömülü). Karşılığı olmayan metni listeler.
  `index.html` elle düzenlenmez.
- `src/styles.css`, `src/app.js`: stil ve hareket. Hareketin tamamı `app.js` içindedir.

İngilizce sürüm doğrudan paylaşılabilir: `https://sinansener.com/?lang=en`

## Özelleştirme

- Metin, proje, deneyim, repo ve teknoloji: `src/page.html`, çevirisi `src/en.mjs`
- Tokenlar ve stiller: `src/styles.css`
- Yazı tipleri: `src/fonts` (Public Sans ve Atkinson Hyperlegible Next, OFL lisanslı)
- Teknoloji logoları: `src/icons` (Simple Icons, CC0). Sayfada `<!--@icon ad-->` ile kullanılır.
- Portre: `src/assets/portrait-color.webp`. Kaynağı `public/sinan-portrait.jpg`;
  yeniden üretmek için `tools/portrait.mjs` (içindeki nota bakın, `sharp` ister).
- Ekran görüntüleri: `src/assets/screens`, `tools/screens.mjs` ile üretilir.
- Ana ekrana ekleme (web app): `public/manifest.webmanifest`, `public/icon-*.png`,
  `public/apple-touch-icon.png`. Renk değişirse `src/page.html` içindeki
  `theme-color` ile birlikte güncelleyin.
- CV: `public/sinan-mert-sener-cv.pdf`

## Tek Dosya Önizleme

```bash
npm run single
```

Her şeyi içine gömülü tek bir HTML olarak bir üst klasöre
(`../portfolyo-tasarim.html`) yazar; çift tıklayıp açmak için.
