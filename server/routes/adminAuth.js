// Admin authentication routes: one-time setup (register), login, logout, /me.
//
// Security model:
// - The password is only ever compared against a bcrypt hash (bcryptjs).
// - The session (and its HTTP-only cookie) is the only credential after login.
// - Registration is one-shot: once an admin exists the endpoint is closed and
//   never overwrites or adds accounts.
// - Errors are intentionally generic ("Invalid credentials.") so the endpoint
//   reveals nothing about the admin record or the database.
// - Passwords and hashes are never logged.
import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import Admin from "../models/Admin.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { isDBConnected } from "../db.js";

const router = Router();

const BCRYPT_ROUNDS = 12;
const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 20; // bcrypt operates on at most 72 bytes

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 5, // 5 attempts per window
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true, // successful logins don't count toward the limit
  message: { ok: false, error: "Too many attempts. Please try again later." },
});

const setupLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { ok: false, error: "Too many attempts. Please try again later." },
});

// Dummy hash used for a bcrypt compare when no admin exists yet, so login
// response timing doesn't reveal whether an account is configured.
let dummyHash = null;
async function getDummyHash() {
  if (!dummyHash) dummyHash = await bcrypt.hash("indexia-dummy-password", BCRYPT_ROUNDS);
  return dummyHash;
}

// Shared validation for register/login bodies. Returns an error message or null.
function validatePasswordBody(body) {
  const password = body?.password;
  if (typeof password !== "string" || password.length === 0) {
    return "Password is required.";
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return `Password must be at most ${MAX_PASSWORD_LENGTH} characters long.`;
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must contain at least one letter and one number.";
  }
  return null;
}

// Optional one-time setup secret. When ADMIN_SETUP_TOKEN is configured, the
// register endpoint additionally requires the `x-admin-setup-token` header.
function setupTokenValid(req) {
  const expected = (process.env.ADMIN_SETUP_TOKEN || "").trim();
  if (!expected) return true; // not configured → no extra header required
  const provided = String(req.headers["x-admin-setup-token"] || "").trim();
  return provided.length > 0 && provided.length === expected.length &&
    provided === expected;
}

// ── POST /api/admin/register — ONE-TIME initial setup ──────────────
// Create the single admin account. Rejected forever once an admin exists.
router.post("/register", setupLimiter, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ ok: false, error: "Database unavailable. Please try again later." });
  }

  const error = validatePasswordBody(req.body);
  if (error) return res.status(400).json({ ok: false, error });

  if (!setupTokenValid(req)) {
    return res.status(403).json({ ok: false, error: "Invalid setup token." });
  }

  try {
    // Never overwrite or add to an existing admin. A second record must not
    // be creatable even in a race, hence the unique index + re-check.
    const existing = await Admin.findOne().lean();
    if (existing) {
      return res.status(409).json({ ok: false, error: "Admin already configured." });
    }

    const passwordHash = await bcrypt.hash(req.body.password, BCRYPT_ROUNDS);
    try {
      await Admin.create({ passwordHash });
    } catch (err) {
      if (err?.code === 11000) {
        return res.status(409).json({ ok: false, error: "Admin already configured." });
      }
      throw err;
    }

    console.log("[auth] Admin account created via setup endpoint.");
    return res.status(201).json({ ok: true, message: "Admin registered successfully." });
  } catch (err) {
    console.error("[auth] Registration failed:", err?.message || err);
    return res.status(500).json({ ok: false, error: "Registration failed. Please try again later." });
  }
});

// ── POST /api/admin/login — password check → session cookie ────────
router.post("/login", authLimiter, async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ ok: false, error: "Service unavailable. Please try again later." });
  }

  const password = req.body?.password;
  if (typeof password !== "string" || password.length === 0) {
    return res.status(400).json({ ok: false, error: "Password is required." });
  }

  try {
    // select("+passwordHash"): the field is excluded from queries by default.
    const admin = await Admin.findOne().select("+passwordHash");

    // Always run one bcrypt compare — against the real hash or a dummy one —
    // so response timing never reveals whether an admin account exists.
    let valid = false;
    try {
      if (admin) {
        valid = await bcrypt.compare(password, admin.passwordHash);
      } else {
        await bcrypt.compare(password, await getDummyHash());
      }
    } catch {
      valid = false;
    }

    if (!valid) {
      return res.status(401).json({ ok: false, error: "Invalid credentials." });
    }

    req.session.isAdmin = true;
    req.session.createdAt = new Date().toISOString();

    // Regenerate the session ID on login so a pre-auth session identifier
    // can never be reused (session fixation defence).
    await new Promise((resolve, reject) =>
      req.session.regenerate((err) => (err ? reject(err) : resolve()))
    );
    req.session.isAdmin = true;

    console.log("[auth] Admin login succeeded.");
    return res.json({ ok: true, message: "Logged in successfully." });
  } catch (err) {
    console.error("[auth] Login error:", err?.message || err);
    return res.status(500).json({ ok: false, error: "Login failed. Please try again later." });
  }
});

// ── POST /api/admin/logout — destroy session, clear cookie ─────────
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

// ── GET /api/admin/me — is this browser authenticated? ─────────────
// Returns 200 + { authenticated: true } when logged in, 401 otherwise.
router.get("/me", (req, res) => {
  if (req.session?.isAdmin) {
    return res.json({ ok: true, authenticated: true });
  }
  return res.status(401).json({ ok: false, authenticated: false });
});

export default router;
