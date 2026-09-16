export const BASE_URL = "https://www.indexiagroup.com";
export const SITE_NAME = "Indexia Group";

const COMPANIES = [
  { slug: "finance", desc: "Global fintech across investor services, FDI, NBFC, and banking funding." },
  { slug: "finserve", desc: "Every type of loan, the right bank at your doorstep." },
  { slug: "overseas", desc: "Premium refined sugar and edible commodities exported to 14 South American countries." },
  { slug: "agro-bio", desc: "Scientifically formulated organic fertilizers that restore soil health and maximize crop yield." },
  { slug: "securities", desc: "Military-grade armed security for high-profile individuals, corporations, and critical infrastructure." },
  { slug: "warehouse", desc: "21 acres of strategic land investment in Shamli, linked to 8 national expressways and 4 major ports." },
  { slug: "advertising", desc: "Dominate the most strategic highway junction in North India with high-impact outdoor advertising." },
  { slug: "foundation", desc: "Comprehensive support for Indian athletes, from grassroots talent to the Olympic Games." },
];

const NOINDEX_ROUTES = new Set([
  "/warehouse-brochure",
  "/advertising-brochure",
  "/admin",
  "/admin/login",
]);

const ROUTE_DESCRIPTIONS = {
  "/":
    "Indexia Group brings Financial Services, Loans, Export, Warehousing, Agro, Security, Advertising, and Athlete Support together under one diversified Indian business group.",
  "/about":
    "About Indexia Group, a diversified Indian business group spanning Finance, Export, Agriculture, Warehousing, Security, Advertising, and Athlete Support. Founded in 2012.",
  "/contact":
    "Contact Indexia Group for Financial Services, Loans, Export, Agro and Warehousing enquiries. Offices in Delhi, Mumbai and Ecuador, replies within 24 hours.",
  "/careers":
    "Careers at Indexia Group, a learning organization with opportunities across our diverse businesses. Mail your resume to start your career with us.",
  "/news":
    "News & Knowledge Centre, latest banking news on funding, digital payments, and policy, plus practical knowledge guides from Indexia Group.",
  "/global-research":
    "Indexia Group Global Research, insightful, relevant analyses and incisive views across macroeconomic, fixed income, currency, and commodity disciplines, with on-the-ground insight across Asia, Africa, and the Middle East.",
  "/security-tips":
    "Security tips from Indexia Group, how we protect your accounts online, what you can do on your devices, and who to contact if something goes wrong.",
  "/privacy-policy": "How Indexia Group collects, uses, and protects your personal information.",
  "/terms-of-use": "The terms governing your use of the Indexia Group website.",
  "/terms": "The terms governing your use of the Indexia Group website.",
  "/warehouse-brochure":
    "Download the Indexia Warehouse brochure — 21 acres of strategic land leasing in Shamli, UP with 8 expressway connectivity.",
  "/advertising-brochure":
    "Download the Indexia Advertising brochure — premium unipole hoardings on the Delhi–Dehradun highway (NH-709B).",
  "/admin": { title: "Admin", description: "" },
  "/admin/login": { title: "Admin Login", description: "" },
  ...Object.fromEntries(COMPANIES.map((c) => [`/${c.slug}`, c.desc])),
};

export const ROUTES = Object.fromEntries(
  Object.entries(ROUTE_DESCRIPTIONS).map(([route, desc]) => [
    route,
    typeof desc === "string"
      ? {
          title: desc,
          description: desc,
          ...(NOINDEX_ROUTES.has(route) ? { noindex: true } : {}),
        }
      : { ...desc, ...(NOINDEX_ROUTES.has(route) ? { noindex: true } : {}) },
  ])
);

export const COMPANY_SLUGS = COMPANIES.map((c) => c.slug);

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
  const fullTitle =
    preview.title === SITE_NAME ? preview.title : `${preview.title} | ${SITE_NAME}`;
  const description = escapeHtml(preview.description);
  const alt = escapeHtml(`${fullTitle} preview`);

  let html = template;
  html = replaceTitle(html, escapeHtml(fullTitle));
  html = replaceCanonical(html, url);
  html = replaceMeta(html, "name", "description", description);
  if (preview.noindex) {
    html = replaceRobots(html, "noindex, nofollow, noarchive");
  }
  html = replaceMeta(html, "property", "og:title", escapeHtml(fullTitle));
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "property", "og:url", url);
  html = replaceMeta(html, "property", "og:image:alt", alt);
  html = replaceMeta(html, "name", "twitter:title", escapeHtml(fullTitle));
  html = replaceMeta(html, "name", "twitter:description", description);
  html = replaceMeta(html, "name", "twitter:image:alt", alt);

  return html;
}
