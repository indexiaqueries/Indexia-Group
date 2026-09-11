import cors from "cors";
import express from "express";
import multer from "multer";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { connectDB, isDBConnected } from "./db.js";
import Application from "./models/Application.js";
import Enquiry from "./models/Enquiry.js";
import adminRoutes from "./routes/admin.js";
import newsRoutes from "./routes/news.js";
import openingsRouter, { adminOpeningsRouter } from "./routes/openings.js";
import holidaysRouter, { adminHolidaysRouter } from "./routes/holidays.js";
import { startNewsScheduler } from "./services/newsScheduler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IS_VERCEL = Boolean(process.env.VERCEL);

// Treat an unset or falsy PORT (e.g. an exported PORT=0) as "use 3001".
// Keeps parity with the fallback in vite.config.ts readServerPort().
const PORT = Number(process.env.PORT) || 3001;
const DIST_DIR = path.resolve(__dirname, "../dist");
const RESUME_DIR = path.resolve(__dirname, "uploads/resumes");
if (!IS_VERCEL) mkdirSync(RESUME_DIR, { recursive: true });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Browsers only enforce CORS when the frontend and API live on different
// origins — same-origin requests are always allowed. Default allowlist covers
// the production site and local Vite dev server; extend with the CORS_ORIGINS
// env var (comma-separated) for split frontend/backend deployments.
const DEFAULT_CORS_ORIGINS = [
  "https://www.indexiagroup.com",
  "https://indexiagroup.com",
  "https://indexia-group-website.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set(
  [...DEFAULT_CORS_ORIGINS, ...configuredOrigins]
);

const app = express();

// Baseline security headers. Mirrors the headers in public/.htaccess so the
// standalone Express server and Apache builds share the same posture.
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser requests (no Origin header) are never blocked.
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    // Explicitly allow the custom admin header so preflights succeed
    // across origins (e.g. indexia-group-website → indexia-group).
    allowedHeaders: ["content-type", "x-admin-token"],
  })
);
app.use(express.json({ limit: "100kb" }));

// File upload config
const storage = IS_VERCEL ? multer.memoryStorage() : multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, RESUME_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    cb(null, allowed.includes(file.mimetype));
  },
});

// Connect to MongoDB (non-blocking). Handlers await dbReady before writing so
// a cold start never races the initial connection attempt.
const dbReady = connectDB();
dbReady.then(() => {
  if (!IS_VERCEL) startNewsScheduler();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    dbConfigured: Boolean(process.env.MONGODB_URI),
    dbConnected: isDBConnected(),
  });
});

// Mount route modules
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/openings", openingsRouter);
app.use("/api/admin/openings", adminOpeningsRouter);
app.use("/api/holidays", holidaysRouter);
app.use("/api/admin/holidays", adminHolidaysRouter);

// Contact enquiries are stored in MongoDB only. The admin dashboard
// (/admin → Enquiries) is where the team reviews them.
app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body ?? {};
  const messageText = String(message ?? "").trim();

  if (!name || !phone || !email || !subject || !messageText) {
    return res.status(400).json({ ok: false, error: "Name, phone, email, subject and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  await dbReady;
  if (!isDBConnected()) {
    console.error("[contact] MongoDB unavailable, enquiry not stored.");
    return res.status(500).json({ ok: false, error: "Could not store your message. Please try again later." });
  }

  try {
    const enquiry = await Enquiry.create({ name, phone, email, subject, message: messageText });
    console.log(`[contact] Enquiry stored (${enquiry._id}) from ${name} <${email}>`);
    res.json({ ok: true, stored: true, enquiryId: enquiry._id });
  } catch (err) {
    console.error("[contact] Failed to store enquiry:", err);
    res.status(500).json({ ok: false, error: "Could not store your message. Please try again later." });
  }
});

app.post("/api/apply", upload.single("resume"), async (req, res) => {
  const { name, email, phone, experience, intro, roleTitle, department } = req.body ?? {};
  const introText = String(intro ?? "").trim();
  const resumeFile = req.file;

  if (!name || !email || !phone || !introText) {
    return res.status(400).json({ ok: false, error: "Name, email, phone and intro are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }
  if (!resumeFile) {
    return res.status(400).json({ ok: false, error: "Please upload your resume (PDF, DOC, or DOCX)." });
  }

  await dbReady;
  if (!isDBConnected()) {
    console.error("[apply] MongoDB unavailable, application not stored.");
    return res.status(500).json({ ok: false, error: "Could not submit your application. Please try again later." });
  }

  try {
    // Save to MongoDB, handle both disk and memory storage
    const appData = {
      name,
      email,
      phone,
      experience: experience || "",
      intro: introText,
      roleTitle: roleTitle || "Open Position",
      department: department || "",
      resumeFileName: resumeFile.originalname,
    };
    if (IS_VERCEL && resumeFile.buffer) {
      appData.resumeData = resumeFile.buffer.toString("base64");
      appData.resumeMime = resumeFile.mimetype;
    } else {
      appData.resumePath = resumeFile.filename;
    }
    const application = await Application.create(appData);
    console.log(`[apply] Application stored (${application._id}) from ${name} <${email}>`);
    res.json({ ok: true, applicationId: application._id });
  } catch (err) {
    console.error("Failed to submit application:", err);
    res.status(500).json({ ok: false, error: "Could not submit your application. Please try again later." });
  }
});

if (!IS_VERCEL) {
const BROTLI_RE = /\bbr\b/;
const GZIP_RE = /\bgzip\b/;

const HASH_RE = /-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;

function setCacheControl(res, filePath) {
  const base = path.basename(filePath);
  if (base === "index.html") {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
  } else if (HASH_RE.test(base)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  }
}

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  if (!existsSync(path.join(DIST_DIR, "index.html"))) return next();

  const target = path.join(DIST_DIR, decodeURIComponent(req.path.split("?")[0]));
  if (!target.startsWith(DIST_DIR) || !existsSync(target)) return next();
  try {
    if (!statSync(target).isFile()) return next();
  } catch {
    return next();
  }

  const acceptEncoding = String(req.headers["accept-encoding"] || "");
  const variant = BROTLI_RE.test(acceptEncoding) ? ".br" : GZIP_RE.test(acceptEncoding) ? ".gz" : null;
  if (!variant) return next();
  const variantPath = `${target}${variant}`;
  if (!existsSync(variantPath)) return next();

  res.set("Content-Encoding", variant === ".br" ? "br" : "gzip");
  res.set("Vary", "Accept-Encoding");
  res.type(path.extname(target));
  setCacheControl(res, target);
  return res.sendFile(variantPath);
});

app.use(
  express.static(DIST_DIR, {
    index: "index.html",
    setHeaders: setCacheControl,
  })
);

} // end if (!IS_VERCEL)

// SPA fallback: serve index.html for all non-API GET requests.
// On the standalone server, express.static above already serves real files
// and this catch-all handles client-side routes. On Vercel the Express app
// is invoked as a serverless function and the rewrites in vercel.json may
// not reach the static file, so the same fallback covers that case too.
if (existsSync(path.join(DIST_DIR, "index.html"))) {
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(DIST_DIR, "index.html"));
    }
    next();
  });
}

app.use("/api", (_req, res) => {
  res.status(404).json({ ok: false, error: "Not found." });
});

// When imported by Vercel (api/index.js), only the app is exported and the
// platform handles listening. When run directly (npm run server), listen here.
const isDirectRun =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`Indexia backend listening on http://localhost:${PORT}`);
  });
}

export default app;
