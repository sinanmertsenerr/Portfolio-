import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  Database,
  Download,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Github,
  LayoutDashboard,
  Linkedin,
  Mail,
  QrCode,
  Rocket,
  Server,
  Smartphone,
  Timer,
  UserRound,
  Workflow,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import { copy, type Copy, type Lang } from "./content";

const profile = {
  name: "Sinan Mert Şener",
  email: "sinanmertsenerr@gmail.com",
  github: "https://github.com/sinanmertsenerr",
  linkedin: "https://www.linkedin.com/in/sinanmertsener/",
  cvUrl: "/sinan-mert-sener-cv.pdf",
};

const stageSections = [
  { id: "about", number: "1" },
  { id: "work", number: "2" },
  { id: "experience", number: "3" },
  { id: "stack", number: "4" },
  { id: "github", number: "5" },
  { id: "contact", number: "6" },
] as const;

const stageSectionIds = stageSections.map((section) => section.id);
type StageSectionId = (typeof stageSections)[number]["id"];

const stageIcons: Record<StageSectionId, typeof Code2> = {
  about: UserRound,
  work: FolderKanban,
  experience: BriefcaseBusiness,
  stack: Code2,
  github: Github,
  contact: Mail,
};

type StackGroupKey = keyof Copy["stack"]["groups"];

const stackGroups: Array<{
  key: StackGroupKey;
  icon: typeof Code2;
  items: string[];
  size: "wide" | "regular" | "full";
}> = [
  {
    key: "frontend",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    size: "wide",
  },
  {
    key: "backend",
    icon: Server,
    items: ["Nest.js", "Node.js", ".NET", "FastAPI"],
    size: "regular",
  },
  {
    key: "mobile",
    icon: Smartphone,
    items: ["React Native", "Swift", "Flutter"],
    size: "regular",
  },
  {
    key: "data",
    icon: Database,
    items: ["PostgreSQL", "Redis", "Docker", "Firebase", "Cloudflare"],
    size: "wide",
  },
  {
    key: "workflow",
    icon: Workflow,
    items: ["Git", "GitHub Actions", "Prisma", "Claude", "Codex"],
    size: "full",
  },
];

type SelectedRepo = {
  id: string;
  displayName: string;
  description: Record<Lang, string>;
  htmlUrl: string;
  label: string;
};

const LANG_STORAGE_KEY = "portfolio-lang";

const flowIcons = [FileText, QrCode, Timer, Smartphone, LayoutDashboard];

// Teknolojinin sahadaki (live) kac urunde gectigi (".NET 8" -> ".NET")
const stackUsage = copy.tr.featuredProjects
  .filter((project) => project.live)
  .reduce<Record<string, number>>((usage, project) => {
    project.stack.forEach((tech) => {
      const key = tech.replace(/\s\d+$/, "");
      usage[key] = (usage[key] ?? 0) + 1;
    });
    return usage;
  }, {});

const maxStackUsage = Math.max(...Object.values(stackUsage));

