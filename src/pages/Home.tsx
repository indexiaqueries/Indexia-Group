import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import CompanyLinkCard from "../components/cards/CompanyLinkCard";
import { companies } from "../data/companies";
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

    <section className="relative bg-(--color-soft) mx-3 mt-4 mb-2 sm:mx-5 sm:mt-5 sm:mb-3">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-180 text-center">
            <Eyebrow>{t("businesses.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(22px,4vw,38px)] font-bold text-(--color-ink)">
              {t("businesses.titleStart")}
              <span className="text-(--color-blue)">{t("businesses.titleAccent")}</span>
            </h2>
            <p className="mt-1 text-[10px] sm:text-[11px] leading-5 sm:leading-6 text-(--color-muted)">
              {t("businesses.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 py-3">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={(i % 4) * 0.08} amount={0.15}>
              <CompanyLinkCard company={company} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Our Reach */}
    <section className="relative overflow-hidden bg-reach-gradient px-3 sm:px-4 lg:px-6 pt-5">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-e-32 top-0 h-72 sm:h-96 w-72 sm:w-96 rounded-full bg-(--color-teal)/25 blur-[100px] sm:blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-s-40 bottom-0 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-(--color-yellow)/15 blur-[80px] sm:blur-[100px]" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow color="var(--color-yellow)">{t("homeReach.eyebrow", "Our Reach")}</Eyebrow>
          <h2 className="font-display text-[clamp(22px,4vw,42px)] font-bold text-white">
            {t("homeReach.title", "Trusted Across Borders")}
          </h2>
          <p className="text-[10px] sm:text-[12px] leading-6 sm:leading-7 text-white/70">
            {t("homeReach.subtitle", "Our businesses serve clients worldwide with the same commitment to integrity and results.")}
          </p>
        </Reveal>

        {/* Globe */}
        <div className="mx-auto -my-2">
          <div className="relative mx-auto h-48 sm:h-60 w-full max-w-lg lg:h-80">
            <Suspense fallback={<div className="h-full w-full" />}>
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
                autoRotateSpeed={0.004}
              />
            </Suspense>
            {/* Indexia "I" overlay */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
              <div
                className="absolute h-[clamp(50px,10vw,90px)] w-[clamp(50px,10vw,90px)] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(242,242,49,0.25) 0%, rgba(242,242,49,0.08) 50%, transparent 70%)", filter: "blur(8px)" }}
              />
              <span className="relative font-display text-[clamp(50px,10vw,80px)] font-bold leading-none text-(--color-yellow) drop-shadow-[0_2px_16px_rgba(242,242,49,0.5)]">
                I
              </span>
            </div>
          </div>
        </div>


      </div>
    </section>

  </main>
  );
};

export default Home;
