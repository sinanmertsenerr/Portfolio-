// Sitedeki TUM metinler burada durur. Bir ceviri eklemek/duzeltmek icin
// sadece bu dosyayi duzenlemek yeterli.

export type Lang = "tr" | "en";

export type Highlight = { label: string; value: string };

export type FeaturedProject = {
  name: string;
  year: string;
  live: boolean;
  status: string;
  tagline: string;
  points: string[];
  stack: string[];
};

export type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  summary: string;
};

export type Copy = {
  nav: {
    about: string;
    work: string;
    experience: string;
    stack: string;
    contact: string;
  };
  navAria: string;
  langAria: string;
  hero: {
    eyebrow: string;
    greeting: string;
    lead: string;
    ctaProjects: string;
    ctaCv: string;
    tooltipGithub: string;
    tooltipLinkedin: string;
    tooltipEmail: string;
    portraitAlt: string;
  };
  highlights: Highlight[];
  work: { eyebrow: string; title: string };
  featuredProjects: FeaturedProject[];
  repos: {
    heading: string;
    viewAll: string;
    loading: string;
    errorPrefix: string;
    errorSuffix: string;
    noDescription: string;
    otherLanguage: string;
  };
  experience: { eyebrow: string; title: string; entries: ExperienceEntry[] };
  stack: { eyebrow: string; title: string };
  contact: { eyebrow: string; title: string; note: string; ctaEmail: string };
  footer: { email: string };
};

