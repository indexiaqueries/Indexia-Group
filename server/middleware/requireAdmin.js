// Auth guard for admin-only routes (server-side session).
//
// The React dashboard is UX only — the backend session is the actual security
// boundary. A missing/invalid session never reaches a protected handler.
export function requireAdmin(req, res, next) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  next();
}