import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import NewsHero from "./news/NewsHero";
import NewsVideo from "./news/NewsVideo";
import CategoryNewsSection from "./news/CategoryNewsSection";
import InsightsSection from "./news/InsightsSection";
import { useNewsJsonLd, useNewsContent } from "./news/newsData";

const NewsPage = () => {
  const { t } = useTranslation();
  const { insights, articlesByCategory } = useNewsContent();
  const newsJsonLd = useNewsJsonLd();

  return (
    <main className="site-shell">
      <SEO
        title={t("newsPage.title")}
        description={t("newsPage.metaDescription")}
        keywords="banking news India, digital payments, IMPS, SME lending, UIDAI Aadhaar, SEBI, Yes Bank, SBI, Indexia Group news and knowledge"
        canonicalPath="/news"
        jsonLd={newsJsonLd}
      />

      <NewsHero />
      <NewsVideo />

      {/* Category-wise news tabs */}
      <CategoryNewsSection articlesByCategory={articlesByCategory} />

      {/* Knowledge Centre */}
      <InsightsSection insights={insights} />
    </main>
  );
};

export default NewsPage;
