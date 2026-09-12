// Session middleware — server-side sessions backed by MongoDB.
//
// Login creates a session; every later request authenticates via the
// HTTP-only session cookie (nothing sensitive is ever stored in the browser).
// Sessions survive server restarts because the store
// lives in MongoDB, not in server memory.
import session from "express-session";
import MongoStore from "connect-mongo";

const IS_PROD = process.env.NODE_ENV === "production";

// Fail fast at import time rather than silently generating sessions that
// nobody can log into. Never print the secret itself.
if (!process.env.SESSION_SECRET) {
  throw new Error(
    "[auth] SESSION_SECRET is not set. Add a strong random value to your environment (see server/.env.example)."
  );
}

// Cookie policy:
// - httpOnly: client-side JavaScript can never read the session cookie.
// - sameSite: production defaults to "none" because the frontend
//   (indexiagroup.com) and the API (onrender.com) are different sites — lax
//   cookies are dropped on the cross-site login POST, so the session would
//   silently vanish right after a successful login. Browsers only accept
//   None over HTTPS, where `secure: "auto"` also marks the cookie Secure.
//   Same-origin deployments or testing can override with COOKIE_SAMESITE=lax.
// - secure "auto": the Secure attribute is present on HTTPS deployments and
//   absent on plain HTTP, so local testing with Postman/curl still works.
const SAME_SITE =
  (process.env.COOKIE_SAMESITE || (IS_PROD ? "none" : "lax")).toLowerCase();

function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: SAME_SITE,
    secure: "auto",
    maxAge: 1000 * 60 * 60 * 12, // 12 hours
  };
}

const SESSION_OPTIONS = {
  name: "admin.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: sessionCookieOptions(),
  // Sessions roll over every 12h of total lifetime; refreshing the page
  // keeps an active admin logged in.
  rolling: true,
  // TLS terminates upstream (Render) in production, so honour
  // X-Forwarded-Proto when deciding whether the request is secure.
  proxy: IS_PROD,
};

export default function createSessionMiddleware() {
  if (!process.env.MONGODB_URI) {
    // Matches db.js: the rest of the site degrades gracefully without Mongo.
    // Admin login then only works per-process (memory store) — fine for
    // local development; real deployments configure MONGODB_URI.
    console.warn("[auth] MONGODB_URI not set: using in-memory session store (sessions reset on restart).");
    return session(SESSION_OPTIONS);
  }

  const store = new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
    ttl: 60 * 60 * 12, // 12 hours (mirrors cookie.maxAge)
    autoRemove: "interval",
    autoRemoveInterval: 60, // minutes
  });

  return session({ ...SESSION_OPTIONS, store });
}
