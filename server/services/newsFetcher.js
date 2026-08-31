import NewsArticle from "../models/NewsArticle.js";

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

// Category keyword mappings
const CATEGORY_KEYWORDS = {
  finance: [
    "banking", "finance", "NBFC", "investment", "loans", "interest rates",
    "RBI", "markets", "fintech", "financial services", "credit", "capital",
    "mutual fund", "stock market", "IPO", "bank", "insurance",
  ],
  warehouse: [
    "warehousing", "logistics", "supply chain", "storage",
    "industrial real estate", "fulfillment", "cold storage",
    "warehouse leasing", "distribution centre", "container", "freight",
  ],
  export: [
    "India exports", "international trade", "export", "imports",
    "trade policy", "DGFT", "customs", "global trade", "trade war",
    "tariff", "FTZ", "free trade",
  ],
  athlete: [
    "Indian athletes", "sports", "Olympics", "sports business",
    "athlete endorsements", "cricket", "badminton", "athletics",
    "sports funding", "Olympic Games", "athlete training",
  ],
};

// Build search queries per category
const SEARCH_QUERIES = {
  finance: "banking OR finance OR NBFC OR investment OR loans OR RBI OR fintech",
  warehouse: "warehousing OR logistics OR supply chain OR storage OR warehouse",
  export: "India export OR international trade OR DGFT OR customs",
  athlete: "Indian athletes OR sports OR Olympics OR athlete",
};

/**
 * Fetch news for a single category from NewsData.io
 */
async function fetchCategoryNews(category) {
  if (!NEWSDATA_API_KEY) {
    console.log("[news] NEWSDATA_API_KEY not set — skipping fetch.");
    return [];
  }

  const query = SEARCH_QUERIES[category];
  if (!query) return [];

  const params = new URLSearchParams({
    apikey: NEWSDATA_API_KEY,
    q: query,
    language: "en",
    country: "in",
    removeduplicate: "1",
    size: "10",
  });

  const url = `https://newsdata.io/api/1/latest?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[news] API error for ${category}:`, response.status);
      return [];
    }
    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.log(`[news] No results for ${category}`);
      return [];
    }

    return data.results
      .filter((item) => item.title && item.link)
      .map((item) => ({
        title: item.title,
        description: item.description || item.content || "",
        image: item.image_url || "",
        source: item.source_name || item.source_id || "Unknown",
        sourceUrl: item.source_url || item.link,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        category,
        keywords: CATEGORY_KEYWORDS[category] || [],
        articleUrl: item.link,
      }));
  } catch (err) {
    console.error(`[news] Fetch error for ${category}:`, err.message);
    return [];
  }
}

/**
 * Fetch and store news for all categories.
 * Deduplicates by articleUrl and keeps only the most recent articles per category.
 */
export async function fetchAndStoreNews() {
  console.log("[news] Starting scheduled news fetch...");

  const categories = ["finance", "warehouse", "export", "athlete"];
  const MAX_PER_CATEGORY = 10;

  const results = await Promise.allSettled(
    categories.map((cat) => fetchCategoryNews(cat))
  );

  let totalFetched = 0;
  let totalStored = 0;

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const articles =
      results[i].status === "fulfilled" ? results[i].value : [];

    totalFetched += articles.length;

    // Filter out duplicates (already in DB)
    const existingUrls = new Set(
      (
        await NewsArticle.find({
          category,
          articleUrl: { $in: articles.map((a) => a.articleUrl) },
        }).select("articleUrl")
      ).map((a) => a.articleUrl)
    );

    const newArticles = articles.filter(
      (a) => !existingUrls.has(a.articleUrl)
    );

    if (newArticles.length > 0) {
      await NewsArticle.insertMany(newArticles, { ordered: false }).catch(
        () => {}
      );
      totalStored += newArticles.length;
    }

    // Keep only the top MAX_PER_CATEGORY per category — delete older ones
    const allCategoryArticles = await NewsArticle.find({ category })
      .sort({ publishedAt: -1 })
      .select("_id");

    if (allCategoryArticles.length > MAX_PER_CATEGORY) {
      const idsToDelete = allCategoryArticles
        .slice(MAX_PER_CATEGORY)
        .map((a) => a._id);
      await NewsArticle.deleteMany({ _id: { $in: idsToDelete } });
    }

    console.log(
      `[news] ${category}: fetched ${articles.length}, stored ${newArticles.length}`
    );
  }

  console.log(
    `[news] Fetch complete. Total fetched: ${totalFetched}, new stored: ${totalStored}`
  );
  return { totalFetched, totalStored };
}

/**
 * Get cached news articles for a category, sorted by date (newest first).
 */
export async function getNewsByCategory(category, limit = 5) {
  return NewsArticle.find({ category })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean();
}

/**
 * Get all cached news articles, grouped by category.
 */
export async function getAllNews(limit = 5) {
  const categories = ["finance", "warehouse", "export", "athlete"];
  const result = {};

  for (const cat of categories) {
    result[cat] = await NewsArticle.find({ category: cat })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();
  }

  return result;
}
