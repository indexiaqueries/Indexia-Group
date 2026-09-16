import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { ROUTES, buildPreviewHtml } from "../../shared/routeMeta.js";

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
    if (!preview) return next();

    const template = loadTemplate();
    if (!template) return next();

    res.set("Cache-Control", "no-store");
    res.type("html").send(buildPreviewHtml(template, preview, req.path));
  };
}
