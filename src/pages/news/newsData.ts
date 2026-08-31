import { useTranslation } from "react-i18next";
import { newsArticles, knowledgeInsights } from "../../data/news";
import { companies } from "../../data/companies";
import { colors } from "../../lib/theme";
import { useLiveNews, type LiveArticle } from "../../hooks/useLiveNews";

export type ArticleItem = {
  slug: string;
  title: string;
  category: string;
  company: string;
  date?: string;
  excerpt: string;
  featured?: boolean;
  image?: string;
  source?: string;         // source_name
  sourceIcon?: string;     // source_icon
  sourceUrl?: string;      // source website URL
  creator?: string[];      // author names
  keywords?: string[];
  articleUrl?: string;     // link to original article
};

export type InsightItem = (typeof knowledgeInsights)[number];

export const companyColor = (name: string) =>
  companies.find((c) => c.name === name)?.color ?? colors.blue;

// Map live API categories to display categories
const LIVE_CATEGORY_MAP: Record<string, string> = {
  finance: "Finance",
  warehouse: "Warehousing",
  export: "Trade & Export",
  athlete: "Sports",
};

// Map live API categories to company names
const LIVE_COMPANY_MAP: Record<string, string> = {
  finance: "Indexia Finance",
  warehouse: "Indexia Warehouse",
  export: "Indexia Overseas",
  athlete: "Indexia Foundation",
};

/**
 * Convert a live API article to the ArticleItem format.
 */
function liveToArticleItem(article: LiveArticle, _index: number): ArticleItem {
  const publishedDate = article.pubDate
    ? new Date(article.pubDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return {
    slug: `live-${article.category}-${_index}`,
    title: article.title,
    category: LIVE_CATEGORY_MAP[article.category] || article.category,
    company: LIVE_COMPANY_MAP[article.category] || article.sourceName,
    date: publishedDate,
    excerpt:
      article.description.length > 200
        ? article.description.substring(0, 197) + "..."
        : article.description,
    image: article.image,
    source: article.sourceName,
    sourceIcon: article.sourceIcon,
    sourceUrl: article.sourceUrl,
    creator: article.creator,
    keywords: article.keywords,
    articleUrl: article.link,
  };
}

/**
 * Merge live API articles with static fallback articles.
 * Live articles take priority; static articles fill remaining slots.
 */
function mergeArticles(
  liveNews: Record<string, LiveArticle[]>,
  staticArticles: typeof newsArticles
): ArticleItem[] {
  const liveItems: ArticleItem[] = [];

  // Convert all live articles
  for (const [_cat, articles] of Object.entries(liveNews)) {
    articles.forEach((article, i) => {
      liveItems.push(liveToArticleItem(article, i));
    });
  }

  if (liveItems.length > 0) {
    // Mark the first live article as featured
    liveItems[0].featured = true;
    return liveItems;
  }

  // Fallback to static articles
  return staticArticles.map((a) => ({
    ...a,
    image: undefined,
    source: undefined,
    articleUrl: undefined,
  }));
}

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
          {
            "@type": "ListItem",
            position: 1,
            name: t("jsonLd.breadcrumbHome", "Home"),
            item: "https://www.indexiagroup.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("jsonLd.breadcrumbNews", "News & Knowledge Centre"),
            item: "https://www.indexiagroup.com/news",
          },
        ],
      },
    ],
  };
};

/**
 * Group articles by their raw category key (finance, warehouse, export, athlete).
 */
function groupByCategory(articles: ArticleItem[]): Record<string, ArticleItem[]> {
  const result: Record<string, ArticleItem[]> = {
    finance: [],
    warehouse: [],
    export: [],
    athlete: [],
  };

  // Reverse-map display names back to keys
  const displayToKey: Record<string, string> = {
    Finance: "finance",
    Warehousing: "warehouse",
    "Trade & Export": "export",
    Sports: "athlete",
  };

  for (const article of articles) {
    const key = displayToKey[article.category] ?? article.category.toLowerCase();
    if (result[key]) {
      result[key].push(article);
    }
  }

  return result;
}

export const useNewsContent = () => {
  const { t } = useTranslation();
  const { news: liveNews, loading } = useLiveNews(15);
  const tr = (path: string, fallback: string) =>
    t(`pageContent.news.${path}`, { defaultValue: fallback });

  // Merge live articles with static fallback
  const allArticles = mergeArticles(liveNews, newsArticles);

  // Apply translations to article titles/excerpts from static data
  const articles = allArticles.map((a) => ({
    ...a,
    title: a.articleUrl ? a.title : tr(`articles.${a.slug}.title`, a.title),
    category: a.articleUrl
      ? a.category
      : tr(`articles.${a.slug}.category`, a.category),
    excerpt: a.articleUrl
      ? a.excerpt
      : tr(`articles.${a.slug}.excerpt`, a.excerpt),
  }));

  const insights = knowledgeInsights.map((ins) => ({
    ...ins,
    title: tr(`insights.${ins.key}.title`, ins.title),
    body: tr(`insights.${ins.key}.body`, ins.body),
  }));

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a !== featured);
  const articlesByCategory = groupByCategory(articles);

  return { articles, insights, featured, latest, articlesByCategory, loading };
};
