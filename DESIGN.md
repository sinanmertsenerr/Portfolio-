---
version: alpha
name: 'Sinan Mert Şener Portfolyo'
description: 'Taş zemin, lacivert mürekkep, tek vurgu rengi kobalt. Sayfa bir pafta; bölümden bölüme tek bir rota çizgisi geçer. Portre renkli ama sayfanın tonunda; ekran görüntüleri taşa baskı gibi durur.'
colors:
  primary: '#141c3a'
  secondary: '#454c69'
  tertiary: '#0047d0'
  neutral: '#ebebe6'
  surface: '#f6f6f2'
  on-surface: '#141c3a'
  faint: '#666b84'
  border: '#c9c9bf'
  on-tertiary: '#ffffff'
  tertiary-hover: '#0035bf'
  tertiary-pressed: '#0026b1'
  link: '#141c3a'
  error: '#b42318'
  success: '#166534'
  warning: '#8a5200'
  info: '#0369a1'
  focus-ring: '#0047d0'
typography:
  headline-display:
    fontFamily: Public Sans
    fontSize: '68px'
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Public Sans
    fontSize: '38px'
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: '22px'
    fontWeight: 700
    lineHeight: 1.3
  figure:
    fontFamily: Public Sans
    fontSize: '92px'
    fontWeight: 800
    lineHeight: 0.95
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: '21px'
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: '17px'
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: '16px'
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: '2px'
  md: '4px'
  lg: '6px'
spacing:
  unit: '4px'
  control-gap: '12px'
  content-gap: '24px'
  section-gap: '136px'
components:
  button-primary:
    backgroundColor: '{colors.tertiary}'
    textColor: '{colors.on-tertiary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.md}'
    height: '44px'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.primary}'
    rounded: '{rounded.md}'
    height: '44px'
  button-quiet:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.tertiary}'
  focus-indicator:
    backgroundColor: '{colors.focus-ring}'
    width: '2px'
  divider:
    backgroundColor: '{colors.border}'
    height: '1px'
---

# Sinan Mert Şener Portfolyo

## Overview

Hedef okur işe alım uzmanları ve mühendislik ekipleri. His: sakin, özenli, teknik. Odak hikâyede: özet, ana proje ve yan projeler, deneyim, GitHub, stack, iletişim.

- Dil: Türkçe ve İngilizce aynı sayfada. Kaynak (`src/page.html`) yalnızca Türkçe yazılır; İngilizce karşılıklar `src/en.mjs` içindedir ve derlemede eklenir. Seçim sırası: `?lang=` bağlantısı, kayıtlı seçim, tarayıcı dili. Yeni metin eklenince derleme eksik çeviriyi listeler.
- Sanat yönü: **Stone & Cobalt** (minimal-stone-cobalt~11). Taş baskı provası: soluk taş zemin, okumak için lacivert mürekkep, önemli olan için kobalt.
- Sayfa biçimi: **rota**. Sayfa bir pafta; sağ üstten başlayan tek çizgi her bölüm geçişinde paftayı boydan boya geçer ve solda, iletişim butonunda biter. Üst bardaki bölüm başlıkları bu rotanın duraklarıdır.
- İmza an (sayfada bir kez): **ana projenin şeması**. Akış çizgileri çizilir, sonra üç kobalt açıklama sırayla parçasına bağlanır.
- Portre doğrudan renkli, ama tonu sayfaya uydurulmuş (doygunluk 0,68; mürekkep karışımı 0,28; `tools/portrait.mjs`). Üstüne gelince değişmez. Sahibin kararı, 13 Ekim 2026: renk açılma efekti garip durdu, ham renk fazla parladı.
- Ekran görüntüleri iki tonla basılır; üstüne gelince gerçek renk çıkar.

## Colors

