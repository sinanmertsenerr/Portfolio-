import {
  ArrowUpRight,
  Briefcase,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  FolderKanban,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  QrCode,
  ShieldCheck,
  Timer,
  UserRound,
  WifiOff,
} from "lucide-react";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { copy, selectedRepos, type Copy, type Lang, type Product } from "./content";

const profile = {
  name: "Sinan Mert Şener",
  email: "sinanmertsenerr@gmail.com",
  github: "https://github.com/sinanmertsenerr",
  linkedin: "https://www.linkedin.com/in/sinanmertsener/",
  cvUrl: "/sinan-mert-sener-cv.pdf",
};

const sections = [
  { id: "profile", icon: UserRound },
  { id: "products", icon: FolderKanban },
  { id: "experience", icon: BriefcaseBusiness },
  { id: "stack", icon: Code2 },
  { id: "contact", icon: Mail },
] as const;

type SectionId = (typeof sections)[number]["id"];

const sectionIds = sections.map((section) => section.id);
const railLinks = ["products", "experience", "stack", "contact"] as const;

const factIcons = [Briefcase, GraduationCap, Languages];
const highlightIcons = [QrCode, Timer, WifiOff, ShieldCheck];

const LANG_STORAGE_KEY = "portfolio-lang";

// Teknolojinin sahadaki (tamamen ya da kismen) kac urunde calistigi. ".NET 8" -> ".NET"
const fieldProducts = copy.tr.products.items.filter((product) => product.status !== "building");
const usage = fieldProducts.reduce<Record<string, number>>((counts, product) => {
  product.stack.forEach((tech) => {
    const key = tech.replace(/\s\d+$/, "");
    counts[key] = (counts[key] ?? 0) + 1;
  });
  return counts;
}, {});

function getInitialLang(): Lang {
  // ?lang=en ile paylasilan baglanti, kayitli secimin onune gecer
  const fromUrl = new URLSearchParams(window.location.search).get("lang");

  if (fromUrl === "tr" || fromUrl === "en") {
    return fromUrl;
  }

  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);

    if (saved === "tr" || saved === "en") {
      return saved;
    }
  } catch {
    // localStorage kapali (gizli mod vb.): tarayici diline gore devam
  }

  return navigator.language?.toLowerCase().startsWith("tr") ? "tr" : "en";
}

