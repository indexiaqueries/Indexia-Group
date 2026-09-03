/**
 * Base URL for backend API calls.
 *
 * When deploying the frontend to a different host than the backend
 * (e.g. Hostinger + Render), set `VITE_API_URL` at build time:
 *
 *   VITE_API_URL=https://indexia-group.onrender.com npm run build
 *
 * Leave it unset (or empty) when frontend and backend share the same origin
 * and relative `/api/...` paths work directly.
 */
export const API_BASE: string = import.meta.env.VITE_API_URL ?? "";
