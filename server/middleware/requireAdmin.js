// Shared auth guard for admin-only routes.
// Reads the token from the `x-admin-token` header or `?token=` query param.
// Returns 503 when ADMIN_TOKEN is not configured, 401 on mismatch.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ ok: false, error: "Admin auth not configured. Set ADMIN_TOKEN in .env." });
  }
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  next();
}