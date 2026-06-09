import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Github,
  Mail,
  Rocket,
  Star,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

const profile = {
  name: "Sinan Mert Şener",
  email: "sinanmertsenerr@gmail.com",
  githubUser: "sinanmertsenerr",
  github: "https://github.com/sinanmertsenerr",
  cvUrl: "/sinan-mert-sener-cv.pdf",
};

const stageSections = [
  { id: "about", number: "1", label: "Hakkımda" },
  { id: "work", number: "2", label: "Projeler" },
  { id: "experience", number: "3", label: "Deneyim" },
  { id: "stack", number: "4", label: "Tech Stack" },
  { id: "contact", number: "5", label: "İletişim" },
] as const;

const stageSectionIds = stageSections.map((section) => section.id);

const aboutHighlights = [
  { label: "Şu an", value: "Performanz · Part-time Developer" },
  { label: "Odak", value: "Fullstack Development · Mobil" },
  { label: "Sahada", value: "3 ürün gerçek kullanıcıda" },
  { label: "Eğitim", value: "Bilgisayar Müh. · 2026" },
];

type FeaturedProject = {
  name: string;
  year: string;
  status: "Sahada" | "Geliştiriliyor";
  tagline: string;
  points: string[];
  stack: string[];
};

const featuredProjects: FeaturedProject[] = [
  {
    name: "NikiApp",
    year: "2025",
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
    status: "Sahada",
    tagline: "Yoklamadan aidata, spor okulunun tüm operasyonu tek modülde.",
    points: [
      "Antrenör yoklama alıyor, sporcunun katılımı izleniyor, muhasebe aidatı takip ediyor.",
      "Şirket bünyesinde tamamlandı, sahada kullanımda.",
    ],
    stack: ["React", "Nest.js", "PostgreSQL"],
  },
];

const experience = [
  {
    period: "May 2026 – Devam",
    role: "Software Engineer (Part-time)",
    org: "Performanz Arge ve Yazılım",
    summary:
      "Staj bitti, takımda kaldım: web ve mobilde uçtan uca ürün geliştirmeye devam ediyorum.",
  },
  {
    period: "Ağu 2025 – May 2026",
    role: "Software Engineer Intern",
    org: "Performanz Arge ve Yazılım",
    summary:
      "Web ve mobilde uçtan uca ürün geliştirme; Claude ile AI destekli geliştirme süreçleri.",
  },
  {
    period: "2024 – 2025",
    role: "Tanıtım Görevlisi (Part-time)",
    org: "İzmir Ekonomi Üniversitesi",
    summary:
      "Her gün farklı bir kitleye kampüs sunumu yaptım; iletişim kasım buradan geliyor.",
  },
  {
    period: "2021 – 2026",
    role: "Activity Committee Leader · Yönetim Kurulu",
    org: "ESTIEM",
    summary:
      "25+ ülkeden öğrencinin katıldığı uluslararası etkinlikler organize ettim.",
  },
  {
    period: "2019 – 2026",
    role: "Bilgisayar Mühendisliği Lisans",
    org: "İzmir Ekonomi Üniversitesi",
    summary: "2026'da mezun oluyorum.",
  },
];

const stackItems = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  },
  {
    name: ".NET",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Nest.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "Claude",
    icon: "https://cdn.simpleicons.org/claude/D97757",
  },
  {
    name: "Codex",
    icon: "https://api.iconify.design/simple-icons/openai.svg?color=%23f5f0e8",
  },
];

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
};

type PortfolioRepo = {
  id: string;
  displayName: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  updatedAt: string;
};

const languageColors: Record<string, string> = {
  TypeScript: "#4fb3ff",
  JavaScript: "#f5d04b",
  Python: "#7aa8ff",
  Java: "#d95d39",
  CSS: "#c084fc",
  HTML: "#f06a3d",
  Dart: "#12c7a5",
  "C#": "#9b7bff",
};

const REPO_CACHE_KEY = "portfolio-repos-v4";
const REPO_CACHE_TTL = 60 * 60 * 1000;

