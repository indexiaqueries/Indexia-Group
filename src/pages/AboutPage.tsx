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

const VALUES = [1, 2, 3, 4] as const;

const MILESTONES_DATA = [
  { year: "2005", title: "Company Founded", body: "Started with a vision to build a diversified Indian business group rooted in integrity and expertise." },
  { year: "2012", title: "Indexia Finserve Launch", body: "Expanded into investment and finance, creating a dedicated lending and wealth management arm." },
  { year: "2015", title: "Global Edible Export", body: "Launched Indexia Overseas to connect Indian agriculture with global markets across multiple continents." },
  { year: "2021", title: "Rapid Expansion", body: "Launched Agro Bio, Securities, Warehouse, and Advertising verticals, growing to eight companies." },
  { year: "2024", title: "Social Impact", body: "Founded Indexia Foundation to support Indian athletes from grassroots to the Olympic Games." },
];

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
        description={tr("metaDescription", "About Indexia Group - diversified Indian business group")}
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
        <p className="mx-auto max-w-2xl text-[12px] sm:text-sm leading-6 sm:leading-7 text-white/80">
          {tr("subtitle", "Diverse Ventures. Unified Vision.")}
        </p>
      </HeroBackdrop>

      {/* Leadership */}
      <section className="relative bg-(--color-ink-deep) px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <Reveal delay={0.1} amount={0.15} className="relative">
            <div className="relative flex items-end justify-center overflow-hidden rounded-2xl z-10">
              <img
                src={founderImg}
                alt={tr("founderName", "Founder & Managing Director")}
                width={500}
                height={700}
                loading="lazy"
                decoding="async"
                className="h-full w-auto object-contain object-bottom"
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
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow color="var(--color-yellow)" className="mb-2">{tr("leaderEyebrow", "Leadership")}</Eyebrow>
              <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white">
                {tr("leaderTitle", "The People Behind Indexia Group")}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-4 space-y-3">
                <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-teal)">
                  {tr("founderRole", "Founder & Managing Director")}
                </span>
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
                <p>{tr("storyBody1", "From a small office in Mumbai, Indexia Group has grown into a diversified business conglomerate spanning multiple industries across India and beyond.")}</p>
                <p>{tr("storyBody2", "Today, we operate eight distinct companies, each contributing to the nation's economic growth while maintaining our core values of integrity, innovation, and excellence.")}</p>
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
                <div className="group rounded-2xl border border-white/40 bg-white/80 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:bg-white/90">
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
      <div className="h-px w-full bg-linear-to-r from-transparent via-(--color-teal) to-transparent" />

      <section className="relative overflow-hidden bg-[#f0f9ff99] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
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
      <div className="h-px w-full bg-linear-to-r from-transparent via-(--color-teal) to-transparent" />


      {/* Timeline */}
      <section className="relative bg-white px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mx-auto mb-5 sm:mb-8 max-w-2xl text-center">
            <Eyebrow className="mb-2">{tr("timelineEyebrow", "Our Journey")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-(--color-ink)">
              {tr("timelineTitle", "Key Milestones")}
            </h2>
          </Reveal>

          <ScrollTimeline milestones={MILESTONES_DATA} />
        </div>
      </section>      {/* Registration & Compliance */}
      <section className="relative overflow-hidden bg-(--color-ink-deep) px-2 py-8 sm:px-3 sm:py-10 lg:px-5">
        {/* Decorative glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -inset-e-20 top-0 h-48 w-48 rounded-full bg-(--color-teal)/15 blur-[80px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -inset-s-20 bottom-0 h-40 w-40 rounded-full bg-(--color-yellow)/10 blur-[60px]" />

        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-5 sm:mb-7 max-w-4xl text-center">
            <Eyebrow color="var(--color-yellow)" className="mb-2">{tr("registrationEyebrow", "Registration & Compliance")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,3.5vw,36px)] font-bold text-white">
              {tr("registrationTitle", "Registered Entities")}</h2>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Indexia Finserve Pvt. Ltd.", cin: "U65990MH2012PTC234568", est: "2012" },
              { name: "Indexia Overseas Pvt. Ltd.", cin: "U51909MH2015PTC367890", est: "2015" },
              { name: "Indexia Agro Bio Fertilizers Pvt. Ltd.", cin: "U01100MH2018PTC390123", est: "2018" },
            ].map((entity) => (
              <Reveal key={entity.cin} delay={0.05} amount={0.15}>
                <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:border-white/25">
                  <h3 className="font-display text-[13px] sm:text-sm font-bold text-white">{entity.name}</h3>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-white/50">
                    <span><span className="font-semibold text-white/70">CIN:</span> {entity.cin}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">
                    <span className="font-semibold text-white/70">Est.:</span> {entity.est}
                  </div>
                  <a
                    href="https://www.mca.gov.in/content/mca/global/en/always-on-mca/ministry-affairs.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-(--color-teal) transition-colors hover:text-(--color-yellow)"
                  >
                    {tr("viewOnMCA", "View on MCA")} →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} amount={0.15} className="mt-5 sm:mt-6 text-center">
            <a
              href="https://www.mca.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-5 py-2 text-[12px] font-bold text-(--color-yellow) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow)/20"
            >
              Verify on MCA Portal
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
