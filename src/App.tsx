import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Github,
  Linkedin,
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
import { copy, type Copy, type Lang } from "./content";

const profile = {
  name: "Sinan Mert Şener",
  email: "sinanmertsenerr@gmail.com",
  githubUser: "sinanmertsenerr",
  github: "https://github.com/sinanmertsenerr",
  linkedin: "https://www.linkedin.com/in/sinanmertsener/",
  cvUrl: "/sinan-mert-sener-cv.pdf",
};

const stageSections = [
  { id: "about", number: "1" },
  { id: "work", number: "2" },
  { id: "experience", number: "3" },
  { id: "stack", number: "4" },
  { id: "contact", number: "5" },
] as const;

const stageSectionIds = stageSections.map((section) => section.id);

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

const REPO_CACHE_KEY = "portfolio-repos-v6";
const REPO_CACHE_TTL = 60 * 60 * 1000;
const LANG_STORAGE_KEY = "portfolio-lang";

// Seritte SADECE bu repolar, bu sirayla gosterilir ("sahip/repo" formati).
// Private olan repo, public yapilana kadar sessizce atlanir.
const showcaseRepos = [
  "sinanmertsenerr/Performanz-Web-SistemTakipPlatformu",
  "sinanmertsenerr/DynamicIsland",
  "sinanmertsenerr/Duesday",
  "sinanmertsenerr/duesday-data",
  "sucreistaken/AIcelerate",
  "sinanmertsenerr/NikiApp",
  "sinanmertsenerr/SE380PTAssistant",
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

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);

    if (saved === "tr" || saved === "en") {
      return saved;
    }
  } catch {
    // localStorage kapali (gizli mod vb.) — tarayici diline gore devam
  }

  return navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en";
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [repos, setRepos] = useState<PortfolioRepo[]>([]);
  const [repoStatus, setRepoStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage kapali — secim sadece bu oturumda gecerli kalir
    }
  }, [lang]);

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

      <div className="lang-toggle" role="group" aria-label={t.langAria}>
        <button
          type="button"
          className={lang === "tr" ? "is-active" : ""}
          aria-pressed={lang === "tr"}
          onClick={() => setLang("tr")}
        >
          TR
        </button>
        <button
          type="button"
          className={lang === "en" ? "is-active" : ""}
          aria-pressed={lang === "en"}
          onClick={() => setLang("en")}
        >
          EN
        </button>
      </div>

      <div className="stage-layout">
        <StageNav activeSection={activeSection} t={t} />

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
                {t.hero.eyebrow}
              </motion.p>
              <motion.h1 id="about-title" variants={item}>
                <span className="hero-greeting">{t.hero.greeting}</span>
                {profile.name}
              </motion.h1>
              <motion.p className="about-lead" variants={item}>
                {t.hero.lead}
              </motion.p>

              <motion.div className="hero-actions" variants={item}>
                <a className="button button-primary" href="#work">
                  <Rocket size={18} aria-hidden="true" />
                  {t.hero.ctaProjects}
                </a>
                <a className="button button-secondary" href={profile.cvUrl} download>
                  <Download size={18} aria-hidden="true" />
                  {t.hero.ctaCv}
                </a>
              </motion.div>

              <motion.div className="hero-socials" variants={item}>
                <a
                  className="icon-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.hero.tooltipGithub}
                >
                  <Github size={18} aria-hidden="true" />
                  <span>{t.hero.tooltipGithub}</span>
                </a>
                <a
                  className="icon-link"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.hero.tooltipLinkedin}
                >
                  <Linkedin size={18} aria-hidden="true" />
                  <span>{t.hero.tooltipLinkedin}</span>
                </a>
                <a
                  className="icon-link"
                  href={`mailto:${profile.email}`}
                  aria-label={t.hero.tooltipEmail}
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>{t.hero.tooltipEmail}</span>
                </a>
              </motion.div>

              <motion.div className="about-highlights" variants={container}>
                {t.highlights.map((highlight, index) => (
                  <motion.div
                    className="about-highlight"
                    key={index}
                    variants={item}
                  >
                    <span>{highlight.label}</span>
                    <strong>{highlight.value}</strong>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.figure className="portrait-card" variants={item}>
              <img src="/sinan-portrait.jpg" alt={t.hero.portraitAlt} />
            </motion.figure>
          </motion.section>

          <section
            className="stage-section work-section"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <p className="eyebrow">{t.work.eyebrow}</p>
              <h2 id="work-title">{t.work.title}</h2>
            </div>

            <motion.div className="featured-grid" variants={container} {...revealProps}>
              {t.featuredProjects.map((project, index) => (
                <motion.article
                  className="featured-card"
                  key={index}
                  variants={item}
                >
                  <div className="featured-top">
                    <span
                      className={`status-chip ${
                        project.live ? "status-live" : "status-wip"
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
                    {project.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
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
                <h3>{t.repos.heading}</h3>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.repos.viewAll}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>

              {repoStatus === "loading" && (
                <p className="repo-note">{t.repos.loading}</p>
              )}

              {repoStatus === "error" && (
                <p className="repo-note">
                  {t.repos.errorPrefix}
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    github.com/{profile.githubUser}
                  </a>
                  {t.repos.errorSuffix}
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
                      <p>{repo.description || t.repos.noDescription}</p>
                      <div className="repo-meta">
                        <span>
                          <i
                            style={{
                              backgroundColor:
                                languageColors[repo.language] ?? "var(--teal)",
                            }}
                          />
                          {repo.language || t.repos.otherLanguage}
                        </span>
                        {repo.stars > 0 && (
                          <span>
                            <Star size={15} aria-hidden="true" />
                            {repo.stars}
                          </span>
                        )}
                        <span>
                          <CalendarDays size={15} aria-hidden="true" />
                          {formatDate(repo.updatedAt, lang)}
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
              <p className="eyebrow">{t.experience.eyebrow}</p>
              <h2 id="experience-title">{t.experience.title}</h2>
            </div>

            <motion.div className="timeline" variants={container} {...revealProps}>
              {t.experience.entries.map((entry, index) => (
                <motion.div
                  className="timeline-item"
                  key={index}
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
              <p className="eyebrow">{t.stack.eyebrow}</p>
              <h2 id="stack-title">{t.stack.title}</h2>
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
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p className="contact-note">{t.contact.note}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" />
                {t.contact.ctaEmail}
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
              <a
                className="button button-secondary"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} aria-hidden="true" />
                LinkedIn
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
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>{t.footer.email}</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

function StageNav({ activeSection, t }: { activeSection: string; t: Copy }) {
  const activeIndex = stageSections.findIndex(
    (section) => section.id === activeSection,
  );

  return (
    <aside className="stage-nav" aria-label={t.navAria}>
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
              <span>{t.nav[section.id]}</span>
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
    description: repo.description?.trim() ?? "",
    htmlUrl: repo.html_url,
    language: repo.language ?? "",
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

function formatDate(value: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default App;