// "**...**" arasini kalin yazar; goz tarayan okurun yakalayacagi kelimeler
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const activeSection = useActiveSection();
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // localStorage kapali: secim sadece bu oturumda gecerli
    }
  }, [lang]);

  // Icerik JS ile ciziliyor; /#experience gibi baglantilar ilk yuklemede
  // hedefi bulamiyor. Cizimden sonra hedefe bir kez kaydir.
  useEffect(() => {
    const target = decodeURIComponent(window.location.hash.slice(1));

    if (target) {
      document.getElementById(target)?.scrollIntoView();
    }
  }, []);

  const langToggle = <LangToggle lang={lang} setLang={setLang} label={t.langLabel} />;

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <header className="mobile-top">
        <a className="mobile-name" href="#profile">
          {profile.name}
        </a>
        <div className="mobile-tools">
          {langToggle}
          <a className="button button-primary button-small" href={profile.cvUrl} download>
            <Download size={16} strokeWidth={2} aria-hidden="true" />
            {t.profile.cvShort}
          </a>
        </div>
      </header>

      <div className="layout">
        <aside className="rail" id="profile" aria-label={profile.name}>
          <div className="rail-card">
            <img
              className="portrait"
              src="/sinan-portrait-crop.webp"
              alt={t.profile.portraitAlt}
              width="480"
              height="600"
              fetchPriority="high"
              decoding="async"
            />

            <div className="rail-id">
              <h1>{profile.name}</h1>
              <p className="rail-role">{t.profile.role}</p>
              <p className="rail-status">{t.profile.status}</p>
            </div>

            <div className="rail-actions">
              <a className="button button-primary" href={profile.cvUrl} download>
                <Download size={18} strokeWidth={2} aria-hidden="true" />
                {t.profile.cv}
              </a>
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
                {t.profile.email}
              </a>
            </div>

            <nav className="rail-nav" aria-label={t.navLabel}>
              {railLinks.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {t.nav[id]}
                </a>
              ))}
            </nav>

            <div className="rail-foot">
              <span className="rail-links">
                <ExternalLink href={profile.linkedin} newTab={t.newTab}>
                  LinkedIn
                </ExternalLink>
                <ExternalLink href={profile.github} newTab={t.newTab}>
                  GitHub
                </ExternalLink>
              </span>
              <span className="rail-lang">{langToggle}</span>
            </div>
          </div>
        </aside>

        <main className="content" id="main">
          <section className="intro" aria-labelledby="intro-claim">
            <h2 className="claim" id="intro-claim">
              <span className="claim-main">{t.intro.claim}</span>
              <span className="claim-detail">{t.intro.claimDetail}</span>
            </h2>
            <p className="lead">
              <Rich text={t.intro.lead} />
            </p>
            <dl className="facts">
              {t.intro.facts.map((fact, index) => {
                const Icon = factIcons[index];

                return (
                  <div className="fact" key={fact.term}>
                    <dt>
                      <Icon className="fact-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                      {fact.term}
                    </dt>
                    <dd>{fact.detail}</dd>
                  </div>
                );
              })}
            </dl>
          </section>

          <Products t={t} lang={lang} />
          <Experience t={t} />
          <Stack t={t} />

          <section className="surface contact" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">{t.contact.title}</h2>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="contact-note">{t.contact.note}</p>
            <div className="contact-actions">
              <a className="button button-primary" href={profile.cvUrl} download>
                <Download size={18} strokeWidth={2} aria-hidden="true" />
                {t.profile.cv}
              </a>
              <a
                className="button button-secondary"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
                LinkedIn
                <span className="sr-only">{t.newTab}</span>
              </a>
              <a
                className="button button-secondary"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} strokeWidth={1.75} aria-hidden="true" />
                GitHub
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
          </section>

          <footer className="site-footer">
            <p>
              © {new Date().getFullYear()} {profile.name}, İzmir
            </p>
            <p>{t.footer.updated}</p>
          </footer>
        </main>
      </div>

      <MobileNav t={t} activeSection={activeSection} />
    </>
  );
}

