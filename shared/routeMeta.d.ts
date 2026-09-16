export declare const BASE_URL: string;
export declare const SITE_NAME: string;

export type RoutePreview = {
  title: string;
  description: string;
  noindex?: boolean;
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
