// Custom URL previews — server-side Open Graph / Twitter meta injection.
//
// This is a client-rendered SPA: crawlers that unfurl shared links
// (WhatsApp, Facebook, X/Twitter, LinkedIn, Slack, Telegram, Discord,
// iMessage…) do not execute JavaScript, so every shared URL would fall
// back to the generic homepage tags baked into index.html. This
// middleware rewrites the <head> for known crawler user agents, giving
// each public route its own preview title, description, and image.
// Real browsers are untouched and keep receiving index.html verbatim.

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const BASE_URL = "https://www.indexiagroup.com";
const SITE_NAME = "Indexia Group";

// ── Per-route preview metadata ────────────────────────────────────
// Titles/descriptions mirror the en.json SEO strings the client sets
// via <SEO>, so crawler previews match what users see in the tab.
// `image` is optional; omit it to keep the default og-image.png.

const PREVIEWS = {
  "/": {
    title: "Financial Services, Loans, Export & Warehousing",
    description:
      "Indexia Group brings Financial Services, Loans, Export, Warehousing, Agro, Security, Advertising, and Athlete Support together under one diversified Indian business group.",
  },
  "/about": {
    title: "About Indexia Group",
    description:
      "About Indexia Group, a diversified Indian business group spanning Finance, Export, Agriculture, Warehousing, Security, Advertising, and Athlete Support. Founded in 2012.",
  },
  "/contact": {
    title: "Contact Us, Mumbai & Delhi Offices",
    description:
      "Contact Indexia Group for Financial Services, Loans, Export, Agro and Warehousing enquiries. Offices in Mumbai, Delhi and Ecuador, replies within 24 hours.",
  },
  "/careers": {
    title: "Careers at Indexia Group",
    description:
      "Careers at Indexia Group, a learning organization with opportunities across our diverse businesses. Mail your resume to start your career with us.",
  },
  "/news": {
    title: "News & Knowledge Centre",
    description:
      "News & Knowledge Centre, latest banking news on funding, digital payments, and policy, plus practical knowledge guides from Indexia Group.",
    image: `${BASE_URL}/images/heroes/news-hero.webp`,
  },
  "/global-research": {
    title: "Global Research at Indexia Group",
    description:
      "Indexia Group Global Research, insightful, relevant analyses and incisive views across macroeconomic, fixed income, currency, and commodity disciplines, with on-the-ground insight across Asia, Africa, and the Middle East.",
    image: `${BASE_URL}/images/heroes/research-hero.webp`,
  },
  "/security-tips": {
    title: "Security Tips from Indexia Group",
    description:
      "Security tips from Indexia Group, how we protect your accounts online, what you can do on your devices, and who to contact if something goes wrong.",
    image: `${BASE_URL}/images/heroes/security-hero.webp`,
  },

  // Brochure landing pages (robots.txt-blocked, so noindex here too).
  "/warehouse-brochure": {
    title: "Indexia Warehouse Brochure",
    description:
      "Download the Indexia Warehouse brochure — 21 acres of strategic land leasing in Shamli, UP with 8 expressway connectivity.",
    noindex: true,
  },
  "/advertising-brochure": {
    title: "Indexia Advertising Brochure",
    description:
      "Download the Indexia Advertising brochure — premium unipole hoardings on the Delhi–Dehradun highway (NH-709B).",
    noindex: true,
  },

  // Legal pages.
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "How Indexia Group collects, uses, and protects your personal information.",
  },
  "/terms-of-use": {
    title: "Terms of Use",
    description: "The terms governing your use of the Indexia Group website.",
  },
  "/terms": {
    title: "Terms",
    description: "The terms governing your use of the Indexia Group website.",
  },
};

// Company spotlight pages: kept in sync with src/data/companies.ts so
// names, tags, and descriptions match what the client renders.
const COMPANIES = [
  { slug: "finance", name: "Indexia Finance", tag: "Multinational Fintech", desc: "Global fintech across investor services, FDI, NBFC, and banking funding." },
  { slug: "finserve", name: "Indexia Finserve Pvt. Ltd.", tag: "Investment & Finance", desc: "Every type of loan, the right bank at your doorstep." },
  { slug: "overseas", name: "Indexia Overseas Pvt. Ltd.", tag: "Global Edible Export", desc: "Premium refined sugar and edible commodities exported to 14 South American countries." },
  { slug: "agro-bio", name: "Indexia Agro Bio Fertilizers Pvt. Ltd.", tag: "Organic Agriculture Solutions", desc: "Scientifically formulated organic fertilizers that restore soil health and maximize crop yield." },
  { slug: "securities", name: "Indexia Securities", tag: "Armed Protection & Security", desc: "Military-grade armed security for high-profile individuals, corporations, and critical infrastructure." },
  { slug: "warehouse", name: "Indexia Warehouse", tag: "Strategic Land Leasing", desc: "21 acres of strategic land on lease to companies in Shamli, linked to 8 national expressways." },
  { slug: "advertising", name: "Indexia Advertising", tag: "Premium Unipole Hoardings", desc: "Premium hoardings on Indian highways, majorly the Delhi–Dehradun highway." },
  { slug: "foundation", name: "Indexia Foundation", tag: "Athlete Development & Support", desc: "Comprehensive support for Indian athletes, from grassroots talent to the Olympic Games." },
];
for (const c of COMPANIES) {
  PREVIEWS[`/${c.slug}`] = {
    title: `${c.name} - ${c.tag}`,
    description: c.desc,
  };
}

