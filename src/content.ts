// Sitedeki tum metinler burada. Ceviri eklemek ya da duzeltmek icin sadece
// bu dosyayi duzenlemek yeterli. Bilgiler CV'den ve canli siteden alindi.
// **iki yildiz** arasi goz tarayinca yakalansin diye kalin gosterilir.

export type Lang = "tr" | "en";

export type ProductStatus = "live" | "partial" | "building";

export type Product = {
  name: string;
  tagline: string;
  role: string;
  // Sadece one cikan urunde gosterilir
  result?: string;
  stack: string[];
  status: ProductStatus;
  years: string;
};

export type Fact = { term: string; detail: string };

// Sure ay cinsinden tutulur; ekrana dile gore "1 yil 2 ay" gibi yazilir
// Buyuk sayi: ya ay cinsinden sure ("1 yil" diye yazilir) ya da hazir deger ("25+")
export type Figure = { label: string } & ({ months: number } | { value: string });

export type Role = {
  period: string;
  title: string;
  org: string;
  note: string;
  months: number | null;
};

export type Copy = {
  skip: string;
  langLabel: string;
  newTab: string;
  navLabel: string;
  nav: { products: string; experience: string; stack: string; contact: string };
  mobileNav: { profile: string; products: string; experience: string; stack: string; contact: string };
  profile: {
    role: string;
    status: string;
    cv: string;
    cvShort: string;
    email: string;
    portraitAlt: string;
  };
  intro: {
    claim: string;
    claimDetail: string;
    lead: string;
    facts: Fact[];
  };
  statusLabels: Record<ProductStatus, string>;
  products: {
    title: string;
    note: string;
    roleLabel: string;
    resultLabel: string;
    stackLabel: string;
    featuredHighlightsLabel: string;
    featuredHighlights: string[];
    items: Product[];
    githubTitle: string;
    githubAll: string;
  };
  experience: {
    title: string;
    note: string;
    figures: Figure[];
    roles: Role[];
  };
  stack: {
    title: string;
    note: string;
    countLabel: (count: number) => string;
    groups: Array<{ name: string; items: string[] }>;
  };
  contact: {
    title: string;
    note: string;
  };
  footer: { updated: string };
  formatDuration: (months: number) => string;
};

