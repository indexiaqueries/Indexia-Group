import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import { colors } from "../lib/theme";
import cardBg from "../assets/news&knowledge-img/cardBG.png";
import NewsHero from "./news/NewsHero";
import NewsVideo from "./news/NewsVideo";
import FeaturedArticle from "./news/FeaturedArticle";
import NewsGrid from "./news/NewsGrid";
import InsightsSection from "./news/InsightsSection";
import { useNewsJsonLd, useNewsContent } from "./news/newsData";

const NewsPage = () => {
  const { t } = useTranslation();
  const { featured, latest, insights } = useNewsContent();
  const newsJsonLd = useNewsJsonLd();

  return (
    <main className="bg-white">
      <SEO
        title={t("newsPage.title")}
        description={t("newsPage.metaDescription")}
        keywords="banking news India, digital payments, IMPS, SME lending, UIDAI Aadhaar, SEBI, Yes Bank, SBI, Indexia Group news and knowledge"
        canonicalPath="/news"
        jsonLd={newsJsonLd}
      />

      <NewsHero />
      <NewsVideo />

      <section className="relative bg-white px-2 py-4 sm:px-3 sm:py-5 lg:px-5">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                {t("newsPage.featuredLabel")}
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </Reveal>

          <FeaturedArticle featured={featured} />
        </div>
      </section>

      <section className="relative flex items-center overflow-hidden">
        {/* Backdrop image */}
        <img
          src={cardBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"
        />

        {/* Cards */}
        <div className="relative mx-auto max-w-6xl px-2 py-12 sm:px-3 sm:py-16 lg:px-5">
          <NewsGrid latest={latest} />
        </div>
      </section>

      <InsightsSection insights={insights} />
    </main>
  );
};

export default NewsPage;
