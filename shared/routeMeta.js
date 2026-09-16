export const BASE_URL = "https://www.indexiagroup.com";
export const SITE_NAME = "Indexia Group";

const COMPANIES = [
  { slug: "finance", name: "Indexia Finance", tag: "Multinational Fintech", desc: "Global fintech across investor services, FDI, NBFC, and banking funding." },
  { slug: "finserve", name: "Indexia Finserve Pvt. Ltd.", tag: "Investment & Finance", desc: "Every type of loan, the right bank at your doorstep." },
  { slug: "overseas", name: "Indexia Overseas Pvt. Ltd.", tag: "Global Edible Export", desc: "Premium refined sugar and edible commodities exported to 14 South American countries." },
  { slug: "agro-bio", name: "Indexia Agro Bio Fertilizers Pvt. Ltd.", tag: "Organic Agriculture Solutions", desc: "Scientifically formulated organic fertilizers that restore soil health and maximize crop yield." },
  { slug: "securities", name: "Indexia Securities", tag: "Armed Protection & Security", desc: "Military-grade armed security for high-profile individuals, corporations, and critical infrastructure." },
  { slug: "warehouse", name: "Indexia Warehouse", tag: "Strategic Land Investment", desc: "21 acres of strategic land investment in Shamli, linked to 8 national expressways and 4 major ports." },
  { slug: "advertising", name: "Indexia Advertising", tag: "Premium Unipole Hoardings", desc: "Dominate the most strategic highway junction in North India with high-impact outdoor advertising." },
  { slug: "foundation", name: "Indexia Foundation", tag: "Athlete Development & Support", desc: "Comprehensive support for Indian athletes, from grassroots talent to the Olympic Games." },
];

const ROUTE_META = {
  "/": {
    title: SITE_NAME,
    description:
      "Indexia Group brings Financial Services, Loans, Export, Warehousing, Agro, Security, Advertising, and Athlete Support together under one diversified Indian business group.",
    image: `${BASE_URL}/images/og/group.jpg`
  },
  "/about": {
    title: "About Indexia Group",
    description:
      "About Indexia Group, a diversified Indian business group spanning Finance, Export, Agriculture, Warehousing, Security, Advertising, and Athlete Support. Founded in 2012.",
    image: `${BASE_URL}/images/og/about.jpg`,
  },
  "/contact": {
    title: "Contact Us, Delhi & Mumbai Offices",
    description:
      "Contact Indexia Group for Financial Services, Loans, Export, Agro and Warehousing enquiries. Offices in Delhi, Mumbai and Ecuador, replies within 24 hours.",
    image: `${BASE_URL}/images/og/contact.jpg`,
  },
  "/careers": {
    title: "Careers at Indexia Group",
    description:
      "Careers at Indexia Group, a learning organization with opportunities across our diverse businesses. Mail your resume to start your career with us.",
    image: `${BASE_URL}/images/og/careers.jpg`,
  },
  "/news": {
    title: "News & Knowledge Centre",
    description:
      "News & Knowledge Centre, latest banking news on funding, digital payments, and policy, plus practical knowledge guides from Indexia Group.",
    image: `${BASE_URL}/images/og/news.jpg`,
  },
  "/global-research": {
    title: "Global Research at Indexia Group",
    description:
      "Indexia Group Global Research, insightful, relevant analyses and incisive views across macroeconomic, fixed income, currency, and commodity disciplines, with on-the-ground insight across Asia, Africa, and the Middle East.",
    image: `${BASE_URL}/images/og/global-research.jpg`,
  },
  "/security-tips": {
    title: "Security Tips from Indexia Group",
    description:
      "Security tips from Indexia Group, how we protect your accounts online, what you can do on your devices, and who to contact if something goes wrong.",
    image: `${BASE_URL}/images/og/security-tips.jpg`,
  },
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
  "/admin": { title: "Admin", description: "", noindex: true },
  "/admin/login": { title: "Admin Login", description: "", noindex: true },
};

// Company pages get their own generated OG image (1200×630 JPEG, produced by scripts/generate-og-images.mjs from the company hero art).
for (const c of COMPANIES) {
  ROUTE_META[`/${c.slug}`] = {
    title: `${c.name} - ${c.tag}`,
    description: c.desc,
    image: `${BASE_URL}/images/og/${c.slug}.jpg`,
  };
}

export const ROUTES = ROUTE_META;
export const COMPANY_SLUGS = COMPANIES.map((c) => c.slug);

// ── HTML surgery helpers ──────────────────────────────────────────
// index.html meta tags span multiple lines, so [^>] (which matches newlines) is used instead of [^\n].

export const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function replaceMeta(html, attr, key, value) {
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

export function removeMeta(html, attr, key) {
  return html.replace(new RegExp(`<meta[^>]*\\s${attr}="${key}"[^>]*>\\s*`, "i"), "");
}

export function replaceTitle(html, value) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${value}</title>`);
}

export function replaceCanonical(html, value) {
  return html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    `$1${value}$2`
  );
}

export function replaceRobots(html, value) {
  html = replaceMeta(html, "name", "robots", value);
  return replaceMeta(html, "name", "googlebot", value);
}

export function buildPreviewHtml(template, preview, canonicalPath) {
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