Zemin taş (#ebebe6), pafta bir ton açık (#f6f6f2). İki mürekkep var: okumak için lacivert (#141c3a), vurgu ve eylem için kobalt (#0047d0). Griler taştan gelir (#454c69 ikincil metin, #666b84 henüz okunmamış geçiş kelimesi, #c9c9bf ince çizgi).

- Kobalt yalnızca şunlarda: ana buton, bölümün tek büyük sayısı, işaretçi, şemadaki açıklama çizgileri, stack'teki kullanım sayısı, odak halkası.
- Durum bir kelimedir ve kendi rengindedir: Sahada (#166534), Kısmen sahada (#8a5200), Geliştiriliyor (#0369a1). Nokta ya da hap yok.
- Tüm metin çiftleri WCAG AA.

## Typography

Başlıklar **Public Sans** 800, okuma metni **Atkinson Hyperlegible Next**. İkisi de değişken font, latin + latin-ext (Türkçe), dosyaya gömülü. Monospace yok.

- Ekran başına tek büyük öge: ilk ekranda başlık, diğerlerinde bir sayı.
- Cümle düzeni; büyük harfli etiket, boyalı başlık kelimesi yok.
- Okuma genişliği en fazla ~44 karakter; başlıklarda `text-wrap: balance`.

## Layout

- Pafta: içerik çerçeveli tek yüzeyde; kenar boşluğu (gutter) rotanın şeritlerini taşır.
- Ritim: dolu bölüm, sonra tek cümlelik geçiş, sonra yine dolu bölüm. Geçiş cümlesi bir sonraki bölümü söyler.
- Başlıklar sol üstte. Kutu yok. Repolar ve stack aynı çizgili listeyi kullanır: üstte 1px mürekkep çizgi, satır aralarında ince çizgi, ilk sütun hep 3/12.
- Deneyim bir hat ve duraklardır (sahibin kararı, 13 Ekim 2026: yatay zaman ekseni yoruyordu, düz tablo ise hikâyeyi kesiyordu). Solda başlangıç yılı, ortada aşağı inen hat ve durak, sağda rol ve tek cümle. Kaydırdıkça durak mürekkebe döner, işaretçi okunan durağı gösterir. Yeni rol en üste bir durak olarak eklenir.
- Ayırıcı: rotanın yatay geçişi. Rota yoksa (dar ekran, JS kapalı) aynı yerde 2px düz mürekkep çizgi.
- Üst bar: solda Özet, Projeler, Deneyim; ortada isim; sağda GitHub, Stack, İletişim. Başlıkları ayıran çizgi, kaydırdıkça mürekkeple dolar. Sağ uçta TR / EN dil seçimi durur: kutu yok, gezinmeyle aynı dil (seçili dilin önünde kobalt işaretçi).
- Telefon ve tablet (1024px altı) uygulama düzeni (sahibin kararı, 13 Ekim 2026: "mobile özel web app", büyük fotoğraf akışı kesiyordu): üstte küçük yuvarlak profil fotoğrafı, ad ve rol; sağ üstte dil seçimi; bölümler altta yüzen sekme çubuğunda (ikon + etiket, bulunulan sekme kobalt çizgiyle işaretli). Büyük portre ve rota çizgisi yalnızca masaüstünde.

## Elevation & Depth

Düz. Yüzeyler tonla ve ince çizgiyle ayrılır. Tek istisna yüzen katman: telefondaki sekme çubuğu `--shadow-float` taşır.

## Shapes

2px küçük öğeler ve şema kutuları, 4px butonlar, 6px ekran görüntüsü çerçeveleri ve sekme çubuğu. Tam yuvarlak yalnızca telefondaki profil fotoğrafı.

## Components

Tek dil: işaretçi (çizilmiş küçük üçgen) okuyucunun nerede olduğunu gösterir; değişim mürekkep gibi emilir (yalnızca renk ve opaklık, 320ms).

- Butonlar: ana (kobalt dolgu, ekranda bir tane), ikincil (mürekkep çerçeve), sessiz (kobalt yazı). 44px. Hover dolguyu koyultur; hiçbir şey büyümez, kalkmaz.
- Bağlantılar: mürekkep rengi, altı çizili. İleri götürende çizilmiş ok hover'da 2px ilerler; dışarı açılanda küçük dış bağlantı oku.
- Seçili satır (repolar): solunda işaretçi, bir ton koyu zemin; bağlantı tüm satırı kaplar.
- Stack: grup adı solda, logolar sağda. Küçük mavi sayı, aracın sahadaki kaç üründe kullanıldığını söyler.
- Şema: üstüne gelinen parça kobaltla dolar, altında adı ve işi yazar.
- Logolar: Simple Icons, tek renk mürekkep, adının yanında. Emoji yok. Sekme çubuğu ikonları tek aileden: 16'lık ızgara, 1,5px çizgi.
- Hareket: rota ve geçiş cümleleri kaydırmayı birebir izler; şema bir kez çizilir. "Hareketi azalt" açıksa hiçbiri oynamaz.

## Do's and Don'ts

- Do: içerik yalnızca CV'den ve canlı sitelerden; sayılar gerçek.
- Do: kısa cümle, bir fikir; görsel önde.
- Don't: yeni renk, gölge, gradyan, parıltı, döngüyle dönen efekt.
- Don't: her bloğa aynı kaydırma animasyonu; her başlığın altına gri alt başlık.