// Seritte SADECE bu repolar, bu sirayla gosterilir ("sahip/repo" formati).
// Private olan repo, public yapilana kadar sessizce atlanir.
const showcaseRepos = [
  "sinanmertsenerr/Performanz-Web-SistemTakipPlatformu",
  "sucreistaken/AIcelerate",
  "sinanmertsenerr/NikiApp",
  "moeanes/mobilegamedev",
  "sucreistaken/pdf-watermark-remover",
  "Fanakartal/se354-fall2526-project",
  "sinanmertsenerr/nodebb-plugin-recent-cards",
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

function App() {
  const prefersReducedMotion = useReducedMotion();
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [repos, setRepos] = useState<PortfolioRepo[]>([]);
  const [repoStatus, setRepoStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    const cached = readRepoCache();

    if (cached) {
      setRepos(cached);
      setRepoStatus("ready");
      return;
    }

    const controller = new AbortController();
    let isMounted = true;

    async function loadRepos() {
      try {
        const data = await fetchShowcaseRepos(controller.signal);
        const normalized = data.map(normalizeRepo);

        if (!isMounted) {
          return;
        }

        setRepos(normalized);
        setRepoStatus(normalized.length > 0 ? "ready" : "error");
        writeRepoCache(normalized);
      } catch (error) {
        if (!isMounted || controller.signal.aborted) {
          return;
        }

        setRepoStatus("error");
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-120px" },
      };

  return (
    <div className="app-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="stage-layout">
        <StageNav activeSection={activeSection} />

        <main className="stage-content">
          <motion.section
            className="stage-section about-section"
            id="about"
            aria-labelledby="about-title"
            variants={container}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
          >
            <motion.div className="about-copy" variants={container}>
              <motion.p className="eyebrow" variants={item}>
                Full Stack Developer · İzmir
              </motion.p>
              <motion.h1 id="about-title" variants={item}>
                <span className="hero-greeting">Merhaba, ben</span>
                {profile.name}
              </motion.h1>
              <motion.p className="about-lead" variants={item}>
                Daha okul bitmeden çalışmaya başladım: Performanz'a stajyer
                olarak girdim, şimdi part-time developer olarak devam
                ediyorum. En keyif aldığım kısım, bir fikrin gerçek insanların
                her gün kullandığı bir ürüne dönüşmesini görmek.
              </motion.p>

              <motion.div className="hero-actions" variants={item}>
                <a className="button button-primary" href="#work">
                  <Rocket size={18} aria-hidden="true" />
                  Projelere bak
                </a>
                <a className="button button-secondary" href={profile.cvUrl} download>
                  <Download size={18} aria-hidden="true" />
                  CV'yi indir
                </a>
              </motion.div>

              <motion.div className="hero-socials" variants={item}>
                <a
                  className="icon-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profilim"
                >
                  <Github size={18} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  className="icon-link"
                  href={`mailto:${profile.email}`}
                  aria-label="E-posta gönder"
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>E-posta</span>
                </a>
              </motion.div>

              <motion.div className="about-highlights" variants={container}>
                {aboutHighlights.map((highlight) => (
                  <motion.div
                    className="about-highlight"
                    key={highlight.label}
                    variants={item}
                  >
                    <span>{highlight.label}</span>
                    <strong>{highlight.value}</strong>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.figure className="portrait-card" variants={item}>
              <img src="/sinan-portrait.jpg" alt="Sinan Mert Şener portresi" />
            </motion.figure>
          </motion.section>

          <section
            className="stage-section work-section"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <p className="eyebrow">Sahada çalışan işler</p>
              <h2 id="work-title">Projeler</h2>
            </div>

            <motion.div className="featured-grid" variants={container} {...revealProps}>
              {featuredProjects.map((project) => (
                <motion.article
                  className="featured-card"
                  key={project.name}
                  variants={item}
                >
                  <div className="featured-top">
                    <span
                      className={`status-chip ${
                        project.status === "Sahada" ? "status-live" : "status-wip"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="featured-year">
                      <CalendarDays size={14} aria-hidden="true" />
                      {project.year}
                    </span>
                  </div>

                  <h3>{project.name}</h3>
                  <p className="featured-tagline">{project.tagline}</p>

                  <ul className="featured-points">
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <div className="tech-list">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <div className="repo-strip">
              <div className="repo-strip-head">
                <h3>GitHub'da daha fazlası</h3>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Tümünü gör
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              {repoStatus === "loading" && (
                <p className="repo-note">GitHub'dan yükleniyor…</p>
              )}

              {repoStatus === "error" && (
                <p className="repo-note">
                  Şu an GitHub'a ulaşılamıyor — projelerime{" "}
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    github.com/{profile.githubUser}
                  </a>{" "}
                  üzerinden bakabilirsin.
                </p>
              )}

              {repoStatus === "ready" && (
                <motion.div className="repo-grid" variants={container} {...revealProps}>
                  {repos.map((repo) => (
                    <motion.a
                      className="repo-card"
                      key={repo.id}
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      variants={item}
                    >
                      <div className="repo-card-head">
                        <h4>{repo.displayName}</h4>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </div>
                      <p>{repo.description}</p>
                      <div className="repo-meta">
                        <span>
                          <i
                            style={{
                              backgroundColor:
                                languageColors[repo.language] ?? "var(--teal)",
                            }}
                          />
                          {repo.language}
                        </span>
                        {repo.stars > 0 && (
                          <span>
                            <Star size={15} aria-hidden="true" />
                            {repo.stars}
                          </span>
                        )}
                        <span>
                          <CalendarDays size={15} aria-hidden="true" />
                          {formatDate(repo.updatedAt)}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          <section
            className="stage-section experience-section"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="section-heading">
              <p className="eyebrow">Yol haritası</p>
              <h2 id="experience-title">Deneyim</h2>
            </div>

            <motion.div className="timeline" variants={container} {...revealProps}>
              {experience.map((entry) => (
                <motion.div
                  className="timeline-item"
                  key={`${entry.org}-${entry.period}`}
                  variants={item}
                >
                  <span className="timeline-period">{entry.period}</span>
                  <div>
                    <h3>{entry.role}</h3>
                    <p className="timeline-org">{entry.org}</p>
                    <p className="timeline-summary">{entry.summary}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <motion.section
            className="stage-section stack-section"
            id="stack"
            aria-labelledby="stack-title"
            variants={container}
            {...revealProps}
          >
            <div className="section-heading">
              <p className="eyebrow">Her gün kullandıklarım</p>
              <h2 id="stack-title">Tech Stack</h2>
            </div>

            <motion.div className="stack-logo-grid" variants={container}>
              {stackItems.map((stackItem) => (
                <motion.article
                  className="stack-logo-card"
                  key={stackItem.name}
                  variants={item}
                >
                  <img src={stackItem.icon} alt="" loading="lazy" aria-hidden="true" />
                  <span>{stackItem.name}</span>
                </motion.article>
              ))}
            </motion.div>
          </motion.section>

          <section
            className="stage-section contact-section"
            id="contact"
            aria-labelledby="contact-title"
          >
            <p className="eyebrow">İletişim</p>
            <h2 id="contact-title">Aklında bir proje mi var? Konuşalım.</h2>
            <p className="contact-note">E-postana genelde 24 saat içinde dönerim.</p>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                E-posta gönder
              </a>
              <a
                className="button button-secondary"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} aria-hidden="true" />
                GitHub
              </a>
            </div>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </section>

          <footer className="site-footer">
            <span>
              © {new Date().getFullYear()} {profile.name} · İzmir
            </span>
            <div className="footer-links">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={`mailto:${profile.email}`}>E-posta</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function StageNav({ activeSection }: { activeSection: string }) {
  const activeIndex = stageSections.findIndex(
    (section) => section.id === activeSection,
  );

  return (
    <aside className="stage-nav" aria-label="Sayfa bölümleri">
      <div className="stage-list">
        {stageSections.map((section, index) => {
          const state =
            index === activeIndex
              ? "is-active"
              : index < activeIndex
                ? "is-passed"
                : "is-queued";

          return (
            <a className={`stage-link ${state}`} href={`#${section.id}`} key={section.id}>
              <span className="stage-number">{section.number}</span>
              <span className="stage-dash">-</span>
              <span>{section.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(stageSectionIds[0]);

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      // Sayfa dibine inildiyse son bolum kisa olsa bile aktif sayilmali;
      // %38 ankraj noktasi oraya hic ulasamayabiliyor.
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;

      if (scrolledToBottom) {
        setActiveSection(stageSectionIds[stageSectionIds.length - 1]);
        return;
      }

      const anchorY = window.innerHeight * 0.38;
      let closestSection = stageSectionIds[0];
      let closestDistance = Number.POSITIVE_INFINITY;

      stageSectionIds.forEach((id) => {
        const element = document.getElementById(id);

        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const isInside = rect.top <= anchorY && rect.bottom >= anchorY;
        const distance = isInside ? 0 : Math.abs(rect.top - anchorY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = id;
        }
      });

      setActiveSection(closestSection);
    }

    function handleScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return activeSection;
}

async function fetchShowcaseRepos(signal: AbortSignal) {
  const results = await Promise.all(
    showcaseRepos.map(async (slug) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${slug}`, {
          headers: { Accept: "application/vnd.github+json" },
          signal,
        });

        if (!response.ok) {
          return null;
        }

        return (await response.json()) as GithubRepo;
      } catch {
        return null;
      }
    }),
  );

  return results.filter((repo): repo is GithubRepo => repo !== null);
}

function normalizeRepo(repo: GithubRepo): PortfolioRepo {
  return {
    id: String(repo.id),
    displayName: toTitle(repo.name),
    description:
      repo.description?.trim() || "Bu proje için henüz bir açıklama eklenmemiş.",
    htmlUrl: repo.html_url,
    language: repo.language || "Diğer",
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at || repo.updated_at,
  };
}

function readRepoCache(): PortfolioRepo[] | null {
  try {
    const raw = sessionStorage.getItem(REPO_CACHE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as {
      savedAt: number;
      repos: PortfolioRepo[];
    };

    if (Date.now() - parsed.savedAt > REPO_CACHE_TTL) {
      return null;
    }

    return parsed.repos;
  } catch {
    return null;
  }
}

function writeRepoCache(repos: PortfolioRepo[]) {
  try {
    sessionStorage.setItem(
      REPO_CACHE_KEY,
      JSON.stringify({ savedAt: Date.now(), repos }),
    );
  } catch {
    // sessionStorage kapali (gizli mod vb.) — cache olmadan devam
  }
}

function toTitle(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default App;