function Products({ t, lang }: { t: Copy; lang: Lang }) {
  const [featured, ...others] = t.products.items;

  return (
    <section className="block products" id="products" aria-labelledby="products-title">
      <BlockHead id="products-title" title={t.products.title} note={t.products.note} />

      <article className="surface product is-featured" aria-labelledby="product-0">
        <StatusLine product={featured} t={t} />
        <h3 id="product-0">{featured.name}</h3>
        <p className="product-tagline">{featured.tagline}</p>

        <ul className="product-points">
          <li>
            <PointIcon />
            <span>
              <span className="sr-only">{t.products.roleLabel}: </span>
              <Rich text={featured.role} />
            </span>
          </li>
          {featured.result ? (
            <li>
              <PointIcon />
              <span>
                <span className="sr-only">{t.products.resultLabel}: </span>
                <Rich text={featured.result} />
              </span>
            </li>
          ) : null}
        </ul>

        <h4 className="sr-only">{t.products.featuredHighlightsLabel}</h4>
        <ul className="highlights">
          {t.products.featuredHighlights.map((highlight, index) => {
            const Icon = highlightIcons[index];

            return (
              <li key={highlight}>
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {highlight}
              </li>
            );
          })}
        </ul>

        <TechTags label={t.products.stackLabel} items={featured.stack} />
      </article>

      <ol className="product-list">
        {others.map((product, index) => (
          <li key={product.name}>
            <article className="surface product" aria-labelledby={`product-${index + 1}`}>
              <StatusLine product={product} t={t} />
              <h3 id={`product-${index + 1}`}>{product.name}</h3>
              <p className="product-tagline">{product.tagline}</p>
              <p className="product-role">
                <PointIcon />
                <span>
                  <span className="sr-only">{t.products.roleLabel}: </span>
                  <Rich text={product.role} />
                </span>
              </p>
              <TechTags label={t.products.stackLabel} items={product.stack} />
            </article>
          </li>
        ))}
      </ol>

      <div className="repos">
        <div className="repos-head">
          <h3>{t.products.githubTitle}</h3>
          <ExternalLink href={profile.github} newTab={t.newTab}>
            {t.products.githubAll}
          </ExternalLink>
        </div>
        <ul className="repo-list">
          {selectedRepos.map((repo) => (
            <li key={repo.name}>
              <a className="repo" href={repo.url} target="_blank" rel="noreferrer">
                <span className="repo-name">
                  {repo.name}
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="repo-desc">{repo.description[lang]}</span>
                <span className="sr-only">{t.newTab}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Urun kartlarinda "ne yaptim / sonuc" satirlarinin basindaki tik
function PointIcon() {
  return <Check className="point-icon" size={18} strokeWidth={2.5} aria-hidden="true" />;
}

function StatusLine({ product, t }: { product: Product; t: Copy }) {
  return (
    <p className="status-line">
      <span className={`status status-${product.status}`}>{t.statusLabels[product.status]}</span>
      <span className="status-years">{product.years}</span>
    </p>
  );
}

function TechTags({ label, items }: { label: string; items: string[] }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function BlockHead({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <div className="block-head">
      <h2 id={id}>{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function Experience({ t }: { t: Copy }) {
  return (
    <section className="block experience" id="experience" aria-labelledby="experience-title">
      <BlockHead id="experience-title" title={t.experience.title} note={t.experience.note} />

      <dl className="figures">
        {t.experience.figures.map((figure) => (
          <div className="figure" key={figure.label}>
            <dt>{figure.label}</dt>
            <dd>{"months" in figure ? t.formatDuration(figure.months) : figure.value}</dd>
          </div>
        ))}
      </dl>

      <ol className="roles">
        {t.experience.roles.map((role) => (
          <li className="role" key={role.title}>
            <div className="role-head">
              <h3>{role.title}</h3>
              {role.months ? (
                <span className="role-duration">{t.formatDuration(role.months)}</span>
              ) : null}
            </div>
            <p className="role-meta">
              {role.org}
              <span className="role-period">{role.period}</span>
            </p>
            {role.note ? (
              <p className="role-note">
                <Rich text={role.note} />
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Stack({ t }: { t: Copy }) {
  return (
    <section className="block stack" id="stack" aria-labelledby="stack-title">
      <BlockHead id="stack-title" title={t.stack.title} note={t.stack.note} />

      <dl className="stack-table">
        {t.stack.groups.map((group) => (
          <div className="stack-row" key={group.name}>
            <dt>{group.name}</dt>
            <dd>
              <ul className="tags">
                {group.items.map((item) => {
                  const count = usage[item];

                  return (
                    <li key={item}>
                      {item}
                      {count ? (
                        <span className="tag-count">
                          <span aria-hidden="true">{count}</span>
                          <span className="sr-only">, {t.stack.countLabel(count)}</span>
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function LangToggle({
  lang,
  setLang,
  label,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  label: string;
}) {
  return (
    <span className="lang-toggle" role="group" aria-label={label}>
      <button type="button" aria-pressed={lang === "tr"} onClick={() => setLang("tr")}>
        TR
      </button>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
    </span>
  );
}

function ExternalLink({
  href,
  newTab,
  children,
}: {
  href: string;
  newTab: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only">{newTab}</span>
    </a>
  );
}

function MobileNav({ t, activeSection }: { t: Copy; activeSection: SectionId }) {
  return (
    <nav className="mobile-nav" aria-label={t.navLabel}>
      <ul>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "location" : undefined}
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>{t.mobileNav[section.id]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  useEffect(() => {
    let frame = 0;

    function update() {
      // Sayfa dibine inildiyse son bolum kisa olsa da aktif sayilir
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (atBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const anchor = window.innerHeight * 0.35;
      let current: SectionId = sectionIds[0];

      // Masaustunde profil paneli yapiskan; sirali bolumlerden en son gecilen kazanir
      sectionIds.slice(1).forEach((id) => {
        const element = document.getElementById(id);

        if (element && element.getBoundingClientRect().top <= anchor) {
          current = id;
        }
      });

      setActiveSection(current);
    }

    function handleScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    }

    update();
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
