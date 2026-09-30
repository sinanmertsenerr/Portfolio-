# Computer Engineering Portfolio

Vite, React, TypeScript ve lucide-react ile hazırlanmış, TR/EN destekli kişisel
portföy sitesi. Hedef okur işe alım uzmanları: ilk bakışta kişi, rol ve CV;
hemen yanında sahadaki ürünler.

Tasarım sözleşmesi `DESIGN.md` içindedir: renkler, yazı tipi, ölçek ve kurallar.
Yeni bir renk ya da boyut eklemeden önce oraya bakın.

## Yerelde Çalıştırma

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Yayınlanabilir çıktı `dist/` klasöründe oluşur.

## Özelleştirme

- Tüm TR/EN metinler, ürünler, deneyim ve teknolojiler: `src/content.ts`
  - `**iki yıldız**` arasındaki kelimeler kalın gösterilir.
  - Süreler ay cinsinden tutulur; ekranda "1 yıl 2 ay" gibi yazılır.
- Profil bağlantıları (e-posta, CV, GitHub, LinkedIn): `src/App.tsx` içindeki `profile`
- Stiller ve tokenlar: `src/styles.css`
- Yazı tipi: `src/fonts` (Onest, OFL lisanslı, latin + latin-ext)
- Portre: `public/sinan-portrait-crop.webp` (orijinali `public/sinan-portrait.jpg`)

İngilizce sürüm doğrudan paylaşılabilir: `https://sinansener.com/?lang=en`
