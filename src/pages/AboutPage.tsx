import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import ResponsiveImage from "../components/common/ResponsiveImage";
import aboutBg from "../assets/hero-img/AboutHero.png";
import founderImg from "../assets/about-img/founder_MD.png";
import ourStoryImg from "../assets/about-img/OurStory.png";
import valuesImg from "../assets/about-img/OurValues.png";
import ScrollTimeline from "../components/common/ScrollTimeline";
import RadialCompanies from "../components/common/RadialCompanies";
import { companies } from "../data/companies";

const VALUES = [1, 2, 3, 4] as const;

const MILESTONES_DATA = [
  { yearKey: "aboutPage.milestone1Year", titleKey: "aboutPage.milestone1Title", bodyKey: "aboutPage.milestone1Body" },
  { yearKey: "aboutPage.milestone2Year", titleKey: "aboutPage.milestone2Title", bodyKey: "aboutPage.milestone2Body" },
  { yearKey: "aboutPage.milestone3Year", titleKey: "aboutPage.milestone3Title", bodyKey: "aboutPage.milestone3Body" },
  { yearKey: "aboutPage.milestone4Year", titleKey: "aboutPage.milestone4Title", bodyKey: "aboutPage.milestone4Body" },
  { yearKey: "aboutPage.milestone5Year", titleKey: "aboutPage.milestone5Title", bodyKey: "aboutPage.milestone5Body" },
  { yearKey: "aboutPage.milestone6Year", titleKey: "aboutPage.milestone6Title", bodyKey: "aboutPage.milestone6Body" },
];

const AboutPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`aboutPage.${path}`, { defaultValue: fallback });

  // Translate milestones data
  const translatedMilestones = MILESTONES_DATA.map((m) => ({
    year: tr(m.yearKey.replace('aboutPage.', ''), m.yearKey),
    title: tr(m.titleKey.replace('aboutPage.', ''), m.titleKey),
    body: tr(m.bodyKey.replace('aboutPage.', ''), m.bodyKey),
  }));

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: t("jsonLd.aboutName", "About Indexia Group"),
        url: "https://www.indexiagroup.com/about",
        description: t("jsonLd.aboutDescription", "Indexia Group is a diversified Indian business group spanning Finance, Export, Agriculture, Warehousing, Security, Advertising, and Athlete Support."),
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome", "Home"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbAbout", "About Us"), item: "https://www.indexiagroup.com/about" },
        ],
      },
    ],
  };

  return (
    <main className="site-shell">
      <SEO
        title={tr("title", "About Indexia Group")}
        description={tr("metaDescription", "About Indexia Group - diversified Indian business group")}
        keywords="About Indexia Group, Indian business group, diversified company, finance export agriculture security"
        canonicalPath="/about"
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <HeroBackdrop image={aboutBg}>
        <div className="hero-panel-glass relative mx-auto max-w-4xl px-5 py-9 text-center sm:px-10 sm:py-11">
        <div className="fade-up mb-4 flex items-center justify-center gap-3" style={{ animationDelay: "0.05s" } as CSSProperties}>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{tr("eyebrow", "About Us")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="fade-up font-display mx-auto mb-3 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white" style={{ animationDelay: "0.14s" } as CSSProperties}>
          {tr("titleStart", "Some steps to ")}<br />
          <span className="text-(--color-yellow)">{tr("titleAccent", "serve the nation")}</span>
        </h1>
        <p className="fade-up mx-auto mb-2 max-w-2xl font-ledger text-[11px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-(--color-yellow)/80" style={{ animationDelay: "0.23s" } as CSSProperties}>
          {tr("taglineSecondary", "Diverse Ventures. Unified Vision.")}
        </p>
        <p className="fade-up mx-auto max-w-2xl text-[12px] sm:text-sm leading-6 sm:leading-7 text-white/80" style={{ animationDelay: "0.32s" } as CSSProperties}>
          {tr("subtitle", "Diverse Ventures. Unified Vision.")}
        </p>
        </div>
      </HeroBackdrop>

      {/* Leadership */}
      <section className="section-ruled section-ink relative px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={0.1} amount={0.15} className="relative">
            <div className="flex flex-col items-center">
              <div className="relative flex items-end justify-center overflow-hidden z-10">
                <img
                  src={founderImg}
                  alt={tr("founderName", "Founder & Managing Director")}
                  width={500}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto object-contain object-bottom"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--color-ink-deep)/40 via-transparent to-transparent" />
              </div>
              <div className="w-full bg-(--color-navy-deep)/60 px-5 py-1 text-center backdrop-blur-md border border-t-0 border-white/10 rounded-b-2xl">
                <span className="font-display text-[13px] sm:text-sm font-bold text-white">
                  {tr("founderPersonName", "Bijendra Malik")}
                </span>
                <span className="block font-ledger text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-(--color-yellow)">
                  {tr("founderRole", "Founder & Managing Director")}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow color="var(--color-yellow)" className="mb-2">{tr("leaderEyebrow", "Leadership")}</Eyebrow>
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white">
                {tr("visionaryTitle", "The Visionary Behind")}<br />
                <span className="text-(--color-yellow)">{tr("visionaryAccent", "Indexia Group")}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-4 space-y-3">
                <p className="text-[13px] sm:text-[14px] leading-6 text-white/70">
                  {tr("founderBio1", "Visionary leader with decades of experience in building diversified businesses across India.")}
                </p>
                <p className="text-[13px] sm:text-[14px] leading-6 text-white/70">
                  {tr("founderBio2", "Committed to creating value through innovation, integrity, and sustainable growth.")}
                </p>
                <blockquote className="border-l-2 border-(--color-yellow)/50 pl-3 text-[13px] italic text-(--color-yellow)/80">
                  "{tr("founderQuote", "Our strength lies in our diverse portfolio and unwavering commitment to excellence.")}"
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-ruled section-paper relative px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal>
              <Eyebrow className="mb-2">{tr("storyEyebrow", "Our Story")}</Eyebrow>
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
                {tr("storyTitle", "From a Shared Vision to a National Group")}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-4 space-y-3 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-slate-600">
                <p>{tr("storyBody1", "From a small office in Mumbai, Indexia Group has grown into a diversified business conglomerate spanning multiple industries across India and beyond.")}</p>
                <p>{tr("storyBody2", "Today, we operate eight distinct companies, each contributing to the nation's economic growth while maintaining our core values of integrity, innovation, and excellence.")}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} amount={0.15}>
            <ResponsiveImage
              src={ourStoryImg}
              alt={tr("storyImageAlt", "Indexia Group founding story")}
              width={1200}
              height={500}
              className="w-full rounded-2xl object-cover shadow-lg media-polished"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative">
        {/* Full background image */}
        <div className="relative">
          <ResponsiveImage
            src={valuesImg}
            alt=""
            width={1200}
            height={500}
            className="w-full object-contain"
          />
        </div>

        {/* Cards, half on image, half below */}
        <div className="relative z-20 -mt-12 sm:-mt-16 mx-auto w-full max-w-6xl px-2 sm:px-3 lg:px-5">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {VALUES.map((i) => (
              <Reveal key={i} delay={(i - 1) * 0.06} amount={0.15}>
              <div className="card-premium card-premium-hover group rounded-2xl p-4 backdrop-blur-xl sm:p-5">
                  <span className="font-ledger text-lg font-bold text-(--color-teal)">
                    {String(i).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-[13px] sm:text-sm font-bold text-slate-800 leading-tight">
                    {tr(`value${i}Title`, "Integrity")}
                  </h3>
                  <p className="mt-1.5 text-[12px] sm:text-[13px] leading-5 text-slate-600 group-hover:text-slate-800">
                    {tr(`value${i}Body`, "Building trust through transparent business practices.")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Solid background for the lower half of cards */}
        <div className="bg-white h-16 sm:h-20" />
      </section>

      {/* Our Companies */}
      <div className="atlas-divider" />

      <section className="section-ruled section-paper relative overflow-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-2 sm:mb-4 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("companiesEyebrow", "Our Companies")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("companiesTitle", "Eight Businesses, One Vision")}
            </h2>
            <p className="mt-1 text-[13px] leading-5 sm:text-[14px] sm:leading-6 text-(--color-muted)">
              {tr("companiesSubtitle", "Eight companies united by a shared vision of growth and excellence.")}
            </p>
          </Reveal>

          <RadialCompanies />
        </div>
      </section>
      <div className="atlas-divider" />


      {/* Timeline */}
      <section className="section-ruled relative bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mx-auto mb-5 sm:mb-8 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("timelineEyebrow", "Our Journey")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("timelineTitle", "Key Milestones")}
            </h2>
          </Reveal>

          <ScrollTimeline milestones={translatedMilestones} />
        </div>
      </section>      {/* Registration & Compliance */}
      <section className="section-ruled section-ink relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Decorative glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-e-20 top-0 h-48 w-48 rounded-full bg-(--color-teal)/15 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -inset-s-20 bottom-0 h-40 w-40 rounded-full bg-(--color-yellow)/10 blur-[60px]" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-5 sm:mb-7 max-w-4xl text-center">
            <Eyebrow color="var(--color-yellow)" className="mb-2">{tr("registrationEyebrow", "Registration & Compliance")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white">
              {tr("registrationTitle", "Registered Entities")}</h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company, i) => {
              const entityName = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });
              // Companies with their own portal open externally, the rest link to their page on this site.
              const isExternal = Boolean(company.link);
              const cardBody = (
                <>
                  <h3 className="font-display text-[13px] sm:text-sm font-bold leading-snug text-white">{entityName}</h3>
                  <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-white/50">
                    <span>
                      <span className="font-semibold text-white/70">Est.:</span> {company.founded}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center text-(--color-yellow) transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      {isExternal ? <ExternalLink size={13} strokeWidth={2.5} /> : <ArrowUpRight size={13} strokeWidth={2.5} />}
                    </span>
                  </div>
                </>
              );
              const cardClasses =
                "group block h-full rounded-xl border border-white/15 bg-white/10 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15";
              return (
                <Reveal key={company.slug} delay={(i % 4) * 0.05} amount={0.15}>
                  {isExternal ? (
                    <a
                      href={company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("companyLinkCard.visitWebsiteAria", { name: entityName })}
                      className={cardClasses}
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <Link
                      to={`/${company.slug}`}
                      aria-label={t("companyLinkCard.visitPageAria", { name: entityName })}
                      className={cardClasses}
                    >
                      {cardBody}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} amount={0.15} className="mt-5 sm:mt-6 text-center">
            <a
              href="https://www.mca.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-5 py-2 text-[12px] font-bold text-(--color-yellow) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow)/20"
            >
              {tr("verifyOnMCA", "Verify on MCA Portal")}
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
