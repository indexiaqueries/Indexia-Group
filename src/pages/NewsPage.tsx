import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import { colors } from "../lib/theme";
import NewsHero from "./news/NewsHero";
import FeaturedArticle from "./news/FeaturedArticle";
import NewsGrid from "./news/NewsGrid";
import InsightsSection from "./news/InsightsSection";
import NewsCta from "./news/NewsCta";
import { newsJsonLd, useNewsContent } from "./news/newsData";

const NewsPage = () => {
  const { t } = useTranslation();
  const { featured, latest, insights } = useNewsContent();

  return (
    <main className="bg-white">
      <SEO
        title={t("newsPage.title")}
        description={t("newsPage.metaDescription")}
        keywords="Indexia Group news, Indexia Finance news, Indexia Finserve loans, Indexia Agro Bio Fertilizers, Indexia Warehouse, Indexia Foundation, highway advertising, FDI India"
        canonicalPath="/news"
        jsonLd={newsJsonLd}
      />

      <NewsHero />

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                {t("newsPage.featuredLabel")}
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </Reveal>

          <FeaturedArticle featured={featured} />
          <NewsGrid latest={latest} />
        </div>
      </section>

      <InsightsSection insights={insights} />
      <NewsCta />
    </main>
  );
};

export default NewsPage;
