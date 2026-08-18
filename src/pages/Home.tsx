import { useTranslation } from "react-i18next";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import CompanyLinkCard from "../components/cards/CompanyLinkCard";
import { companies } from "../data/companies";

const Home = () => {
  const { t } = useTranslation();

  return (
  <main className="bg-white">
    <SEO
      title={t("seo.homeTitle")}
      description={t("seo.homeDescription")}
      keywords="Indexia Group, financial services India, NBFC loans, personal and business loans Mumbai, global sugar export, organic fertilizer manufacturers Shamli, warehousing Delhi NCR, armed security services, highway advertising India, athlete support"
      canonicalPath="/"
    />

    <Banner />

    <section className="bg-(--color-soft) py-16 lg:py-24">
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
  </main>
  );
};

export default Home;
