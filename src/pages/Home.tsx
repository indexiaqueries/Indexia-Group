import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import AnimatedCounter from "../components/common/AnimatedCounter";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import CompanyLinkCard from "../components/cards/CompanyLinkCard";
import { companies } from "../data/companies";
import { colors } from "../lib/theme";
import { lazy, Suspense } from "react";
const Globe = lazy(() => import("../components/lightswind/globe"));

const Home = () => {
  const { t } = useTranslation();

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: t("seo.homeTitle", "Indexia Group"),
        url: "https://www.indexiagroup.com/",
        description: t("seo.homeDescription", ""),
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome", "Home"), item: "https://www.indexiagroup.com/" },
        ],
      },
    ],
  };

  return (
  <main className="bg-white">
    <SEO
      title={t("seo.homeTitle")}
      description={t("seo.homeDescription")}
      keywords="Indexia Group, financial services India, NBFC loans, personal and business loans, global sugar export, organic fertilizer, warehousing, armed security services, highway advertising, athlete support"
      canonicalPath="/"
      jsonLd={homeJsonLd}
    />

    <Banner />

    {/* Gradient fade from hero dark to light section */}
    <div aria-hidden="true" className="relative -mt-1 h-10 sm:h-16 bg-linear-to-b from-[#02101a] to-(--color-soft)" />

    <section className="relative bg-(--color-soft) py-12 sm:py-16 lg:py-24">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-180 text-center">
            <Eyebrow className="mb-3">{t("businesses.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,4vw,38px)] font-bold text-(--color-ink)">
              {t("businesses.titleStart")}
              <span className="text-(--color-blue)">{t("businesses.titleAccent")}</span>
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-(--color-muted)">
              {t("businesses.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={(i % 4) * 0.08} amount={0.15}>
              <CompanyLinkCard company={company} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Gradient fade from light to dark section */}
    <div aria-hidden="true" className="relative h-10 sm:h-16 bg-linear-to-b from-(--color-soft) to-[#122029]" />

    {/* Global Reach & Impact */}
    <section className="relative overflow-hidden bg-reach-gradient px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-32 top-0 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-(--color-teal)/25 blur-[100px] sm:blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-40 bottom-0 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-(--color-yellow)/15 blur-[80px] sm:blur-[100px]"
      />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="var(--color-yellow)">{t("homeReach.eyebrow", "Our Reach")}</Eyebrow>
          <h2 className="font-display mt-3 text-[clamp(22px,4vw,42px)] font-bold text-white">
            {t("homeReach.title", "Trusted Across Borders")}
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-white/70">
            {t("homeReach.subtitle", "Our businesses serve clients worldwide with the same commitment to integrity and results.")}
          </p>
        </Reveal>

        {/* Globe — lazy-loaded to keep initial JS execution light */}
        <div className="mx-auto">
          <div className="mx-auto h-72 sm:h-87.5 w-full max-w-3xl sm:h-105 lg:h-120">
            <Suspense fallback={<div className="h-full w-full" /> }>
              <Globe
                theta={0.3}
                dark={0}
                scale={1}
                diffuse={1.2}
                baseColor="#066a9c"
                markerColor="#26ae90"
                glowColor="#ffffff"
                mapSamples={50000}
                mapBrightness={14}
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={0.005}
              />
            </Suspense>
          </div>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          <Reveal delay={0} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="8" label={t("homeReach.stat1Label", "Businesses")} color={colors.yellow} numberClassName="font-display text-[32px] sm:text-[40px] font-bold text-(--color-yellow) leading-none" labelClassName="mt-2 sm:mt-2.5 font-ledger text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.12} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="3" label={t("homeReach.stat2Label", "Countries")} color={colors.white} numberClassName="font-display text-[32px] sm:text-[40px] font-bold text-white leading-none" labelClassName="mt-2 sm:mt-2.5 font-ledger text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.24} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="12+" label={t("homeReach.stat3Label", "Years Strong")} color={colors.yellow} numberClassName="font-display text-[32px] sm:text-[40px] font-bold text-(--color-yellow) leading-none" labelClassName="mt-2 sm:mt-2.5 font-ledger text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.36} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="500+" label={t("homeReach.stat4Label", "Clients Served")} color={colors.white} numberClassName="font-display text-[32px] sm:text-[40px] font-bold text-white leading-none" labelClassName="mt-2 sm:mt-2.5 font-ledger text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white/50" />
          </Reveal>
        </div>

        <Reveal delay={0.3} amount={0.15} className="mt-10 sm:mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-yellow)/40 hover:bg-(--color-yellow)/10 hover:text-(--color-yellow)"
          >
            {t("homeReach.cta", "Learn More About Us")} →
          </Link>
        </Reveal>
      </div>
    </section>
  </main>
  );
};

export default Home;
