import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import ResponsiveImage from "../components/common/ResponsiveImage";
import { colors } from "../lib/theme";
import { companyImages } from "../data/companyImages";
import aboutBg from "../assets/hero-img/AboutHero.png";
import founderImg from "../assets/about-img/founder_MD.png";
import ourStoryImg from "../assets/about-img/OurStory.png";
import valuesImg from "../assets/about-img/OurValues.png";

const VALUES = [1, 2, 3, 4] as const;
const MILESTONES = [1, 2, 3, 4, 5] as const;

const COMPANY_LEFT = [
  { slug: "finance", tag: "c1Tag", tagDefault: "Multinational Fintech", name: "c1Name", nameDefault: "Indexia Finance", color: colors.teal },
  { slug: "finserve", tag: "c2Tag", tagDefault: "Lending Arm", name: "c2Name", nameDefault: "Indexia Finserve", color: colors.yellow },
  { slug: "overseas", tag: "c3Tag", tagDefault: "Global Export", name: "c3Name", nameDefault: "Indexia Overseas", color: colors.gray },
  { slug: "agro-bio", tag: "c4Tag", tagDefault: "Organic Agriculture", name: "c4Name", nameDefault: "Indexia Agro Bio", color: colors.yellow },
] as const;

const COMPANY_RIGHT = [
  { slug: "securities", tag: "c5Tag", tagDefault: "Armed Protection", name: "c5Name", nameDefault: "Indexia Securities", color: colors.navy },
  { slug: "warehouse", tag: "c6Tag", tagDefault: "Strategic Land", name: "c6Name", nameDefault: "Indexia Warehouse", color: colors.teal },
  { slug: "advertising", tag: "c7Tag", tagDefault: "Highway Advertising", name: "c7Name", nameDefault: "Indexia Advertising", color: colors.gray },
  { slug: "foundation", tag: "c8Tag", tagDefault: "Social Impact", name: "c8Name", nameDefault: "Indexia Foundation", color: colors.tealDeep },
] as const;

type CompanyEntry = { slug: string; tag: string; tagDefault: string; name: string; nameDefault: string; color: string };

const CompanyNode = ({ c, side, tr }: { c: CompanyEntry; side: "left" | "right"; tr: (p: string, f: string) => string }) => {
  const [open, setOpen] = useState(false);
  const tag = tr(`pageContent.companies.${c.slug}.${c.tag}`, c.tagDefault);
  const name = tr(`pageContent.companies.${c.slug}.${c.name}`, c.nameDefault);
  return (
    <div className={`group relative flex items-center gap-3 ${side === "right" ? "flex-row-reverse" : ""}`}>
      {/* Dotted connector line */}
      <div className={`h-px flex-1 border-t border-dashed border-slate-300 transition-colors duration-300 group-hover:border-(--color-teal) ${side === "right" ? "origin-left" : "origin-right"}`} />
      {/* Image node */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative z-10 h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-(--color-yellow)/50 focus:outline-none focus:ring-2 focus:ring-(--color-teal)/40"
      >
        <img src={companyImages[c.slug]} alt={name} className="h-full w-full object-cover" />
      </button>
      {/* Hover detail card */}
      {open && (
        <div className={`absolute z-30 w-56 rounded-xl border border-slate-100 bg-white p-3 shadow-xl ${side === "left" ? "left-20" : "right-20"}`}>
          <span className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: `${c.color}18`, color: c.color }}>
            {tag}
          </span>
          <Link to={`/businesses/${c.slug}`} className="mt-1.5 block font-display text-sm font-bold text-slate-900 hover:text-(--color-teal)">
            {name}
          </Link>
          <p className="mt-1 text-[11px] leading-4 text-slate-500">Eight businesses under one vision</p>
          <Link to={`/businesses/${c.slug}`} className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-(--color-teal)">Learn More →</Link>
        </div>
      )}
    </div>
  );
};

