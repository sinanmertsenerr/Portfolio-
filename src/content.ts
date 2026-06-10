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
      lead: "Henüz okul bitmeden çalışmaya başladım: Performanz'a stajyer olarak girdim, şimdi part-time developer olarak devam ediyorum. En keyif aldığım kısım, bir fikrin gerçek insanların her gün kullandığı bir ürüne dönüşmesini görmek.",
      ctaProjects: "Projelere bak",
      ctaCv: "CV'yi indir",
      tooltipGithub: "GitHub",
      tooltipEmail: "E-posta",
      portraitAlt: "Sinan Mert Şener portresi",
    },
    highlights: [
      { label: "Şu an", value: "Performanz · Part-time Developer" },
      { label: "Odak", value: "Fullstack Development · Mobil" },
      { label: "Sahada", value: "3 ürün gerçek kullanıcıda" },
      { label: "Eğitim", value: "Bilgisayar Müh. · 2026" },
    ],
    work: { eyebrow: "Sahada çalışan işler", title: "Projeler" },
    featuredProjects: [
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
      {
        name: "Spor Okulları Yönetim Modülü",
        year: "2025",
        live: true,
        status: "Sahada",
        tagline: "Yoklamadan aidata, spor okulunun tüm operasyonu tek modülde.",
        points: [
          "Antrenör yoklama alıyor, sporcunun katılımı izleniyor, muhasebe aidatı takip ediyor.",
          "Şirket bünyesinde tamamlandı ve aktif olarak kullanılıyor.",
        ],
        stack: ["React", "Nest.js", "PostgreSQL"],
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
      lead: "I started working before I finished school: I joined Performanz as an intern and stayed on as a part-time developer. The part I enjoy most is watching an idea turn into a product people actually use every day.",
      ctaProjects: "See my projects",
      ctaCv: "Download CV (TR)",
      tooltipGithub: "GitHub",
      tooltipEmail: "Email",
      portraitAlt: "Portrait of Sinan Mert Şener",
    },
    highlights: [
      { label: "Currently", value: "Performanz · Part-time Developer" },
      { label: "Focus", value: "Fullstack Development · Mobile" },
      { label: "Shipped", value: "3 products with real users" },
      { label: "Education", value: "Computer Eng. · 2026" },
    ],
    work: { eyebrow: "Running in production", title: "Projects" },
    featuredProjects: [
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
      {
        name: "Sports School Management Module",
        year: "2025",
        live: true,
        status: "Live",
        tagline: "From attendance to fees, a sports school's whole operation in one module.",
        points: [
          "Coaches take attendance, athlete participation is tracked, accounting handles the fees.",
          "Completed in-house and now in daily use.",
        ],
        stack: ["React", "Nest.js", "PostgreSQL"],
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
