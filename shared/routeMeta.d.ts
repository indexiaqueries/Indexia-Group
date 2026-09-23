export declare const BASE_URL: string;
export declare const SITE_NAME: string;

export type RoutePreview = {
  title: string;
  description: string;
  noindex?: boolean;
  /** Alias routes: canonical URL path of the page this route mirrors. */
  canonical?: string;
  /** Alias routes: emit a static redirect shell to this path instead of full HTML. */
  redirect?: string;
};

export declare const ROUTES: Record<string, RoutePreview>;
export declare const COMPANY_SLUGS: string[];

export declare function escapeHtml(value: string): string;
export declare function replaceMeta(
  html: string,
  attr: "name" | "property",
  key: string,
  value: string,
): string;
export declare function replaceTitle(html: string, value: string): string;
export declare function replaceCanonical(html: string, value: string): string;
export declare function replaceRobots(html: string, value: string): string;
export declare function buildPreviewHtml(
  template: string,
  preview: RoutePreview,
  canonicalPath: string,
): string;
