# Computer Engineering Portfolio

Vite, React, Framer Motion ve lucide-react ile hazırlanmış modern, animasyonlu
ve deploy edilmeye hazır portfolio sitesi.

Public proje kartları GitHub'dan sayfalama ile canlı yüklenir. GitHub API'ye
ulaşılamazsa yerel yedek veriler gösterilir. Proje görselleri repo içindeki
website bağlantısından canlı ekran görüntüsü üretir; canlı URL yoksa GitHub Open
Graph önizlemesine düşer.

Sayfa, soldaki büyük sahne başlıklarıyla bölümlere ayrılır. Scroll sırasında
aktif bölüm başlığı parlak görünür, diğer başlıklar geride kalır.

## Yerelde Çalıştırma

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

Deploy edilebilir çıktı `dist/` klasöründe oluşur.

## Özelleştirme

Profil ve tech stack ayarları `src/App.tsx` içindedir.

- `profile`: ad, e-posta, GitHub kullanıcı adı, GitHub URL ve LinkedIn URL
- `fallbackRepos`: GitHub'a ulaşılamadığında gösterilen kartlar
- `stackItems`: tech stack logo kartları

Hero görseli `public/hero-engineering.jpg` yolundadır.
Portre görseli `public/sinan-portrait.jpg` yolundadır.
