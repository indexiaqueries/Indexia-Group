import NewsArticle from "../models/NewsArticle.js";

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

// Build search queries per category
const SEARCH_QUERIES = {
  finance: "banking OR finance OR NBFC OR investment OR RBI OR fintech OR stock market OR loans",
  warehouse: "warehousing OR logistics OR supply chain OR storage OR warehouse OR freight OR cold storage",
  export: "export OR international trade OR DGFT OR customs OR imports OR tariff OR trade policy",
  athlete: "sports OR Olympics OR athlete OR cricket OR badminton OR athletics OR sports business",
};

/**
 * Normalize a title for fuzzy deduplication.
 * Lowercases, strips common filler words, and collapses whitespace.
 */
const FILLER_WORDS = /^(the|a|an|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|shall|should|may|might|can|could|of|in|to|for|with|on|at|by|from|as|into|through|during|before|after|above|below|between|out|off|over|under|again|further|then|once|here|there|when|where|why|how|all|each|every|both|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|just|about)$/gi;

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !FILLER_WORDS.test(w));
}

/**
 * Jaccard similarity between two word sets.
 * Returns a value between 0 (no overlap) and 1 (identical).
 */
function jaccardSimilarity(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((w) => setB.has(w));
  const union = new Set([...setA, ...setB]);
  return intersection.length / union.size;
}

function deduplicateByTitle(articles) {
  const seen = []; // array of { words, index }
  return articles.filter((a) => {
    const words = normalizeTitle(a.title);
    if (words.length === 0) return true;
    // Check against all previously seen titles
    for (const entry of seen) {
      if (jaccardSimilarity(words, entry.words) >= 0.7) {
        return false; // too similar — duplicate
      }
    }
    seen.push({ words });
    return true;
  });
}

/**
 * Build a MongoDB document from a NewsData.io API result item.
 * Maps every relevant field from the API response.
 */
function mapApiResult(item, category) {
  return {
    // Core identifiers
    articleId: item.article_id || "",
    link: item.link,

    // Content
    title: item.title,
    description: item.description || "",

    // Keywords & creators
    keywords: Array.isArray(item.keywords) ? item.keywords.filter(Boolean) : [],
    creator: Array.isArray(item.creator) ? item.creator.filter(Boolean) : [],

    // Language & geo
    language: item.language || "en",
    country: Array.isArray(item.country) ? item.country : item.country ? [item.country] : [],

    // Categories from API (e.g. ["business","top"])
    categories: Array.isArray(item.category) ? item.category : item.category ? [item.category] : [],
    datatype: item.datatype || "news",

    // Dates
    pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),

    // Media
    image: item.image_url || "",
    videoUrl: item.video_url || "",

    // Source metadata
    sourceId: item.source_id || "",
    sourceName: item.source_name || "",
    sourceUrl: item.source_url || "",
    sourceIcon: item.source_icon || "",
    sourcePriority: item.source_priority || 0,

    // Derived field for frontend filtering
    category,
  };
}

const MAX_PAGES_PER_CATEGORY = 2; // free tier: ~10 req/hour, stay conservative
const REQUEST_DELAY_MS = 8000; // 8 seconds between requests to avoid 429
const RETRY_DELAY_MS = 30000; // 30 seconds backoff on 429
const MAX_RETRIES = 2;

/**
 * Wait helper.
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch one page from NewsData.io with retry on 429.
 * Returns { articles, nextPage }.
 */
async function fetchPage(url, retries = MAX_RETRIES) {
  const response = await fetch(url);

  if (response.status === 429) {
    if (retries > 0) {
      console.log(`[news] Rate limited (429) — waiting ${RETRY_DELAY_MS / 1000}s then retrying (${retries} left)...`);
      await wait(RETRY_DELAY_MS);
      return fetchPage(url, retries - 1);
    }
    console.error(`[news] Rate limited (429) — no retries left, skipping.`);
    return { articles: [], nextPage: null };
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`[news] API error: ${response.status} — ${body}`);
    return { articles: [], nextPage: null };
  }

  const data = await response.json();
  const articles = (data.results || [])
    .filter((item) => item.title && item.link && !item.duplicate);
  return { articles, nextPage: data.nextPage || null };
}

