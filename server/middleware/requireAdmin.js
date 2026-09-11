// Shared auth guard for admin-only routes.
// Reads the token from the `x-admin-token` header or `?token=` query param.
// Returns 503 when ADMIN_TOKEN is not configured, 401 on mismatch.
const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || "").trim();

if (!ADMIN_TOKEN) {
  console.warn("[auth] WARNING: ADMIN_TOKEN env var is not set. Admin routes will reject all requests (503). Set ADMIN_TOKEN in your Render environment.");
}

export function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ ok: false, error: "Admin auth not configured. Set ADMIN_TOKEN in .env." });
  }
  const raw = req.headers["x-admin-token"] || req.query.token;
  const token = (typeof raw === "string" ? raw : "").trim();
  if (!token) {
    console.warn("[auth] No token provided for", req.method, req.originalUrl);
    return res.status(401).json({ ok: false, error: "No admin token provided." });
  }
  if (token !== ADMIN_TOKEN) {
    console.warn("[auth] Token mismatch for", req.method, req.originalUrl, "— received", token.length, "chars, expected", ADMIN_TOKEN.length, "chars");
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  next();
}