export const copy: Record<Lang, Copy> = {
  tr: {
    nav: {
      about: "Hakkımda",
      work: "Projeler",
      experience: "Deneyim",
      stack: "Tech Stack",
      contact: "İletişim",
    },
    navAria: "Sayfa bölümleri",
    langAria: "Dil seçimi",
    hero: {
      eyebrow: "Full Stack Developer · İzmir",
      greeting: "Merhaba, ben",
      lead: "Performanz'da part-time developer olarak web ve mobil uygulamalar geliştiriyorum. Backend'den arayüze uçtan uca sorumluluk alıyor; temiz, sürdürülebilir kod yazmaya ve kullanıcı odaklı ürünler geliştirmeye önem veriyorum.",
      ctaProjects: "Projelere bak",
      ctaCv: "CV'yi indir",
      tooltipGithub: "GitHub",
      tooltipLinkedin: "LinkedIn",
      tooltipEmail: "E-posta",
      portraitAlt: "Sinan Mert Şener portresi",
    },
    highlights: [
      { label: "Şu an", value: "Performanz · Part-time Developer" },
      { label: "Odak", value: "Fullstack Development · Mobil" },
      { label: "Sahada", value: "4 ürün gerçek kullanıcıda" },
      { label: "Eğitim", value: "Bilgisayar Müh. · 2026" },
    ],
    work: { eyebrow: "Sahada çalışan işler", title: "Projeler" },
    featuredProjects: [
      {
        name: "Fenerbahçe Basketbol Altyapı Platformu",
        year: "2026",
        live: true,
        status: "Sahada",
        tagline: "Sporcu başvurusundan saha ölçümlerine, altyapı seçmelerinin dijital hâli.",
        points: [
          "Web, mobil ve backend dahil sistemin tamamını tek başıma geliştirdim; Fenerbahçe Basketbol altyapısı tarafından aktif olarak kullanılıyor.",
          "QR ile sporcu tanıma, ölçüm istasyonları, çevrimdışı senkronize çalışan mobil uygulama ve KVKK uyumlu veri akışları içeriyor.",
        ],
        stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "VAP · Veri Analiz Portalı",
        year: "2025 – 2026",
        live: true,
        status: "Sahada",
        tagline: "Spor kurumları için sporcu gelişimini ölçen, izleyen ve raporlayan platform.",
        points: [
          "Spor Okulları modülünü (antrenman programı, yoklama, aidat) uçtan uca geliştirdim; Veli Portalı'nı ve anlık bildirim altyapısını ekledim.",
          "Yetenek karşılaştırma ekranları ve çok sayfalı PDF rapor üretimi üzerinde çalıştım.",
        ],
        stack: ["Next.js", ".NET 8", "PostgreSQL"],
      },
      {
        name: "NikiApp",
        year: "2025",
        live: true,
        status: "Sahada",
        tagline: "Kampüs kahvecisinin cebe giren hâli.",
        points: [
          "QR ile ödeme, kampanya katılımı ve haftalık ödül çarkı: sipariş ve sadakat akışını uçtan uca geliştirdim.",
          "İşletmeye özel dashboard: menü, kampanya ve kredi yönetimi tek panelden.",
        ],
        stack: ["React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "Sistem Takip Platformu",
        year: "2025",
        live: true,
        status: "Sahada",
        tagline: "Üretimde “bu malzeme nerede?” sorusunu bitiren panel.",
        points: [
          "Stok, depo ve malzeme konumlandırmayı tek ekranda toplayan şirket içi web platformu.",
          "Satışa hazır ürün durumu artık anlık olarak izlenebiliyor.",
        ],
        stack: ["Nest.js", "React", "PostgreSQL"],
      },
    ],
    repos: {
      heading: "GitHub'da daha fazlası",
      viewAll: "Tümünü gör",
      loading: "GitHub'dan yükleniyor…",
      errorPrefix: "Şu anda GitHub'a ulaşılamıyor — projelerimi ",
      errorSuffix: " adresinden inceleyebilirsiniz.",
      noDescription: "Bu proje için henüz bir açıklama eklenmemiş.",
      otherLanguage: "Diğer",
    },
    experience: {
      eyebrow: "Kilometre taşları",
      title: "Deneyim",
      entries: [
        {
          period: "May 2026 – Devam",
          role: "Software Engineer (Part-time)",
          org: "Performanz Arge ve Yazılım",
          summary:
            "Stajımın ardından aynı ekipte part-time olarak devam ediyorum; web ve mobilde uçtan uca ürün geliştiriyorum.",
        },
        {
          period: "Ağu 2025 – May 2026",
          role: "Software Engineer Intern",
          org: "Performanz Arge ve Yazılım",
          summary:
            "Web ve mobil projelerde uçtan uca geliştirme yaptım; Claude ile yapay zekâ destekli geliştirme süreçlerinde çalıştım.",
        },
        {
          period: "2024 – 2025",
          role: "Tanıtım Görevlisi (Part-time)",
          org: "İzmir Ekonomi Üniversitesi",
          summary:
            "Aday öğrencilere ve ailelerine kampüs tanıtımı yaptım; sunum ve iletişim becerilerimi bu görevde geliştirdim.",
        },
        {
          period: "2021 – 2026",
          role: "Activity Committee Leader · Yönetim Kurulu",
          org: "ESTIEM",
          summary:
            "25'ten fazla ülkeden öğrencinin katıldığı uluslararası etkinlikler düzenledim.",
        },
        {
          period: "2019 – 2026",
          role: "Bilgisayar Mühendisliği Lisans",
          org: "İzmir Ekonomi Üniversitesi",
          summary: "2026'da mezun oluyorum.",
        },
      ],
    },
    stack: { eyebrow: "Her gün kullandıklarım", title: "Tech Stack" },
    contact: {
      eyebrow: "İletişim",
      title: "Aklınızda bir proje mi var? Konuşalım.",
      note: "E-postanıza genellikle 24 saat içinde dönüş yaparım.",
      ctaEmail: "E-posta gönder",
    },
    footer: { email: "E-posta" },
  },
  en: {
    nav: {
      about: "About",
      work: "Projects",
      experience: "Experience",
      stack: "Tech Stack",
      contact: "Contact",
    },
    navAria: "Page sections",
    langAria: "Language",
    hero: {
      eyebrow: "Full Stack Developer · İzmir, Türkiye",
      greeting: "Hi, I'm",
      lead: "I'm a part-time developer at Performanz, where I build web and mobile applications. I take end-to-end ownership from backend to interface, with a focus on clean, maintainable code and user-centered products.",
      ctaProjects: "See my projects",
      ctaCv: "Download CV (TR)",
      tooltipGithub: "GitHub",
      tooltipLinkedin: "LinkedIn",
      tooltipEmail: "Email",
      portraitAlt: "Portrait of Sinan Mert Şener",
    },
    highlights: [
      { label: "Currently", value: "Performanz · Part-time Developer" },
      { label: "Focus", value: "Fullstack Development · Mobile" },
      { label: "Shipped", value: "4 products with real users" },
      { label: "Education", value: "Computer Eng. · 2026" },
    ],
    work: { eyebrow: "Running in production", title: "Projects" },
    featuredProjects: [
      {
        name: "Fenerbahçe Basketball Academy Platform",
        year: "2026",
        live: true,
        status: "Live",
        tagline: "From athlete applications to courtside measurements: academy tryouts, digitized.",
        points: [
          "I built the entire system solo, including web, mobile and backend; it is actively used by the Fenerbahçe Basketball youth academy.",
          "Features QR-based athlete identification, measurement stations, an offline-syncing mobile app and KVKK-compliant data flows.",
        ],
        stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "VAP · Data Analysis Portal",
        year: "2025 – 2026",
        live: true,
        status: "Live",
        tagline: "A platform that measures, tracks and reports athlete development for sports organizations.",
        points: [
          "I built the Sports Schools module (training schedules, attendance, fees) end to end, and added the Parent Portal and the push notification infrastructure.",
          "I also worked on talent comparison screens and multi-page PDF report generation.",
        ],
        stack: ["Next.js", ".NET 8", "PostgreSQL"],
      },
      {
        name: "NikiApp",
        year: "2025",
        live: true,
        status: "Live",
        tagline: "A campus coffee shop, right in your pocket.",
        points: [
          "QR payments, campaign check-ins and a weekly reward wheel: I built the ordering and loyalty flow end to end.",
          "A dedicated dashboard for the business: menu, campaigns and credit management in one panel.",
        ],
        stack: ["React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "Production Tracking Platform",
        year: "2025",
        live: true,
        status: "Live",
        tagline: "The panel that puts an end to “where is this part?” on the production floor.",
        points: [
          "An internal web platform that brings stock, warehouse and material locations into a single screen.",
          "Sales-ready product status is now tracked in real time.",
        ],
        stack: ["Nest.js", "React", "PostgreSQL"],
      },
    ],
    repos: {
      heading: "More on GitHub",
      viewAll: "View all",
      loading: "Loading from GitHub…",
      errorPrefix: "GitHub can't be reached right now — you can browse my work at ",
      errorSuffix: ".",
      noDescription: "No description added yet.",
      otherLanguage: "Other",
    },
    experience: {
      eyebrow: "The road so far",
      title: "Experience",
      entries: [
        {
          period: "May 2026 – Present",
          role: "Software Engineer (Part-time)",
          org: "Performanz Arge ve Yazılım",
          summary:
            "After my internship, I stayed on the same team as a part-time engineer; I continue to build products end to end across web and mobile.",
        },
        {
          period: "Aug 2025 – May 2026",
          role: "Software Engineer Intern",
          org: "Performanz Arge ve Yazılım",
          summary:
            "I worked on end-to-end product development for web and mobile, using AI-assisted development workflows with Claude.",
        },
        {
          period: "2024 – 2025",
          role: "Campus Guide (Part-time)",
          org: "İzmir University of Economics",
          summary:
            "I gave campus tours and presentations to prospective students and their families, which strengthened my presentation and communication skills.",
        },
        {
          period: "2021 – 2026",
          role: "Activity Committee Leader · Board Member",
          org: "ESTIEM",
          summary:
            "I organized international events that brought together students from more than 25 countries.",
        },
        {
          period: "2019 – 2026",
          role: "B.Sc. Computer Engineering",
          org: "İzmir University of Economics",
          summary: "I am graduating in 2026.",
        },
      ],
    },
    stack: { eyebrow: "What I use every day", title: "Tech Stack" },
    contact: {
      eyebrow: "Contact",
      title: "Have a project in mind? Let's talk.",
      note: "I usually reply within 24 hours.",
      ctaEmail: "Send an email",
    },
    footer: { email: "Email" },
  },
};
