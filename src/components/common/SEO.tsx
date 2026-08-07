import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
};

const SITE_NAME = "Indexia Group";
const BASE_URL = "https://www.indexiagroup.com";
const DEFAULT_OG_IMAGE = "/favicon.svg";

const SEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const canonical = canonicalPath
      ? `${BASE_URL}${canonicalPath}`
      : `${BASE_URL}/`;

    const ogUrl = canonicalPath
      ? `${BASE_URL}${canonicalPath}`
      : `${BASE_URL}/`;

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Basic SEO
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // Canonical link
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // Open Graph
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", ogUrl);
    setMeta("property", "og:image", `https://www.indexiagroup.com${ogImage}`);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `https://www.indexiagroup.com${ogImage}`);
  }, [title, description, keywords, canonicalPath, ogType, ogImage, noindex]);

  return null;
};

export default SEO;