const selectedRepos: SelectedRepo[] = [
  {
    id: "sucreistaken/AIcelerate",
    displayName: "AIcelerate",
    htmlUrl: "https://github.com/sucreistaken/AIcelerate",
    label: "Realtime · AI",
    description: {
      tr: "AI transkripsiyonlu, gerçek zamanlı ortak çalışma ve çalışma platformu.",
      en: "Real-time collaborative study platform with AI transcription.",
    },
  },
  {
    id: "sucreistaken/pdf-watermark-remover",
    displayName: "PDF Watermark Remover",
    htmlUrl: "https://github.com/sucreistaken/pdf-watermark-remover",
    label: "Computer Vision",
    description: {
      tr: "SIFT özellik eşleme ve OpenCV inpainting ile PDF'lerde tekrar eden logo ve filigranları tespit edip kaldıran araç.",
      en: "Detects and removes recurring PDF logos and watermarks with SIFT feature matching and OpenCV inpainting.",
    },
  },
  {
    id: "sinanmertsenerr/nodebb-plugin-recent-cards",
    displayName: "NodeBB Recent Cards",
    htmlUrl: "https://github.com/sinanmertsenerr/nodebb-plugin-recent-cards",
    label: "NodeBB Plugin",
    description: {
      tr: "NodeBB için son içerikleri kart formatında sunan açık kaynak eklenti.",
      en: "Open-source NodeBB plugin that presents recent content in a card-based layout.",
    },
  },
  {
    id: "sinanmertsenerr/SE380PTAssistant",
    displayName: "SE380 PT Assistant",
    htmlUrl: "https://github.com/sinanmertsenerr/SE380PTAssistant",
    label: "AI Fitness",
    description: {
      tr: "Yapay zekâ desteğiyle kişisel antrenör deneyimi sunan uygulama projesi.",
      en: "Application project for an AI-assisted personal trainer experience.",
    },
  },
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

function handleSpotlight(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  event.currentTarget.style.setProperty("--mx", `${x}%`);
  event.currentTarget.style.setProperty("--my", `${y}%`);
}

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
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const progressScaleX = prefersReducedMotion ? scrollYProgress : springScaleX;
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage kapali — secim sadece bu oturumda gecerli kalir
    }
  }, [lang]);

  const revealProps = prefersReducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-120px" },
      };

  const flagshipProject = t.featuredProjects[0];
  const supportingProjects = t.featuredProjects.slice(1);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {lang === "tr" ? "İçeriğe geç" : "Skip to content"}
      </a>
      <motion.div className="scroll-progress" style={{ scaleX: progressScaleX }} aria-hidden="true" />

      <div className="top-tools">
      <a className="cv-quick" href={profile.cvUrl} download aria-label={t.hero.ctaCv}>
        <Download size={16} aria-hidden="true" />
        CV
      </a>
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
      </div>

      <div className="stage-layout">
        <StageNav activeSection={activeSection} t={t} />

        <main className="stage-content" id="main-content">
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
              <motion.p className="hero-headline" variants={item}>
                {t.hero.headline.before}
                <mark>{t.hero.headline.mark}</mark>
                {t.hero.headline.after}
              </motion.p>
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
                {t.highlights.map((highlight) => (
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
              <img
                src="/sinan-portrait.jpg"
                alt={t.hero.portraitAlt}
                width="1200"
                height="1600"
                fetchPriority="high"
                decoding="async"
              />
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

            <motion.article
              className="flagship-card spotlight-card"
              variants={item}
              onPointerMove={handleSpotlight}
              {...revealProps}
            >
              <div className="flagship-copy">
                <div className="flagship-heading-row">
                  <div>
                    <p className="flagship-eyebrow">{t.flagship.eyebrow}</p>
                    <h3>{flagshipProject.name}</h3>
                  </div>
                  <div className="flagship-meta">
                    <span
                      className={`status-chip ${
                        flagshipProject.live ? "status-live" : "status-wip"
                      }`}
                    >
                      {flagshipProject.status}
                    </span>
                    <span className="featured-year">
                      <CalendarDays size={14} aria-hidden="true" />
                      {flagshipProject.year}
                    </span>
                  </div>
                </div>

                <p className="flagship-tagline">{flagshipProject.tagline}</p>

                <div className="flagship-proof-grid">
                  <div className="flagship-proof">
                    <span>{t.flagship.impactLabel}</span>
                    <strong>{flagshipProject.impact}</strong>
                  </div>
                  <div className="flagship-proof">
                    <span>{t.flagship.roleLabel}</span>
                    <strong>{flagshipProject.role}</strong>
                  </div>
                </div>

                <div className="flagship-details">
                  <span>{t.flagship.detailsLabel}</span>
                  <ul className="featured-points">
                    {flagshipProject.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="tech-list">
                  {flagshipProject.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <details className="mobile-evidence">
                  <summary>
                    {lang === "tr" ? "Teknik detayları göster" : "Show technical details"}
                  </summary>
                  <ul className="featured-points">
                    {flagshipProject.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </details>
              </div>

              <div className="flagship-visual">
                <div className="system-window">
                  <div className="system-window-bar" aria-hidden="true">
                    <div className="window-dots"><i /><i /><i /></div>
                    <span>{lang === "tr" ? "Saha operasyon akışı" : "Field operations flow"}</span>
                    <span className="live-pulse">LIVE</span>
                  </div>
                  <div className="flow-body">
                    <p className="flow-title">{t.flagship.flowTitle}</p>
                    <ol className="flow-list">
                      <li className="flow-rail" aria-hidden="true"><i /></li>
                      {t.flagship.flowSteps.map((step, index) => {
                        const FlowIcon = flowIcons[index];

                        return (
                          <li className={`flow-step flow-step-${index}`} key={step.name}>
                            <span className="flow-icon">
                              <FlowIcon size={20} aria-hidden="true" />
                            </span>
                            <div>
                              <span className="flow-no">0{index + 1}</span>
                              <strong>{step.name}</strong>
                              <small>{step.text}</small>
                            </div>
                            {index === 3 ? (
                              <span className="flow-sync">
                                <b className="is-off">{t.flagship.flowOffline}</b>
                                <b className="is-on">{t.flagship.flowSynced}</b>
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ol>
                    <p className="flow-note">{t.flagship.flowNote}</p>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.div
              className="featured-grid project-bento"
              variants={container}
              role="region"
              aria-label={lang === "tr" ? "Diğer projeler, yatay kaydırılabilir liste" : "Other projects, horizontally scrollable list"}
              tabIndex={0}
              {...revealProps}
            >
              {supportingProjects.map((project, index) => (
                <motion.article
                  className={`featured-card project-card spotlight-card project-card-${index + 1}`}
                  key={project.name}
                  variants={item}
                  onPointerMove={handleSpotlight}
                >
                  <span className="project-index" aria-hidden="true">0{index + 2}</span>
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
                  <p className="project-impact">{project.impact}</p>

                  <ul className="featured-points">
                    <li>{project.role}</li>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>

                  <div className="tech-list">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <details className="mobile-evidence project-mobile-evidence">
                    <summary>{lang === "tr" ? "Detaylar" : "Details"}</summary>
                    <ul className="featured-points">
                      <li>{project.role}</li>
                      {project.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </details>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section
            className="stage-section experience-section"
            id="experience"
            aria-labelledby="experience-title"
          >
            <div className="experience-layout">
              <motion.div className="experience-sticky" variants={item} {...revealProps}>
                <p className="eyebrow">{t.experience.eyebrow}</p>
                <h2 id="experience-title">{t.experience.title}</h2>
                <div className="experience-range">
                  <span>{t.experience.rangeLabel}</span>
                  <strong>{t.experience.range}</strong>
                </div>
                <p className="experience-note">{t.experience.note}</p>
              </motion.div>

              <motion.div className="timeline editorial-timeline" variants={container} {...revealProps}>
                {t.experience.entries.map((entry, index) => (
                  <motion.article
                    className={`timeline-item ${index === t.experience.entries.length - 1 ? "is-education" : ""}`}
                    key={`${entry.period}-${entry.role}`}
                    variants={item}
                  >
                    <span className="timeline-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="timeline-content">
                      <span className="timeline-period">{entry.period}</span>
                      <h3>{entry.role}</h3>
                      <p className="timeline-org">{entry.org}</p>
                      <p className="timeline-summary">{entry.summary}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
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
              <p className="section-note">{t.stack.note}</p>
            </div>

            <motion.div
              className="stack-group-grid stack-bento"
              variants={container}
              role="region"
              aria-label={lang === "tr" ? "Teknoloji grupları, yatay kaydırılabilir liste" : "Technology groups, horizontally scrollable list"}
              tabIndex={0}
            >
              {stackGroups.map((group, index) => {
                const Icon = group.icon;

                return (
                <motion.article
                  className={`stack-group-card spotlight-card stack-${group.key} stack-size-${group.size}`}
                  key={group.key}
                  variants={item}
                  onPointerMove={handleSpotlight}
                >
                  <div className="stack-card-top">
                    <div className="stack-group-heading">
                      <Icon size={22} aria-hidden="true" />
                      <h3>{t.stack.groups[group.key]}</h3>
                    </div>
                    <span className="stack-index" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <p className="stack-group-summary">{t.stack.summaries[group.key]}</p>
                  <div className="stack-pill-list">
                    {group.items.map((stackItem) => (
                      <span key={stackItem}>
                        {stackItem}
                        {stackUsage[stackItem] ? (
                          <sup title={`${t.stack.usageLabel}: ${stackUsage[stackItem]}`}>
                            {stackUsage[stackItem]}
                          </sup>
                        ) : null}
                      </span>
                    ))}
                  </div>
                </motion.article>
                );
              })}
            </motion.div>
            <p className="stack-footnote">
              <sup>1–{maxStackUsage}</sup> {t.stack.footnote}
            </p>
          </motion.section>

          <section
            className="stage-section github-section"
            id="github"
            aria-labelledby="github-title"
          >
            <div className="section-heading section-heading-with-action">
              <div>
                <p className="eyebrow">{t.github.eyebrow}</p>
                <h2 id="github-title">{t.github.title}</h2>
                <p className="section-note">{t.github.note}</p>
              </div>
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

            <motion.div
              className="repo-grid github-rail"
              variants={container}
              role="region"
              aria-label={lang === "tr" ? "Seçilmiş GitHub projeleri" : "Selected GitHub projects"}
              tabIndex={0}
              {...revealProps}
            >
              {selectedRepos.map((repo, index) => (
                <motion.a
                  className="repo-card spotlight-card"
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  variants={item}
                  onPointerMove={handleSpotlight}
                >
                  <span className="repo-index" aria-hidden="true">0{index + 1}</span>
                  <div className="repo-card-head">
                    <h3>{repo.displayName}</h3>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                  <p>{repo.description[lang]}</p>
                  <div className="repo-meta">
                    <span>{repo.label}</span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </section>

          <section
            className="stage-section contact-section cinematic-contact"
            id="contact"
            aria-labelledby="contact-title"
          >
            <div className="contact-copy">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
              <p className="contact-note">{t.contact.note}</p>
            </div>
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
    <nav className="stage-nav" aria-label={t.navAria}>
      <div className="stage-list">
        {stageSections.map((section, index) => {
          const Icon = stageIcons[section.id];
          const state =
            index === activeIndex
              ? "is-active"
              : index < activeIndex
                ? "is-passed"
                : "is-queued";

          return (
            <a
              className={`stage-link ${state}`}
              href={`#${section.id}`}
              key={section.id}
              aria-current={state === "is-active" ? "location" : undefined}
            >
              <Icon className="stage-icon" size={17} aria-hidden="true" />
              <span className="stage-number">{section.number}</span>
              <span className="stage-dash">-</span>
              <span className="stage-label stage-label-desktop">{t.nav[section.id]}</span>
              <span className="stage-label stage-label-mobile">{t.mobileNav[section.id]}</span>
            </a>
          );
        })}
      </div>
    </nav>
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

export default App;
