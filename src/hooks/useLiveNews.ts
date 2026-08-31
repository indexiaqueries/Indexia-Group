import { useEffect, useState } from "react";

export type LiveArticle = {
  title: string;
  description: string;
  link: string;            // article URL
  image: string;           // image_url
  videoUrl: string;        // video_url
  sourceId: string;        // source_id
  sourceName: string;      // source_name
  sourceUrl: string;       // source_url
  sourceIcon: string;      // source_icon
  sourcePriority: number;  // source_priority
  creator: string[];       // author names
  keywords: string[];
  language: string;
  country: string[];
  categories: string[];    // API categories e.g. ["business","top"]
  datatype: string;
  pubDate: string;         // ISO date string
  articleId: string;       // article_id
  category: string;        // mapped: finance|warehouse|export|athlete
};

type NewsResponse = {
  ok: boolean;
  news?: Record<string, LiveArticle[]>;
  articles?: LiveArticle[];
  error?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "";

/**
 * Fetch live news articles from the backend API.
 * Falls back to empty arrays if the API is unavailable.
 */
export function useLiveNews(limit = 5) {
  const [news, setNews] = useState<Record<string, LiveArticle[]>>({
    finance: [],
    warehouse: [],
    export: [],
    athlete: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      try {
        const res = await fetch(
          `${API_BASE}/api/news?limit=${limit}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: NewsResponse = await res.json();

        if (cancelled) return;

        if (data.ok && data.news) {
          setNews(data.news);
        } else {
          setError(data.error || "Failed to load news");
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Network error");
        // Fallback: empty arrays (static data will be used as fallback)
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { news, loading, error };
}

/**
 * Fetch news for a single category.
 */
export function useLiveCategoryNews(
  category: "finance" | "warehouse" | "export" | "athlete",
  limit = 5
) {
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchNews() {
      try {
        const res = await fetch(
          `${API_BASE}/api/news?category=${category}&limit=${limit}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: NewsResponse = await res.json();

        if (cancelled) return;

        if (data.ok && data.articles) {
          setArticles(data.articles);
        } else {
          setError(data.error || "Failed to load news");
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Network error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      cancelled = true;
    };
  }, [category, limit]);

  return { articles, loading, error };
}