// Admin is never indexable; unfurlers get a plain noindex page.
PREVIEWS["/admin"] = { title: "Admin", description: "", noindex: true };
PREVIEWS["/admin/login"] = { title: "Admin Login", description: "", noindex: true };

// ── Crawler detection ─────────────────────────────────────────────
// Social unfurlers only. Search engines (Googlebot etc.) render
// JavaScript and are served the normal SPA so they can index content.

const CRAWLER_UA_RE =
  /(facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|TelegramBot|WhatsApp|Discordbot|SkypeUriPreview|Embedly|Quora Link Preview|vkShare|Pinterestbot|outbrain)/i;

// ── HTML surgery helpers ──────────────────────────────────────────
// index.html meta tags span multiple lines, so [^>] (which matches
// newlines) is used instead of [^\n].

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function replaceMeta(html, attr, key, value) {
  const tagRe = new RegExp(`<meta[^>]*\\s${attr}="${key}"[^>]*>`, "i");
  const match = html.match(tagRe);
  if (!match) return html;

  let tag = match[0];
  if (/content="/i.test(tag)) {
    tag = tag.replace(/content="[^"]*"/i, `content="${value}"`);
  } else {
    tag = tag.replace(/>$/, ` content="${value}">`);
  }
  return html.slice(0, match.index) + tag + html.slice(match.index + match[0].length);
}

function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`<meta[^>]*\\s${attr}="${key}"[^>]*>\\s*`, "i"), "");
}

function replaceTitle(html, value) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${value}</title>`);
}

function replaceCanonical(html, value) {
  return html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    `$1${value}$2`
  );
}

function replaceRobots(html, value) {
  html = replaceMeta(html, "name", "robots", value);
  return replaceMeta(html, "name", "googlebot", value);
}

function buildPreviewHtml(template, preview, canonicalPath) {
  const url = `${BASE_URL}${canonicalPath}`;
  // Same rule as SEO.tsx: append the site name unless the title already is it.
  const fullTitle =
    preview.title === SITE_NAME ? preview.title : `${preview.title} | ${SITE_NAME}`;
  const description = escapeHtml(preview.description);
  const alt = escapeHtml(`${fullTitle} preview`);
  const hasCustomImage = Boolean(preview.image);

  let html = template;
  html = replaceTitle(html, escapeHtml(fullTitle));
  html = replaceCanonical(html, url);
  html = replaceMeta(html, "name", "description", description);
  if (preview.noindex) {
    // Keep robots.txt (blocks /admin, /careers/apply, brochures) and the
    // client-side <SEO noindex> posture consistent for unfurlers too.
    html = replaceRobots(html, "noindex, nofollow, noarchive");
  }
  html = replaceMeta(html, "property", "og:title", escapeHtml(fullTitle));
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image:alt", alt);
  html = replaceMeta(html, "name", "twitter:title", escapeHtml(fullTitle));
  html = replaceMeta(html, "name", "twitter:description", description);
  html = replaceMeta(html, "name", "twitter:image:alt", alt);

  if (hasCustomImage) {
    // Custom image: declared 1200x630 in the template would be wrong, so
    // drop the dimension hints and let platforms size it themselves.
    html = replaceMeta(html, "property", "og:image", preview.image);
    html = replaceMeta(html, "name", "twitter:image", preview.image);
    html = removeMeta(html, "property", "og:image:width");
    html = removeMeta(html, "property", "og:image:height");
  }
  // No custom image: the template's default og-image.png stays untouched.

  return html;
}

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

    const preview = PREVIEWS[req.path];
    if (!preview) return next(); // Unknown paths keep the default tags.

    const template = loadTemplate();
    if (!template) return next();

    res.set("Cache-Control", "no-store");
    res.type("html").send(buildPreviewHtml(template, preview, req.path));
  };
}