/**
 * Fetch news for a single category from NewsData.io.
 * Uses nextPage token to paginate, with delays between requests.
 */
async function fetchCategoryNews(category) {
  if (!NEWSDATA_API_KEY) {
    console.log("[news] NEWSDATA_API_KEY not set — skipping fetch.");
    return [];
  }

  const query = SEARCH_QUERIES[category];
  if (!query) return [];

  const allArticles = [];
  let nextPage = null;
  let pagesFetched = 0;

  // Page 1
  const baseUrl = `https://newsdata.io/api/1/latest?apikey=${NEWSDATA_API_KEY}&q=${encodeURIComponent(query)}&language=en&removeduplicate=1&size=10`;
  const first = await fetchPage(baseUrl);
  allArticles.push(...first.articles.map((item) => mapApiResult(item, category)));
  nextPage = first.nextPage;
  pagesFetched = 1;

  // Pages 2+ — follow pagination token with delay between each request
  for (let page = 2; page <= MAX_PAGES_PER_CATEGORY && nextPage; page++) {
    await wait(REQUEST_DELAY_MS);
    const pageUrl = `${baseUrl}&page=${nextPage}`;
    const result = await fetchPage(pageUrl);
    allArticles.push(...result.articles.map((item) => mapApiResult(item, category)));
    nextPage = result.nextPage;
    pagesFetched = page;
  }

  console.log(`[news] ${category}: fetched ${allArticles.length} articles across ${pagesFetched} pages`);
  return allArticles;
}

/**
 * Fetch and store news for all categories.
 * Deduplicates by link and keeps only the most recent articles per category.
 */
export async function fetchAndStoreNews() {
  console.log("[news] Starting scheduled news fetch...");

  const categories = ["finance", "warehouse", "export", "athlete"];
  const MAX_PER_CATEGORY = 15;

  let totalFetched = 0;
  let totalStored = 0;

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    if (i > 0) {
      console.log(`[news] Waiting ${REQUEST_DELAY_MS / 1000}s before next category...`);
      await wait(REQUEST_DELAY_MS);
    }
    let articles = await fetchCategoryNews(category);
    const beforeDedup = articles.length;
    articles = deduplicateByTitle(articles);
    if (articles.length < beforeDedup) {
      console.log(`[news] ${category}: removed ${beforeDedup - articles.length} title-duplicate(s)`);
    }
    totalFetched += articles.length;

    if (articles.length === 0) {
      console.log(`[news] ${category}: no articles fetched`);
      continue;
    }

    // Filter out duplicates (already in DB by link)
    const links = articles.map((a) => a.link);
    const existingLinks = new Set(
      (
        await NewsArticle.find({
          category,
          link: { $in: links },
        }).select("link")
      ).map((a) => a.link)
    );

    const newArticles = articles.filter(
      (a) => !existingLinks.has(a.link)
    );

    if (newArticles.length > 0) {
      try {
        await NewsArticle.insertMany(newArticles, { ordered: false });
        totalStored += newArticles.length;
      } catch (err) {
        // ordered:false means partial inserts are OK — log the error for debugging
        console.error(`[news] ${category}: insertMany error —`, err.message);
        // Count how many actually got inserted
        const insertedCount = err.insertedDocs?.length || 0;
        totalStored += insertedCount;
        if (insertedCount > 0) {
          console.log(`[news] ${category}: ${insertedCount} of ${newArticles.length} articles inserted despite errors`);
        }
      }
    }

    // Keep only the top MAX_PER_CATEGORY per category — delete older ones
    const allCategoryArticles = await NewsArticle.find({ category })
      .sort({ pubDate: -1 })
      .select("_id");

    if (allCategoryArticles.length > MAX_PER_CATEGORY) {
      const idsToDelete = allCategoryArticles
        .slice(MAX_PER_CATEGORY)
        .map((a) => a._id);
      await NewsArticle.deleteMany({ _id: { $in: idsToDelete } });
    }

    console.log(
      `[news] ${category}: fetched ${articles.length}, new stored ${newArticles.length}`
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
    .sort({ pubDate: -1 })
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
      .sort({ pubDate: -1 })
      .limit(limit)
      .lean();
  }

  return result;
}
