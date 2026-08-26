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
    <section className="relative overflow-hidden bg-linear-to-b from-[#26ae90] to-[#066a9c] px-2 py-8 sm:px-3 sm:py-10 lg:px-5">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-e-20 top-0 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-(--color-teal)/15 blur-[80px] sm:blur-[100px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -inset-s-20 bottom-0 h-40 sm:h-52 w-40 sm:w-52 rounded-full bg-(--color-yellow)/10 blur-[60px] sm:blur-[80px]" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow color="var(--color-yellow)" className="mb-1">{t("homeReach.eyebrow", "Our Reach")}</Eyebrow>
          <h2 className="font-display text-[clamp(20px,3.5vw,36px)] font-bold text-white">
            {t("homeReach.title", "Trusted Across Borders")}
          </h2>
        </Reveal>

        {/* Globe + I overlay */}
        <div className="relative mx-auto -my-1 h-36 sm:h-44 w-full max-w-sm lg:h-56">
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
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
            <div
              className="absolute h-[clamp(40px,8vw,70px)] w-[clamp(40px,8vw,70px)] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(242,242,49,0.25) 0%, rgba(242,242,49,0.08) 50%, transparent 70%)", filter: "blur(6px)" }}
            />
            <span className="relative font-display text-[clamp(36px,8vw,64px)] font-bold leading-none text-(--color-yellow) drop-shadow-[0_2px_12px_rgba(242,242,49,0.5)]">
              I
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-(--color-teal)/60 to-transparent" />
    </section>

  </main>
  );
};

export default Home;
