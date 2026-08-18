import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object;
};

const SITE_NAME = "Indexia Group";
const BASE_URL = "https://www.indexiagroup.com";
const DEFAULT_OG_IMAGE = "/og-image.png";
const DEFAULT_LOCALE = "en_IN";

const SEO = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const path = canonicalPath ?? "/";
    const canonical = `${BASE_URL}${path}`;
    const absoluteImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "author", SITE_NAME);
    setMeta("name", "publisher", SITE_NAME);
    setMeta("name", "robots", noindex ? "noindex, nofollow, noarchive" : "index, follow, max-image-preview:large");
    setMeta("name", "googlebot", noindex ? "noindex, nofollow, noarchive" : "index, follow, max-image-preview:large");

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:locale", DEFAULT_LOCALE);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", absoluteImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", `${fullTitle} preview`);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteImage);
    setMeta("name", "twitter:image:alt", `${fullTitle} preview`);

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoJsonld = "true";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, keywords, canonicalPath, ogType, ogImage, noindex, jsonLd]);

  return null;
};

export default SEO;
