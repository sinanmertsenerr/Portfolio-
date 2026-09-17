# Computer Engineering Portfolio

Vite, React, TypeScript, Framer Motion ve lucide-react ile hazırlanmış,
TR/EN destekli kişisel portföy sitesi.

Ana sayfa production projelerini etki ve sorumluluk odaklı gösterir. Seçilmiş
GitHub projeleri doğrudan kendi repo sayfalarına bağlanan kontrollü içerikle
sunulur; ana portfolio deneyimi üçüncü taraf API durumuna bağlı değildir.

Sayfa; profil, production projeleri, deneyim, kategorize tech stack, seçilmiş
GitHub işleri ve iletişim bölümlerine ayrılır. Scroll sırasında aktif bölüm
navigation içinde vurgulanır.

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

Profil, tech stack grupları ve GitHub showcase ayarları `src/App.tsx` içindedir.
TR/EN metinleri ve proje içerikleri `src/content.ts` içinde tutulur.

- `profile`: ad, e-posta, CV, GitHub ve LinkedIn bağlantıları
- `selectedRepos`: seçilmiş GitHub projeleri
- `stackGroups`: kategori bazlı teknik yetkinlik grupları

Hero görseli `public/hero-engineering.jpg` yolundadır.
Portre görseli `public/sinan-portrait.jpg` yolundadır.
