import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import ResponsiveImage from "../components/common/ResponsiveImage";
import { colors } from "../lib/theme";
import aboutBg from "../assets/hero-img/AboutHero.png";
import founderImg from "../assets/about-img/founder_MD.png";
import ourStoryImg from "../assets/about-img/OurStory.png";
import valuesImg from "../assets/about-img/OurValues.png";
import companiesImg from "../assets/about-img/OurCompanies.png";
import timelineImg from "../assets/about-img/OurJourney.png";

const VALUES = [1, 2, 3, 4] as const;
const MILESTONES = [1, 2, 3, 4, 5] as const;

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
            <div className="mx-auto grid max-w-6xl items-center gap-6 sm:grid-cols-2">
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src={founderImg}
                  alt={tr("founderName", "Founder & Managing Director")}
                  width={500}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-linear-to-t from-(--color-ink-deep)/80 via-transparent to-transparent" />
                {/* Floating name badge */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                  <div className="rounded-lg bg-black/60 px-3 py-2 shadow-xl backdrop-blur-md border-b-2 border-(--color-yellow)">
                    <span className="font-display text-[11px] font-bold text-white sm:text-xs">
                      Bijendra Malik
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-ledger text-[11px] font-bold uppercase tracking-[0.2em] text-(--color-teal)">
                  {tr("founderRole", "Founder & Managing Director")}
                </span>                  <p className="mt-4 max-w-lg text-[14px] sm:text-[15px] leading-7 text-white/70">
                  {tr("founderBio1", "")}
                </p>
                <p className="mt-3 max-w-lg text-[14px] sm:text-[15px] leading-7 text-white/70">
                  {tr("founderBio2", "")}
                </p>
                <blockquote className="mt-4 max-w-lg border-l-2 border-(--color-yellow)/50 pl-4 text-sm italic text-(--color-yellow)/80">
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
      <section className="relative overflow-hidden px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        {/* Clear background image */}
        <div className="absolute inset-0">
          <ResponsiveImage
            src={valuesImg}
            alt=""
            width={1200}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-5 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("valuesEyebrow", "Our Values")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white drop-shadow-lg">
              {tr("valuesTitle", "What We Stand For")}
            </h2>
          </Reveal>

          {/* 2x2 grid with offset layout */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {VALUES.map((i) => (
              <Reveal key={i} delay={(i - 1) * 0.08} amount={0.15}>
                <div className={`group flex items-start gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-black/50 via-black/40 to-black/30 backdrop-blur-sm p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:from-black/60 hover:via-black/50 hover:to-black/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-white/30 ${i % 2 === 0 ? "sm:col-span-2 sm:flex-row sm:items-center" : ""}`}>
                  <span className={`shrink-0 font-ledger text-3xl font-bold text-(--color-yellow) opacity-80 transition-opacity duration-300 group-hover:opacity-100 ${i % 2 === 0 ? "sm:text-4xl" : "text-2xl"}`}>
                    {String(i).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-[17px] sm:text-lg font-bold text-white transition-colors duration-300">
                      {tr(`value${i}Title`, "")}
                    </h3>
                    <p className="mt-1.5 text-[13px] sm:text-sm leading-6 text-white/70 transition-colors duration-300 group-hover:text-white/85">
                      {tr(`value${i}Body`, "")}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Companies */}
      <section className="relative bg-(--color-mist) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("companiesEyebrow", "Our Companies")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("companiesTitle", "Eight Businesses, One Vision")}
            </h2>
            <p className="mt-3 text-[14px] leading-6 text-(--color-muted)">
              {tr("companiesSubtitle", "")}
            </p>
          </Reveal>

          <Reveal amount={0.15}>
            <ResponsiveImage
              src={companiesImg}
              alt="Indexia Group companies overview"
              width={1200}
              height={500}
              className="mx-auto mb-12 w-full max-w-3xl rounded-2xl object-cover shadow-sm"
            />
          </Reveal>

          <div className="space-y-3">
            {/* Indexia Finance */}
            <Reveal delay={0.05} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.teal}15`, color: colors.teal }}>
                      {tr("c1Tag", "Multinational Fintech")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c1Name", "Indexia Finance")}</h3>
                    <p className="mt-1 text-xs text-slate-400">Est. 2012</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c1Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c1Highlights", "43+ Lender Partners,5 Branches in 4 Cities,Best Finance Company 2016 Award,Global Presence: India, US, Ecuador, Europe").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-teal)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <a href="https://indexiafinance.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      {tr("visitWebsite", "Visit Website")} →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Finserve */}
            <Reveal delay={0.1} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.yellow}15`, color: "#b8860b" }}>
                      {tr("c2Tag", "Lending Arm")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c2Name", "Indexia Finserve Pvt. Ltd.")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c2Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c2Highlights", "12 Loan Products,Personal & Business Loans,Home Loan & LAP,Balance Transfer & Working Capital").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-yellow)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/finserve" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Overseas */}
            <Reveal delay={0.15} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                      {tr("c3Tag", "Global Export")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c3Name", "Indexia Overseas Pvt. Ltd.")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c3Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c3Highlights", "14 South American Countries,Premium Refined Sugar Export,Food-Grade Quality Certified,Full-Cycle Export Management").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/overseas" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Agro Bio */}
            <Reveal delay={0.2} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.yellow}15`, color: "#b8860b" }}>
                      {tr("c4Tag", "Organic Agriculture")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c4Name", "Indexia Agro Bio Fertilizers Pvt. Ltd.")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c4Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c4Highlights", "100% Organic Bio-Fertilizers,Production in Shamli UP (Delhi NCR),Soil Testing & Farmer Support,Domestic & Export Distribution").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-yellow)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/agro-bio" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Securities */}
            <Reveal delay={0.25} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.navy}15`, color: colors.navy }}>
                      {tr("c5Tag", "Armed Protection")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c5Name", "Indexia Securities")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c5Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c5Highlights", "Ex-Military Commandos,24/7 Operations Centre,VIP & Corporate Protection,Critical Infrastructure Security").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-navy)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/securities" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Warehouse */}
            <Reveal delay={0.3} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.teal}15`, color: colors.teal }}>
                      {tr("c6Tag", "Strategic Land")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c6Name", "Indexia Warehouse")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c6Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c6Highlights", "21 Acres in Shamli UP,8 National Expressways,5 Locations,65 km from Delhi").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-teal)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/warehouse" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Advertising */}
            <Reveal delay={0.35} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                      {tr("c7Tag", "Highway Advertising")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c7Name", "Indexia Advertising")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c7Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c7Highlights", "NH-709B Delhi-Dehradun Highway,10 States Connected,360° Visibility Unipoles,1+ Crore Daily Exposure").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to="/businesses/advertising" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Indexia Foundation */}
            <Reveal delay={0.4} amount={0.1}>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md">                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="shrink-0 lg:w-48">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: `${colors.tealDeep}15`, color: colors.tealDeep }}>
                      {tr("c8Tag", "Social Impact")}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{tr("c8Name", "Indexia Foundation")}</h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] sm:text-[14px] leading-6 text-slate-600">{tr("c8Body", "")}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(tr("c8Highlights", "Grassroots to Olympics,Training & Nutrition,Coaching & Mentorship,Competition Funding").split(",")).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600">
                          <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-teal-deep)" />
                          {h.trim()}
                        </span>
                      ))}
                    </div>
                    <a href="/businesses/foundation" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-(--color-teal) transition-colors hover:text-(--color-blue)">
                      {tr("learnMore", "Learn More")} →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative bg-(--color-mist) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("timelineEyebrow", "Our Journey")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("timelineTitle", "Key Milestones")}
            </h2>
          </Reveal>

          <Reveal amount={0.15}>
            <ResponsiveImage
              src={timelineImg}
              alt="Indexia Group journey and milestones"
              width={1200}
              height={500}
              className="mx-auto mb-8 w-full max-w-3xl rounded-2xl object-cover shadow-sm"
            />
          </Reveal>

          <div className="relative space-y-5">
            <div
              aria-hidden="true"
              className="absolute left-4.5 top-0 bottom-0 w-px bg-slate-200 sm:left-1/2 sm:-translate-x-px"
            />
            {MILESTONES.map((i) => (
              <Reveal key={i} delay={(i - 1) * 0.06} amount={0.1}>
                <div className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                  <div className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border-2 border-(--color-teal) bg-white text-[9px] sm:text-[10px] font-bold text-(--color-teal) sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                    {tr(`milestone${i}Year`, "")}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm sm:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "sm:mr-auto sm:pr-8 sm:text-right" : "sm:ml-auto sm:pl-8"
                    }`}
                  >
                    <h3 className="font-display text-[15px] sm:text-lg font-bold text-slate-900">
                      {tr(`milestone${i}Title`, "")}
                    </h3>
                    <p className="mt-1.5 text-[13px] sm:text-sm leading-6 text-slate-600">
                      {tr(`milestone${i}Body`, "")}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
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
