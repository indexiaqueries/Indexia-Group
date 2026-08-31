import { fetchAndStoreNews } from "./newsFetcher.js";

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

let intervalId = null;

/**
 * Start the news fetch scheduler.
 * Runs immediately on start, then every 6 hours.
 */
export function startNewsScheduler() {
  if (!process.env.NEWSDATA_API_KEY) {
    console.log(
      "[news:scheduler] NEWSDATA_API_KEY not set — scheduler disabled."
    );
    return;
  }

  console.log("[news:scheduler] Starting scheduler (every 24 hours)...");

  // Run immediately
  fetchAndStoreNews().catch((err) =>
    console.error("[news:scheduler] Initial fetch failed:", err.message)
  );

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
