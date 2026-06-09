import {
  CalendarDays,
  Code2,
  ExternalLink,
  GitFork,
  Github,
  Mail,
  RefreshCw,
  Rocket,
  Search,
  Star,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const profile = {
  name: "Sinan Mert Şener",
  email: "sinanmertsenerr@gmail.com",
  githubUser: "sinanmertsenerr",
  github: "https://github.com/sinanmertsenerr",
  linkedin: "https://linkedin.com/in/sinanmertsenerr",
};

const stageSections = [
  { id: "about", number: "1", label: "Hakkımda" },
  { id: "work", number: "2", label: "Projeler" },
  { id: "stack", number: "3", label: "Tech Stacks" },
  { id: "contact", number: "4", label: "İletişim" },
] as const;

const stageSectionIds = stageSections.map((section) => section.id);

const aboutHighlights = [
  {
    label: "Rol",
    value: "Full Stack Developer",
  },
  {
    label: "Şu an",
    value: "Performanz'da Stajyer",
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
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  archived: boolean;
  fork: boolean;
};

type PortfolioRepo = {
  id: string;
  name: string;
  displayName: string;
  description: string;
  htmlUrl: string;
  homepageUrl: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
  source: "github" | "fallback";
};

const fallbackRepos: PortfolioRepo[] = [
  {
    id: "fallback-spor-okullari",
    name: "spor-okullari-yonetim",
    displayName: "Spor Okulları Yönetim Modülü",
    description:
      "Antrenör yoklaması, sporcu takibi ve aidat yönetimini tek modülde toplayan yönetim paneli.",
    htmlUrl: profile.github,
    homepageUrl: "",
    language: "TypeScript",
    topics: ["nestjs", "react", "postgresql"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-05-01T00:00:00Z",
    isArchived: false,
    isFork: false,
    source: "fallback",
  },
  {
    id: "fallback-sistem-takip",
    name: "sistem-takip-platformu",
    displayName: "Sistem Takip Platformu",
    description:
      "Stok, depo ve üretim süreçlerini tek panelden izleyen şirket içi takip platformu.",
    htmlUrl: profile.github,
    homepageUrl: "",
    language: "TypeScript",
    topics: ["nestjs", "react", "postgresql"],
    stars: 0,
    forks: 0,
    updatedAt: "2026-01-15T00:00:00Z",
    isArchived: false,
    isFork: false,
    source: "fallback",
  },
  {
    id: "fallback-nikiapp",
    name: "nikiapp",
    displayName: "NikiApp",
    description:
      "Bir kahve işletmesi için QR ile ödeme, kampanya ve sadakat sistemi sunan mobil uygulama.",
    htmlUrl: profile.github,
    homepageUrl: "",
    language: "TypeScript",
    topics: ["react-native", "nestjs", "postgresql"],
    stars: 0,
    forks: 0,
    updatedAt: "2025-09-20T00:00:00Z",
    isArchived: false,
    isFork: false,
    source: "fallback",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "#4fb3ff",
  JavaScript: "#f5d04b",
  React: "#12c7a5",
  Python: "#7aa8ff",
  Java: "#d95d39",
  CSS: "#c084fc",
  HTML: "#f06a3d",
  "Node.js": "#7ad66d",
};

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
  const [repos, setRepos] = useState<PortfolioRepo[]>(fallbackRepos);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [lastSync, setLastSync] = useState("");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("Tümü");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function loadRepos() {
      setStatus("loading");

      try {
        const data = await fetchAllRepos(controller.signal);
        const normalized = data
          .map(normalizeRepo)
          .sort((a, b) => {
            if (a.isArchived !== b.isArchived) {
              return a.isArchived ? 1 : -1;
            }

            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          });

        if (!isMounted) {
          return;
        }

        setRepos(normalized.length > 0 ? normalized : fallbackRepos);
        setStatus(normalized.length > 0 ? "ready" : "error");
        setLastSync(
          new Intl.DateTimeFormat("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date()),
        );
      } catch (error) {
        if (!isMounted || controller.signal.aborted) {
          return;
        }

        setRepos(fallbackRepos);
        setStatus("error");
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [reloadToken]);

  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-120px" },
      };

  const languages = useMemo(() => {
    const unique = new Set(
      repos.map((repo) => repo.language).filter((value) => value.length > 0),
    );

    return ["Tümü", ...Array.from(unique).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return repos.filter((repo) => {
      const matchesLanguage = language === "Tümü" || repo.language === language;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [repo.displayName, repo.description, repo.language, ...repo.topics]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesLanguage && matchesQuery;
    });
  }, [language, query, repos]);

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
                Kendimi tanıtayım
              </motion.p>
              <motion.h1 id="about-title" variants={item}>
                <span className="hero-greeting">Merhaba, ben</span>
                {profile.name}
              </motion.h1>
              <motion.p className="about-lead" variants={item}>
                Full Stack Developer'ım. .NET, React, React Native ve Nest.js
                ile web ve mobil ürünler geliştiriyorum. Şu an Performanz Arge
                ve Yazılım'da Software Engineer Intern olarak Claude ile proje
                geliştirme üzerine çalışıyorum. Temiz kod ve kullanıcı odaklı
                ürünlere önem veriyorum.
              </motion.p>

              <motion.div className="hero-actions" variants={item}>
                <a className="button button-primary" href="#work">
                  <Rocket size={18} aria-hidden="true" />
                  Projelere bak
                </a>
                <a className="button button-secondary" href={`mailto:${profile.email}`}>
                  <Mail size={18} aria-hidden="true" />
                  İletişime geç
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
            <div className="section-heading project-heading">
              <div>
                <p className="eyebrow">GitHub'dan canlı</p>
                <h2 id="work-title">Projeler</h2>
              </div>
              <div className={`sync-pill sync-${status}`}>
                <span aria-hidden="true" />
                {status === "loading" && "GitHub'dan okunuyor"}
                {status === "ready" &&
                  `${repos.length} repo${lastSync ? ` · ${lastSync}` : ""}`}
                {status === "error" && "Yedek veri"}
              </div>
            </div>

            <div className="project-tools" aria-label="Proje filtreleri">
              <label className="search-box">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  placeholder="Repo ara"
                  aria-label="Repo ara"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <label className="select-box">
                <span>Dil</span>
                <select
                  value={language}
                  aria-label="Programlama dili filtresi"
                  onChange={(event) => setLanguage(event.target.value)}
                >
                  {languages.map((languageOption) => (
                    <option key={languageOption} value={languageOption}>
                      {languageOption}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="icon-button"
                type="button"
                aria-label="GitHub projelerini yenile"
                onClick={() => setReloadToken((token) => token + 1)}
              >
                <RefreshCw size={18} aria-hidden="true" />
                <span role="tooltip">Yenile</span>
              </button>
            </div>

            <motion.div className="project-grid" variants={container} {...revealProps}>
              {filteredRepos.map((repo) => (
                <motion.article className="project-card" key={repo.id} variants={item}>
                  <ProjectPreview repo={repo} />

                  <div className="project-topline">
                    <span>{repo.source === "github" ? "GitHub" : "Yedek"}</span>
                    {repo.isFork && <span>Fork</span>}
                    {repo.isArchived && <span>Arşiv</span>}
                  </div>

                  <h3>{repo.displayName}</h3>
                  <p>{repo.description}</p>

                  <div className="repo-meta">
                    {repo.language && (
                      <span>
                        <i
                          style={{
                            backgroundColor:
                              languageColors[repo.language] ?? "var(--teal)",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span>
                      <Star size={15} aria-hidden="true" />
                      {repo.stars}
                    </span>
                    <span>
                      <GitFork size={15} aria-hidden="true" />
                      {repo.forks}
                    </span>
                    <span>
                      <CalendarDays size={15} aria-hidden="true" />
                      {formatDate(repo.updatedAt)}
                    </span>
                  </div>

                  {repo.topics.length > 0 && (
                    <div className="tech-list">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-actions">
                    <a className="text-link" href={repo.htmlUrl} target="_blank" rel="noreferrer">
                      Repo
                      <Github size={16} aria-hidden="true" />
                    </a>
                    {repo.homepageUrl && (
                      <a
                        className="text-link"
                        href={repo.homepageUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Canlı
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filteredRepos.length === 0 && (
              <div className="empty-state">
                <Code2 size={22} aria-hidden="true" />
                <p>Bu filtreyle repo bulunamadı.</p>
              </div>
            )}

            {filteredRepos.length > 0 && (
              <p className="repo-count">
                {filteredRepos.length} repo gösteriliyor. GitHub'a herkese açık
                eklediğin yeni projeler burada otomatik listelenir.
              </p>
            )}
          </section>

          <motion.section
            className="stage-section stack-section"
            id="stack"
            variants={container}
            {...revealProps}
          >
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
            <div>
              <p className="eyebrow">İletişim</p>
              <h2 id="contact-title">İş teklifleri ve proje fikirleri için.</h2>
            </div>
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
          </section>
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

async function fetchAllRepos(signal: AbortSignal) {
  const repos: GithubRepo[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?type=all&sort=pushed&per_page=100&page=${page}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal,
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub response ${response.status}`);
    }

    const data = (await response.json()) as GithubRepo[];
    repos.push(...data);

    if (data.length < 100) {
      return repos;
    }

    page += 1;
  }
}

function normalizeRepo(repo: GithubRepo): PortfolioRepo {
  const homepageUrl =
    repo.homepage && /^https?:\/\//i.test(repo.homepage) ? repo.homepage : "";

  return {
    id: String(repo.id),
    name: repo.name,
    displayName: toTitle(repo.name),
    description:
      repo.description?.trim() ||
      "Bu proje için henüz bir açıklama eklenmemiş.",
    htmlUrl: repo.html_url,
    homepageUrl,
    language: repo.language || "Diğer",
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at || repo.updated_at,
    isArchived: repo.archived,
    isFork: repo.fork,
    source: "github",
  };
}

function ProjectPreview({ repo }: { repo: PortfolioRepo }) {
  const fallbackImage = getRepoOpenGraphImage(repo);
  const previewImage = repo.homepageUrl
    ? getWebsiteScreenshotImage(repo.homepageUrl)
    : fallbackImage;

  return (
    <a
      className="project-preview"
      href={repo.homepageUrl || repo.htmlUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${repo.displayName} önizlemesini aç`}
    >
      <img
        src={previewImage}
        data-fallback={fallbackImage}
        alt={`${repo.displayName} önizleme görseli`}
        loading="lazy"
        onError={(event) => {
          const fallback = event.currentTarget.dataset.fallback;

          if (fallback && event.currentTarget.src !== fallback) {
            event.currentTarget.src = fallback;
          }
        }}
      />
      <span>{repo.homepageUrl ? "Canlı önizleme" : "Repo önizleme"}</span>
    </a>
  );
}

function getWebsiteScreenshotImage(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200`;
}

function getRepoOpenGraphImage(repo: PortfolioRepo) {
  const cacheKey = encodeURIComponent(`${repo.id}-${repo.updatedAt}`);

  return `https://opengraph.githubassets.com/${cacheKey}/${profile.githubUser}/${repo.name}`;
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
