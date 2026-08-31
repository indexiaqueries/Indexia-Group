import { fetchAndStoreNews } from "./newsFetcher.js";
import NewsArticle from "../models/NewsArticle.js";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
const STALE_THRESHOLD_MS = 12 * 60 * 60 * 1000; // 12 hours

let intervalId = null;

/**
 * Check if the DB already has recent articles (less than 6 hours old).
 * Skips the initial fetch to save API quota on frequent restarts.
 */
async function isDatabaseFresh() {
  try {
    const newest = await NewsArticle.findOne().sort({ createdAt: -1 }).select("createdAt").lean();
    if (!newest) return false; // empty DB — needs fetch
    const age = Date.now() - new Date(newest.createdAt).getTime();
    return age < STALE_THRESHOLD_MS;
  } catch {
    return false; // on error, fetch anyway
  }
}

/**
 * Start the news fetch scheduler.
 * Runs immediately on start (unless DB is fresh), then every 24 hours.
 */
export function startNewsScheduler() {
  if (!process.env.NEWSDATA_API_KEY) {
    console.log(
      "[news:scheduler] NEWSDATA_API_KEY not set — scheduler disabled."
    );
    return;
  }

  console.log("[news:scheduler] Starting scheduler (every 24 hours)...");

  // Run immediately — but skip if DB already has recent articles
  isDatabaseFresh().then((fresh) => {
    if (fresh) {
      console.log("[news:scheduler] DB is fresh (< 12h old) — skipping initial fetch.");
      return;
    }
    console.log("[news:scheduler] DB is stale or empty — fetching now...");
    return fetchAndStoreNews().catch((err) =>
      console.error("[news:scheduler] Initial fetch failed:", err.message)
    );
  });

  // Then every 24 hours
  intervalId = setInterval(() => {
    fetchAndStoreNews().catch((err) =>
      console.error("[news:scheduler] Scheduled fetch failed:", err.message)
    );
  }, TWENTY_FOUR_HOURS_MS);
}

/**
 * Stop the news fetch scheduler.
 */
export function stopNewsScheduler() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("[news:scheduler] Scheduler stopped.");
  }
}