const MobileCompanyCard = ({ c, tr }: { c: CompanyEntry; tr: (p: string, f: string) => string }) => {
  const tag = tr(`pageContent.companies.${c.slug}.${c.tag}`, c.tagDefault);
  const name = tr(`pageContent.companies.${c.slug}.${c.name}`, c.nameDefault);
  return (
    <Link to={`/businesses/${c.slug}`} className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative h-24 overflow-hidden">
        <img src={companyImages[c.slug]} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-1.5 left-2 inline-block rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white bg-black/40 backdrop-blur-sm">
          {tag}
        </span>
      </div>
      <div className="px-2.5 py-2">
        <h3 className="font-display text-[11px] font-bold leading-tight text-slate-900 line-clamp-1">{name}</h3>
      </div>
    </Link>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`aboutPage.${path}`, { defaultValue: fallback });

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
    <main className="bg-white">
      <SEO
        title={tr("title", "About Indexia Group")}
        description={tr("metaDescription", "")}
        keywords="About Indexia Group, Indian business group, diversified company, finance export agriculture security"
        canonicalPath="/about"
        jsonLd={aboutJsonLd}
      />

      {/* Hero */}
      <HeroBackdrop
        image={aboutBg}
        radial="radial-gradient(circle at 82% 18%, rgba(242,242,49,0.12), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{tr("eyebrow", "About Us")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-3 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {tr("titleStart", "Some steps to ")}<br />
          <span className="text-(--color-yellow)">{tr("titleAccent", "serve the nation")}</span>
        </h1>
        <p className="mx-auto mb-2 max-w-2xl font-ledger text-[11px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-(--color-yellow)/80">
          {tr("taglineSecondary", "Diverse Ventures. Unified Vision.")}
        </p>
        <p className="mx-auto max-w-2xl text-[14px] sm:text-base leading-7 sm:leading-8 text-white/80">
          {tr("subtitle", "")}
        </p>
      </HeroBackdrop>

      {/* Leadership */}
      <section className="relative bg-(--color-ink-deep) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
            <Eyebrow color="var(--color-yellow)" className="mb-2">{tr("leaderEyebrow", "Leadership")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white">
              {tr("leaderTitle", "The People Behind Indexia Group")}
            </h2>
          </Reveal>

          <Reveal delay={0.1} amount={0.15}>
            <div className="mx-auto grid max-w-6xl items-center gap-5 sm:grid-cols-5">
              <div className="relative overflow-hidden rounded-2xl sm:col-span-2">
                <img
                  src={founderImg}
                  alt={tr("founderName", "Founder & Managing Director")}
                  width={500}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--color-ink-deep)/80 via-transparent to-transparent" />
                {/* Floating name badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                  <div className="rounded-lg bg-black/60 px-2.5 py-1.5 shadow-xl backdrop-blur-md border-b-2 border-(--color-yellow)">
                    <span className="font-display text-[10px] font-bold text-white sm:text-[11px]">
                      Bijendra Malik
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:col-span-3">
                <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-teal)">
                  {tr("founderRole", "Founder & Managing Director")}
                </span>
                <p className="mt-3 text-[13px] sm:text-[14px] leading-6 text-white/70">
                  {tr("founderBio1", "")}
                </p>
                <p className="mt-2.5 text-[13px] sm:text-[14px] leading-6 text-white/70">
                  {tr("founderBio2", "")}
                </p>
                <blockquote className="mt-3 border-l-2 border-(--color-yellow)/50 pl-3 text-[13px] italic text-(--color-yellow)/80">
                  "{tr("founderQuote", "")}"
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative bg-white px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
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
                <p>{tr("storyBody1", "")}</p>
                <p>{tr("storyBody2", "")}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} amount={0.15}>
            <ResponsiveImage
              src={ourStoryImg}
              alt="Indexia Group founding story"
              width={1200}
              height={500}
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src={valuesImg}
            alt=""
            width={1200}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>

        {/* Content pinned to bottom */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-2 py-5 sm:px-3 sm:py-6 lg:px-5">
          <Reveal className="mb-3 text-center sm:text-left">
            <h2 className="font-display text-[clamp(20px,3vw,32px)] font-bold text-white">
              {tr("valuesTitle", "What We Stand For")}
            </h2>
          </Reveal>

          {/* 4 cards in a single row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {VALUES.map((i) => (
              <Reveal key={i} delay={(i - 1) * 0.06} amount={0.15}>
                <div className="group rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/30">
                  <span className="font-ledger text-lg font-bold text-(--color-yellow)">
                    {String(i).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-[13px] sm:text-sm font-bold text-white leading-tight">
                    {tr(`value${i}Title`, "")}
                  </h3>
                  <p className="mt-1 text-[11px] sm:text-[12px] leading-4 text-white/65 line-clamp-2 group-hover:text-white/80">
                    {tr(`value${i}Body`, "")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Companies */}
      <section className="relative bg-(--color-mist) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-5 sm:mb-8 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("companiesEyebrow", "Our Companies")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("companiesTitle", "Eight Businesses, One Vision")}
            </h2>
            <p className="mt-2 text-[13px] leading-5 text-(--color-muted)">
              {tr("companiesSubtitle", "")}
            </p>
          </Reveal>

          {/* Interactive company map — desktop only */}
          <Reveal amount={0.15}>
            <div className="relative hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-0">
              {/* Left column — 4 companies */}
              <div className="flex flex-col gap-3">
                {COMPANY_LEFT.map((c) => (
                  <CompanyNode key={c.slug} c={c} side="left" tr={tr} />
                ))}
              </div>

              {/* Center group image */}
              <div className="relative mx-4 flex flex-col items-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-2xl border-2 border-(--color-yellow)/30 shadow-lg ring-4 ring-white">
                  <img src={companyImages.group} alt="Indexia Group" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 inset-x-0 text-center font-display text-xs font-bold text-white drop-shadow">Indexia Group</span>
                </div>
              </div>

              {/* Right column — 4 companies */}
              <div className="flex flex-col gap-3">
                {COMPANY_RIGHT.map((c) => (
                  <CompanyNode key={c.slug} c={c} side="right" tr={tr} />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Mobile: simple 2-col grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {[...COMPANY_LEFT, ...COMPANY_RIGHT].map((c) => (
              <MobileCompanyCard key={c.slug} c={c} tr={tr} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative bg-(--color-mist) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mx-auto mb-5 sm:mb-8 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("timelineEyebrow", "Our Journey")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("timelineTitle", "Key Milestones")}
            </h2>
          </Reveal>

          <div className="relative">
            {/* Animated center line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-(--color-teal)/20 via-(--color-teal) to-(--color-teal)/20 sm:left-1/2" />

            <div className="space-y-6 sm:space-y-8">
              {MILESTONES.map((i) => (
                <Reveal key={i} delay={(i - 1) * 0.06} amount={0.1}>
                  <div className="relative flex items-center sm:justify-center">
                    {/* Center dot */}
                    <div className="absolute left-4 sm:left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-(--color-teal) bg-white shadow-md">
                      <span className="font-ledger text-[8px] sm:text-[9px] font-bold text-(--color-teal)">
                        {tr(`milestone${i}Year`, "")}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                      i % 2 === 0 ? "sm:mr-auto sm:pr-6 sm:text-right" : "sm:ml-auto sm:pl-6"
                    }`}>
                      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                        <h3 className="font-display text-[15px] sm:text-base font-bold text-slate-900">
                          {tr(`milestone${i}Title`, "")}
                        </h3>
                        <p className="mt-1.5 text-[12px] sm:text-[13px] leading-5 sm:leading-6 text-slate-500">
                          {tr(`milestone${i}Body`, "")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration & Compliance */}
      <section className="relative bg-white px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("registrationEyebrow", "Registration & Compliance")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("registrationTitle", "Registered Entities")}</h2>
            <p className="mt-3 text-[14px] leading-6 text-(--color-muted)">
              {tr("registrationSubtitle", "All Indexia Group companies are registered under the Companies Act, 2013 with the Ministry of Corporate Affairs, Government of India.")}
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Indexia Finserve Pvt. Ltd.", cin: "U65990MH2012PTC234568", est: "2012" },
              { name: "Indexia Overseas Pvt. Ltd.", cin: "U51909MH2015PTC367890", est: "2015" },
              { name: "Indexia Agro Bio Fertilizers Pvt. Ltd.", cin: "U01100MH2018PTC390123", est: "2018" },
            ].map((entity) => (
              <Reveal key={entity.cin} delay={0.05} amount={0.15}>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                  <h3 className="font-display text-sm font-bold text-slate-900">{entity.name}</h3>
                  <div className="mt-3 space-y-2 text-xs text-slate-500">
                    <p><span className="font-semibold text-slate-700">CIN:</span> {entity.cin}</p>
                    <p><span className="font-semibold text-slate-700">Est.:</span> {entity.est}</p>
                  </div>
                  <a
                    href="https://www.mca.gov.in/content/mca/global/en/always-on-mca/ministry-affairs.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)"
                  >
                    {tr("viewOnMCA", "View on MCA")} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} amount={0.15} className="mt-5">
            <div className="rounded-2xl border border-slate-100 bg-(--color-soft) p-6 text-center">
              <p className="text-sm text-slate-500">
                {tr("registrationNote", "All company registrations are verifiable on the")}
                <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="ml-1 font-bold text-(--color-teal) hover:text-(--color-blue)">
                  {tr("mcaPortal", "MCA Portal")}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
