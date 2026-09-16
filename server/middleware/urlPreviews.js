// Custom URL previews — server-side Open Graph / Twitter meta injection.
//
// This is a client-rendered SPA: crawlers that unfurl shared links
// (WhatsApp, Facebook, X/Twitter, LinkedIn, Slack, Telegram, Discord,
// iMessage…) do not execute JavaScript, so every shared URL would fall
// back to the generic homepage tags baked into index.html. This
// middleware rewrites the <head> for known crawler user agents, giving
// each public route its own preview title, description, and image.
// Real browsers are untouched and keep receiving index.html verbatim.
//
// All route metadata and HTML surgery live in shared/routeMeta.js (also
// applied to the static deployment by the routeHtml() Vite plugin).

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ROUTES, buildPreviewHtml } from "../shared/routeMeta.js";

// ── Crawler detection ─────────────────────────────────────────────
// Social unfurlers only. Search engines (Googlebot etc.) render
// JavaScript and are served the normal SPA so they can index content.

const CRAWLER_UA_RE =
  /(facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|TelegramBot|WhatsApp|Discordbot|SkypeUriPreview|Embedly|Quora Link Preview|vkShare|Pinterestbot|outbrain)/i;

// ── Middleware ────────────────────────────────────────────────────

export default function urlPreviews({ distDir }) {
  const indexPath = path.join(distDir, "index.html");
  let cachedTemplate = null;
  let templateLoaded = false;

  const loadTemplate = () => {
    if (templateLoaded) return cachedTemplate;
    templateLoaded = true;
    if (existsSync(indexPath)) {
      cachedTemplate = readFileSync(indexPath, "utf8");
    } else {
      console.warn("[previews] dist/index.html not found — link previews disabled until a build exists.");
    }
    return cachedTemplate;
  };

  return (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    if (req.path.startsWith("/api")) return next();
    if (!CRAWLER_UA_RE.test(String(req.headers["user-agent"] || ""))) return next();

    const preview = ROUTES[req.path];
    if (!preview) return next(); // Unknown paths keep the default tags.

    const template = loadTemplate();
    if (!template) return next();

    res.set("Cache-Control", "no-store");
    res.type("html").send(buildPreviewHtml(template, preview, req.path));
  };
}
