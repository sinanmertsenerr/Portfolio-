// Sitedeki TUM metinler burada durur. Bir ceviri eklemek/duzeltmek icin
// sadece bu dosyayi duzenlemek yeterli.

export type Lang = "tr" | "en";

export type Highlight = { label: string; value: string };

export type FeaturedProject = {
  name: string;
  year: string;
  live: boolean;
  status: string;
  role: string;
  impact: string;
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
    github: string;
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
  flagship: {
    eyebrow: string;
    impactLabel: string;
    roleLabel: string;
    detailsLabel: string;
  };
  featuredProjects: FeaturedProject[];
  repos: { viewAll: string };
  experience: { eyebrow: string; title: string; entries: ExperienceEntry[] };
  stack: {
    eyebrow: string;
    title: string;
    note: string;
    groups: {
      frontend: string;
      backend: string;
      mobile: string;
      data: string;
      workflow: string;
    };
  };
  github: { eyebrow: string; title: string; note: string };
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
      github: "GitHub",
      contact: "İletişim",
    },
    navAria: "Sayfa bölümleri",
    langAria: "Dil seçimi",
    hero: {
      eyebrow: "Full Stack Developer · İzmir",
      greeting: "Merhaba, ben",
      lead: "Web, mobil ve backend ürünleri geliştiriyorum. Fenerbahçe Basketbol altyapısı dahil gerçek kullanıcıya ulaşan ürünlerde uçtan uca sorumluluk alıyorum.",
      ctaProjects: "Projelere bak",
      ctaCv: "CV'yi indir",
      tooltipGithub: "GitHub",
      tooltipLinkedin: "LinkedIn",
      tooltipEmail: "E-posta",
      portraitAlt: "Sinan Mert Şener portresi",
    },
    highlights: [
      { label: "Sahada", value: "4 ürün gerçek kullanıcıda" },
      { label: "Şu an", value: "Performanz · Software Engineer" },
      { label: "Odak", value: "Web · Mobil · Backend" },
      { label: "Eğitim", value: "Bilgisayar Müh. · 2026" },
    ],
    work: { eyebrow: "Sahada çalışan işler", title: "Projeler" },
    flagship: {
      eyebrow: "Öne çıkan çalışma",
      impactLabel: "Etki",
      roleLabel: "Sorumluluğum",
      detailsLabel: "Öne çıkan özellikler",
    },
    featuredProjects: [
      {
        name: "Fenerbahçe Basketbol Altyapı Platformu",
        year: "2026",
        live: true,
        status: "Sahada",
        role: "Web, mobil ve backend dahil sistemi uçtan uca tek başıma geliştirdim.",
        impact: "Fenerbahçe Basketbol altyapısının seçme ve saha ölçüm süreçlerinde aktif olarak kullanılıyor.",
        tagline: "Sporcu başvurusundan saha ölçümlerine, altyapı seçmelerinin dijital hâli.",
        points: [
          "QR ile sporcu tanıma, ölçüm istasyonları, çevrimdışı senkronize çalışan mobil uygulama ve KVKK uyumlu veri akışları içeriyor.",
          "Sahadaki bağlantı koşullarına dayanıklı mobil akışlar ve merkezi yönetim paneli aynı ürün altında çalışıyor.",
        ],
        stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "VAP · Veri Analiz Portalı",
        year: "2025 – 2026",
        live: true,
        status: "Sahada",
        role: "Spor Okulları modülünü, Veli Portalı'nı ve bildirim akışlarını uçtan uca geliştirdim.",
        impact: "Spor kurumlarının antrenman, yoklama, aidat ve sporcu gelişim verilerini tek sistemde yönetmesini sağlıyor.",
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
        role: "Mobil müşteri deneyimi ile işletme dashboard'unun ürün akışlarını geliştirdim.",
        impact: "Sipariş, sadakat, kampanya ve işletme yönetimini tek ürün ailesinde birleştiriyor.",
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
        role: "Stok, depo ve malzeme konumlandırma akışlarını tek web uygulamasında topladım.",
        impact: "Üretim ekibinin malzeme ve satışa hazır ürün durumunu anlık takip etmesini sağlıyor.",
        tagline: "Üretimde “bu malzeme nerede?” sorusunu bitiren panel.",
        points: [
          "Stok, depo ve malzeme konumlandırmayı tek ekranda toplayan şirket içi web platformu.",
          "Satışa hazır ürün durumu artık anlık olarak izlenebiliyor.",
        ],
        stack: ["Nest.js", "React", "PostgreSQL"],
      },
    ],
    repos: { viewAll: "Tümünü gör" },
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
    stack: {
      eyebrow: "Üretimde kullandığım araçlar",
      title: "Tech Stack",
      note: "Her teknolojiyi aynı seviyede göstermiyorum; en sık kullandığım araçları çalışma alanlarına göre gruplayarak sunuyorum.",
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile",
        data: "Data & Infra",
        workflow: "Workflow",
      },
    },
    github: {
      eyebrow: "Seçilmiş açık kaynak işler",
      title: "GitHub",
      note: "Ana ürün çalışmalarının dışında teknik yaklaşımımı gösteren birkaç seçilmiş proje.",
    },
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
      github: "GitHub",
      contact: "Contact",
    },
    navAria: "Page sections",
    langAria: "Language",
    hero: {
      eyebrow: "Full Stack Developer · İzmir, Türkiye",
      greeting: "Hi, I'm",
      lead: "I build web, mobile and backend products. I take end-to-end ownership on products used by real users, including systems for the Fenerbahçe Basketball youth academy.",
      ctaProjects: "See my projects",
      ctaCv: "Download CV (TR)",
      tooltipGithub: "GitHub",
      tooltipLinkedin: "LinkedIn",
      tooltipEmail: "Email",
      portraitAlt: "Portrait of Sinan Mert Şener",
    },
    highlights: [
      { label: "Shipped", value: "4 products with real users" },
      { label: "Currently", value: "Performanz · Software Engineer" },
      { label: "Focus", value: "Web · Mobile · Backend" },
      { label: "Education", value: "Computer Eng. · 2026" },
    ],
    work: { eyebrow: "Running in production", title: "Projects" },
    flagship: {
      eyebrow: "Featured case study",
      impactLabel: "Impact",
      roleLabel: "My role",
      detailsLabel: "Key capabilities",
    },
    featuredProjects: [
      {
        name: "Fenerbahçe Basketball Academy Platform",
        year: "2026",
        live: true,
        status: "Live",
        role: "I built the full system solo across web, mobile and backend.",
        impact: "Actively used by the Fenerbahçe Basketball youth academy for tryouts and courtside measurement workflows.",
        tagline: "From athlete applications to courtside measurements: academy tryouts, digitized.",
        points: [
          "Features QR-based athlete identification, measurement stations, an offline-syncing mobile app and KVKK-compliant data flows.",
          "Field-ready mobile flows and centralized administration work together as one product system.",
        ],
        stack: ["React", "React Native", "Nest.js", "PostgreSQL"],
      },
      {
        name: "VAP · Data Analysis Portal",
        year: "2025 – 2026",
        live: true,
        status: "Live",
        role: "I built the Sports Schools module, Parent Portal and notification flows end to end.",
        impact: "Helps sports organizations manage training, attendance, fees and athlete development data in one system.",
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
        role: "I worked across the mobile customer experience and the business management dashboard.",
        impact: "Brings ordering, loyalty, campaigns and business operations into one product family.",
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
        role: "I brought stock, warehouse and material location flows together in one web application.",
        impact: "Gives the production team real-time visibility into materials and sales-ready product status.",
        tagline: "The panel that puts an end to “where is this part?” on the production floor.",
        points: [
          "An internal web platform that brings stock, warehouse and material locations into a single screen.",
          "Sales-ready product status is now tracked in real time.",
        ],
        stack: ["Nest.js", "React", "PostgreSQL"],
      },
    ],
    repos: { viewAll: "View all" },
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
    stack: {
      eyebrow: "Tools I use in production",
      title: "Tech Stack",
      note: "I group the technologies I use most often by the work they support instead of presenting every tool at the same level.",
      groups: {
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile",
        data: "Data & Infra",
        workflow: "Workflow",
      },
    },
    github: {
      eyebrow: "Selected open-source work",
      title: "GitHub",
      note: "A small selection of projects that show how I work outside the main production products above.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Have a project in mind? Let's talk.",
      note: "I usually reply within 24 hours.",
      ctaEmail: "Send an email",
    },
    footer: { email: "Email" },
  },
};
