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
      keywords="Indexia Group, financial services India, NBFC loans, personal and business loans Mumbai, global sugar export, organic fertilizer manufacturers Shamli, warehousing Delhi NCR, armed security services, highway advertising India, athlete support"
      canonicalPath="/"
      jsonLd={homeJsonLd}
    />

    <Banner />

    {/* Gradient fade from hero dark to light section */}
    <div aria-hidden="true" className="relative -mt-1 h-8 sm:h-16 bg-linear-to-b from-[#02101a] to-[var(--color-soft)]" />

    <section className="relative bg-(--color-soft) py-16 lg:py-24">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-180 text-center">
            <Eyebrow className="mb-3">{t("businesses.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("businesses.titleStart")}
              <span className="text-(--color-blue)">{t("businesses.titleAccent")}</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">
              {t("businesses.subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={(i % 4) * 0.08} amount={0.15}>
              <CompanyLinkCard company={company} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* Gradient fade from light to dark section */}
    <div aria-hidden="true" className="relative h-8 sm:h-16 bg-linear-to-b from-[var(--color-soft)] to-[#122029]" />

    {/* Global Reach & Impact */}
    <section className="relative overflow-hidden bg-reach-gradient px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 top-0 h-96 w-96 rounded-full bg-(--color-teal)/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 bottom-0 h-80 w-80 rounded-full bg-(--color-yellow)/15 blur-[100px]"
      />
      <div className="container relative">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow color="var(--color-yellow)">{t("homeReach.eyebrow", "Our Reach")}</Eyebrow>
          <h2 className="font-display mt-3 text-[clamp(26px,4vw,42px)] font-bold text-white">
            {t("homeReach.title", "Trusted Across Borders")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-white/70">
            {t("homeReach.subtitle", "From Mumbai to Ecuador, our businesses serve clients across three continents with the same commitment to integrity and results.")}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 lg:grid-cols-4">
          <Reveal delay={0} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="8" label={t("homeReach.stat1Label", "Businesses")} color={colors.yellow} numberClassName="font-display text-[40px] font-bold text-(--color-yellow) leading-none" labelClassName="mt-2.5 font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.12} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="3" label={t("homeReach.stat2Label", "Countries")} color={colors.white} numberClassName="font-display text-[40px] font-bold text-white leading-none" labelClassName="mt-2.5 font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.24} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="12+" label={t("homeReach.stat3Label", "Years Strong")} color={colors.yellow} numberClassName="font-display text-[40px] font-bold text-(--color-yellow) leading-none" labelClassName="mt-2.5 font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-white/50" />
          </Reveal>
          <Reveal delay={0.36} y={40} variant="scale" amount={0.15} className="text-center">
            <AnimatedCounter value="500+" label={t("homeReach.stat4Label", "Clients Served")} color={colors.white} numberClassName="font-display text-[40px] font-bold text-white leading-none" labelClassName="mt-2.5 font-ledger text-[10px] font-bold uppercase tracking-[0.2em] text-white/50" />
          </Reveal>
        </div>

        <Reveal delay={0.3} amount={0.15} className="mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-yellow)/40 hover:bg-(--color-yellow)/10 hover:text-(--color-yellow)"
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
