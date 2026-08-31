import { Router } from "express";
import {
  getNewsByCategory,
  getAllNews,
  fetchAndStoreNews,
} from "../services/newsFetcher.js";

const router = Router();

/**
 * GET /api/news
 * Returns all cached news articles grouped by category.
 * Query params:
 *   ?category=finance|warehouse|export|athlete  (optional — filters to one category)
 *   ?limit=5                                     (optional — max articles per category, default 5)
 */
router.get("/", async (req, res) => {
  try {
    const { category, limit } = req.query;
    const numLimit = Math.min(Math.max(parseInt(limit, 10) || 5, 1), 20);

    if (category) {
      if (!["finance", "warehouse", "export", "athlete"].includes(category)) {
        return res
          .status(400)
          .json({ ok: false, error: "Invalid category." });
      }
      const articles = await getNewsByCategory(category, numLimit);
      return res.json({ ok: true, category, articles });
    }

    const news = await getAllNews(numLimit);
    res.json({ ok: true, news });
  } catch (err) {
    console.error("[news:api] Error:", err);
    res.status(500).json({ ok: false, error: "Could not fetch news." });
  }
});

/**
 * POST /api/news/refresh
 * Triggers a manual refresh of all news categories.
 * Protected by admin token.
 */
router.post("/refresh", async (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }

  try {
    const result = await fetchAndStoreNews();
    res.json({ ok: true, ...result });
  } catch (err) {
    console.error("[news:api] Refresh error:", err);
    res
      .status(500)
      .json({ ok: false, error: "Could not refresh news." });
  }
});

export default router;