export const copy: Record<Lang, Copy> = {
  tr: {
    skip: "İçeriğe geç",
    langLabel: "Dil seçimi",
    newTab: "(yeni sekmede açılır)",
    navLabel: "Sayfa bölümleri",
    nav: { products: "Ürünler", experience: "Deneyim", stack: "Teknolojiler", contact: "İletişim" },
    mobileNav: {
      profile: "Profil",
      products: "Ürünler",
      experience: "Deneyim",
      stack: "Teknoloji",
      contact: "İletişim",
    },
    profile: {
      role: "Full Stack Developer, İzmir",
      status: "Yeni rollere açık",
      cv: "CV'yi indir (PDF)",
      cvShort: "CV",
      email: "E-posta gönder",
      portraitAlt: "Sinan Mert Şener'in portresi",
    },
    intro: {
      claim: "Sahada üç ürün.",
      claimDetail: "Biri Fenerbahçe Basketbol altyapısında.",
      lead: "Web, mobil ve backend'i **uçtan uca** geliştiriyorum.",
      facts: [
        { term: "Son rol", detail: "Software Engineer, Performanz" },
        { term: "Eğitim", detail: "Bilgisayar Mühendisliği, 2026" },
        { term: "Diller", detail: "Türkçe, İngilizce (akıcı)" },
      ],
    },
    statusLabels: {
      live: "Sahada",
      partial: "Kısmen sahada",
      building: "Geliştiriliyor",
    },
    products: {
      title: "Ürünler",
      note: "4 üründen 3'ü sahada.",
      roleLabel: "Rolüm",
      resultLabel: "Sonuç",
      stackLabel: "Teknoloji",
      featuredHighlightsLabel: "Neler var",
      featuredHighlights: [
        "QR ile sporcu tanıma",
        "Ölçüm istasyonları",
        "Çevrimdışı çalışan mobil",
        "KVKK uyumlu veri",
      ],
      items: [
        {
          name: "Fenerbahçe Basketbol Altyapı Platformu",
          tagline: "Altyapı seçmelerinin dijital hâli.",
          role: "Web, mobil ve backend'i **tek başıma** geliştirdim.",
          result: "**Seçmelerde ve saha ölçümlerinde** kullanılıyor.",
          stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
          status: "live",
          years: "2026",
        },
        {
          name: "VAP (Veri Analiz Portalı)",
          tagline: "Spor kurumları için sporcu gelişim platformu.",
          role: "**Spor Okulları modülü**, Veli Portalı ve bildirimler.",
          stack: ["Next.js", ".NET 8", "PostgreSQL"],
          status: "live",
          years: "2025–2026",
        },
        {
          name: "Sistem Takip Platformu",
          tagline: "Üretimde “bu malzeme nerede?” sorusunu bitiren panel.",
          role: "**Stok, depo ve konum** takibi tek uygulamada.",
          stack: ["Nest.js", "React", "PostgreSQL"],
          status: "partial",
          years: "2025",
        },
        {
          name: "NikiApp",
          tagline: "Kampüs kahvecisinin cebe giren hâli.",
          role: "**Mobil uygulama** ve işletme paneli.",
          stack: ["React Native", "Nest.js", "PostgreSQL"],
          status: "building",
          years: "2025",
        },
      ],
      githubTitle: "GitHub'dan seçmeler",
      githubAll: "Tüm repolar",
    },
    experience: {
      title: "Deneyim",
      note: "",
      figures: [
        { months: 12, label: "Performanz'da yazılım mühendisliği" },
        { value: "25+", label: "ülkeden katılımcıyla uluslararası etkinlik" },
      ],
      roles: [
        {
          period: "May–Tem 2026",
          title: "Software Engineer (Part-time)",
          org: "Performanz Arge ve Yazılım",
          note: "**Web ve mobil** ürün geliştirme.",
          months: 3,
        },
        {
          period: "Ağu 2025–May 2026",
          title: "Software Engineer Intern",
          org: "Performanz Arge ve Yazılım",
          note: "Web, mobil ve **yapay zekâ destekli** geliştirme.",
          months: 10,
        },
        {
          period: "Kas 2024–Ağu 2025",
          title: "Tanıtım Görevlisi (Part-time)",
          org: "İzmir Ekonomi Üniversitesi",
          note: "Aday öğrencilere **kampüs tanıtımı**.",
          months: 10,
        },
        {
          period: "2023–2024",
          title: "Activity Committee Leader",
          org: "ESTIEM, yönetim kurulu",
          note: "**25+ ülkeden** öğrenciyle uluslararası etkinlikler.",
          months: 12,
        },
        {
          period: "2019–2026",
          title: "Bilgisayar Mühendisliği, lisans",
          org: "İzmir Ekonomi Üniversitesi",
          note: "",
          months: null,
        },
      ],
    },
    stack: {
      title: "Teknolojiler",
      note: "Küçük sayı: sahadaki kaç üründe kullanıldığı.",
      countLabel: (count) => `Sahadaki ${count} üründe`,
      groups: [
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { name: "Backend", items: ["Nest.js", "Node.js", ".NET", "FastAPI"] },
        { name: "Mobil", items: ["React Native", "Swift", "Flutter"] },
        { name: "Veri ve altyapı", items: ["PostgreSQL", "Redis", "Docker", "Firebase", "Cloudflare"] },
        { name: "Araçlar ve yapay zekâ", items: ["Git", "GitHub Actions", "Prisma", "Claude", "Codex"] },
      ],
    },
    contact: {
      title: "Görüşme için bir e-posta yeterli.",
      note: "Genellikle 24 saat içinde dönüyorum.",
    },
    footer: { updated: "Son güncelleme: Eylül 2026" },
    formatDuration: (months) => {
      const years = Math.floor(months / 12);
      const rest = months % 12;
      return [years ? `${years} yıl` : "", rest ? `${rest} ay` : ""].filter(Boolean).join(" ");
    },
  },
  en: {
    skip: "Skip to content",
    langLabel: "Language",
    newTab: "(opens in a new tab)",
    navLabel: "Page sections",
    nav: { products: "Products", experience: "Experience", stack: "Technologies", contact: "Contact" },
    mobileNav: {
      profile: "Profile",
      products: "Products",
      experience: "Career",
      stack: "Stack",
      contact: "Contact",
    },
    profile: {
      role: "Full Stack Developer, İzmir, Türkiye",
      status: "Open to new roles",
      cv: "Download CV (PDF, Turkish)",
      cvShort: "CV",
      email: "Send an email",
      portraitAlt: "Portrait of Sinan Mert Şener",
    },
    intro: {
      claim: "Three products in production.",
      claimDetail: "One runs inside Fenerbahçe Basketball's youth academy.",
      lead: "I build web, mobile and backend **end to end**.",
      facts: [
        { term: "Latest role", detail: "Software Engineer, Performanz" },
        { term: "Education", detail: "B.Sc. Computer Engineering, 2026" },
        { term: "Languages", detail: "Turkish, English (fluent)" },
      ],
    },
    statusLabels: {
      live: "Live",
      partial: "Partially live",
      building: "In development",
    },
    products: {
      title: "Products",
      note: "3 of 4 products are live.",
      roleLabel: "My role",
      resultLabel: "Outcome",
      stackLabel: "Stack",
      featuredHighlightsLabel: "Inside",
      featuredHighlights: [
        "QR athlete check-in",
        "Measurement stations",
        "Offline-first mobile app",
        "KVKK-compliant data",
      ],
      items: [
        {
          name: "Fenerbahçe Basketball Academy Platform",
          tagline: "Academy tryouts, digitized.",
          role: "Built web, mobile and backend **on my own**.",
          result: "Used in **tryouts and courtside measurements**.",
          stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
          status: "live",
          years: "2026",
        },
        {
          name: "VAP (Data Analysis Portal)",
          tagline: "Athlete development platform for sports organizations.",
          role: "**Sports Schools module**, Parent Portal and notifications.",
          stack: ["Next.js", ".NET 8", "PostgreSQL"],
          status: "live",
          years: "2025–2026",
        },
        {
          name: "Production Tracking Platform",
          tagline: "The panel that ends “where is this part?” on the shop floor.",
          role: "**Stock, warehouse and location** tracking in one app.",
          stack: ["Nest.js", "React", "PostgreSQL"],
          status: "partial",
          years: "2025",
        },
        {
          name: "NikiApp",
          tagline: "A campus coffee shop in your pocket.",
          role: "**Mobile app** and business dashboard.",
          stack: ["React Native", "Nest.js", "PostgreSQL"],
          status: "building",
          years: "2025",
        },
      ],
      githubTitle: "Picks from GitHub",
      githubAll: "All repositories",
    },
    experience: {
      title: "Experience",
      note: "",
      figures: [
        { months: 12, label: "software engineering at Performanz" },
        { value: "25+", label: "countries at the international events I organized" },
      ],
      roles: [
        {
          period: "May–Jul 2026",
          title: "Software Engineer (Part-time)",
          org: "Performanz Arge ve Yazılım",
          note: "**Web and mobile** product development.",
          months: 3,
        },
        {
          period: "Aug 2025–May 2026",
          title: "Software Engineer Intern",
          org: "Performanz Arge ve Yazılım",
          note: "Web, mobile and **AI-assisted** development.",
          months: 10,
        },
        {
          period: "Nov 2024–Aug 2025",
          title: "Campus Guide (Part-time)",
          org: "İzmir University of Economics",
          note: "**Campus tours** for prospective students.",
          months: 10,
        },
        {
          period: "2023–2024",
          title: "Activity Committee Leader",
          org: "ESTIEM, board member",
          note: "International events with students from **25+ countries**.",
          months: 12,
        },
        {
          period: "2019–2026",
          title: "B.Sc. Computer Engineering",
          org: "İzmir University of Economics",
          note: "",
          months: null,
        },
      ],
    },
    stack: {
      title: "Technologies",
      note: "Small number: how many live products use it.",
      countLabel: (count) => `In ${count} live products`,
      groups: [
        { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { name: "Backend", items: ["Nest.js", "Node.js", ".NET", "FastAPI"] },
        { name: "Mobile", items: ["React Native", "Swift", "Flutter"] },
        { name: "Data and infrastructure", items: ["PostgreSQL", "Redis", "Docker", "Firebase", "Cloudflare"] },
        { name: "Tools and AI", items: ["Git", "GitHub Actions", "Prisma", "Claude", "Codex"] },
      ],
    },
    contact: {
      title: "One email is enough to set up a call.",
      note: "I usually reply within 24 hours.",
    },
    footer: { updated: "Last updated: September 2026" },
    formatDuration: (months) => {
      const years = Math.floor(months / 12);
      const rest = months % 12;
      return [
        years ? `${years} ${years === 1 ? "year" : "years"}` : "",
        rest ? `${rest} ${rest === 1 ? "month" : "months"}` : "",
      ]
        .filter(Boolean)
        .join(" ");
    },
  },
};

export const selectedRepos: Array<{
  name: string;
  url: string;
  description: Record<Lang, string>;
}> = [
  {
    name: "AIcelerate",
    url: "https://github.com/sucreistaken/AIcelerate",
    description: {
      tr: "AI transkripsiyonlu, gerçek zamanlı çalışma platformu.",
      en: "Real-time study platform with AI transcription.",
    },
  },
  {
    // Office Commun'un tarayicisinin fork'u; ozellik dallari bu hesapta
    name: "Search (macOS tarayıcı)",
    url: "https://github.com/sinanmertsenerr/Search",
    description: {
      tr: "WebKit tarayıcısına katkılarım: Claude için MCP sunucusu, otomatik doldurma, çeviri, site izinleri.",
      en: "My additions to a WebKit browser: an MCP server for Claude, autofill, translation, site permissions.",
    },
  },
  {
    name: "YKS Hazırlık",
    url: "https://github.com/sinanmertsenerr/YKSHazirlikTakvimi",
    description: {
      tr: "TYT/AYT için internetsiz çalışan konu ve deneme takibi. Expo, React Native.",
      en: "Offline-first study tracker for Turkey's university entrance exam. Expo, React Native.",
    },
  },
  {
    name: "İEÜ Erasmus+ sayfası",
    url: "https://github.com/sinanmertsenerr/nodebb-plugin-ieu-erasmus",
    description: {
      tr: "forum.ieu.app için bölüme göre okul bulma, hibe hesaplayıcı ve rota haritası.",
      en: "Erasmus+ page for forum.ieu.app: schools by department, grant calculator, route map.",
    },
  },
];
