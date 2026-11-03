// Admin authentication routes: login, logout, and /me.
// The dashboard password comes from ADMIN_PASSWORD and creates an HTTP-only
// session cookie after a successful login.
import { Router } from "express";
import rateLimit from "express-rate-limit";

const router = Router();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { ok: false, error: "Too many attempts. Please try again later." },
});

// POST /api/admin/login — fixed password check → session cookie
router.post("/login", authLimiter, async (req, res) => {
  const password = req.body?.password;
  if (typeof password !== "string" || password.length === 0) {
    return res.status(400).json({ ok: false, error: "Password is required." });
  }

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Invalid credentials." });
  }

  // Regenerate the session ID on login so a pre-auth session identifier
  // can never be reused (session fixation defence).
  await new Promise((resolve, reject) =>
    req.session.regenerate((err) => (err ? reject(err) : resolve()))
  );
  req.session.isAdmin = true;

  console.log("[auth] Admin login succeeded.");
  return res.json({ ok: true, message: "Logged in successfully." });
});

// POST /api/admin/logout — destroy session, clear cookie
router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ ok: true, message: "Logged out successfully." });
  }
  req.session.destroy(() => {
    // Clear the session cookie even if destroying the store entry failed.
    res.clearCookie("admin.sid");
    res.json({ ok: true, message: "Logged out successfully." });
  });
});

// GET /api/admin/me — is this browser authenticated?
router.get("/me", (req, res) => {
  if (req.session?.isAdmin) {
    return res.json({ ok: true, authenticated: true });
  }
  return res.status(401).json({ ok: false, authenticated: false });
});

export default router;
