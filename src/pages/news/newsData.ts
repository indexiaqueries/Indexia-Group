import { useTranslation } from "react-i18next";
import { newsArticles, knowledgeInsights } from "../../data/news";
import { companies } from "../../data/companies";
import { colors } from "../../lib/theme";

export type ArticleItem = (typeof newsArticles)[number];
export type InsightItem = (typeof knowledgeInsights)[number];

export const companyColor = (name: string) =>
  companies.find((c) => c.name === name)?.color ?? colors.blue;

export const useNewsJsonLd = () => {
  const { t } = useTranslation();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: t("jsonLd.newsName", "Indexia Group, News & Knowledge Centre"),
        url: "https://www.indexiagroup.com/news",
        blogPost: newsArticles.map((article) => ({
          "@type": "BlogPosting",
          headline: article.title,
          datePublished: article.date,
          description: article.excerpt,
          url: `https://www.indexiagroup.com/news#${article.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome", "Home"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbNews", "News & Knowledge Centre"), item: "https://www.indexiagroup.com/news" },
        ],
      },
    ],
  };
};

export const useNewsContent = () => {
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`pageContent.news.${path}`, { defaultValue: fallback });

  const articles = newsArticles.map((a) => ({
    ...a,
    title: tr(`articles.${a.slug}.title`, a.title),
    category: tr(`articles.${a.slug}.category`, a.category),
    excerpt: tr(`articles.${a.slug}.excerpt`, a.excerpt),
  }));
  const insights = knowledgeInsights.map((ins) => ({
    ...ins,
    title: tr(`insights.${ins.key}.title`, ins.title),
    body: tr(`insights.${ins.key}.body`, ins.body),
  }));

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a !== featured);

  return { articles, insights, featured, latest };
};
