/**
 * Base URL for backend API calls.
 *
 * Leave `VITE_API_URL` unset for same-origin deployments (the Express
 * server serving the built frontend, or the Vite dev proxy). The fallback
 * below covers the current split deployment: the static frontend on
 * indexiagroup.com (Hostinger) with the API on Render.
 */
export const API_BASE: string =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? "https://indexia-group-website.onrender.com" : "");
