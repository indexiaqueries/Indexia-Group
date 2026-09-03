import cors from "cors";
import express from "express";
import multer from "multer";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { connectDB, isDBConnected } from "./db.js";
import Application from "./models/Application.js";
import Enquiry from "./models/Enquiry.js";
import JobOpening from "./models/JobOpening.js";
import adminRoutes from "./routes/admin.js";
import newsRoutes from "./routes/news.js";
import { startNewsScheduler } from "./services/newsScheduler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IS_VERCEL = Boolean(process.env.VERCEL);

const PORT = Number(process.env.PORT);
const DIST_DIR = path.resolve(__dirname, "../dist");
const RESUME_DIR = path.resolve(__dirname, "uploads/resumes");
if (!IS_VERCEL) mkdirSync(RESUME_DIR, { recursive: true });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.use(cors());
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
  seedOpenings();
  if (!IS_VERCEL) startNewsScheduler();
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    dbConfigured: Boolean(process.env.MONGODB_URI),
    dbConnected: isDBConnected(),
  });
});

// Mount admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/news", newsRoutes);

// ── Job Openings CRUD ─────────────────────────────────────────────

// Public: list active openings
app.get("/api/openings", async (_req, res) => {
  try {
    const openings = await JobOpening.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ ok: true, openings });
  } catch (err) {
    console.error("Failed to fetch openings:", err);
    res.status(500).json({ ok: false, error: "Could not fetch openings." });
  }
});

// Admin: list all openings (including inactive)
app.get("/api/admin/openings", async (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  try {
    const openings = await JobOpening.find().sort({ createdAt: -1 });
    res.json({ ok: true, openings });
  } catch (err) {
    console.error("Failed to fetch openings:", err);
    res.status(500).json({ ok: false, error: "Could not fetch openings." });
  }
});

// Admin: create opening
app.post("/api/admin/openings", async (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  const { title, department, company, location, type, description, requirements } = req.body ?? {};
  if (!title || !department || !type) {
    return res.status(400).json({ ok: false, error: "Title, department, and type are required." });
  }
  try {
    const opening = await JobOpening.create({
      title,
      department,
      company: company || "Indexia Group",
      location: location || "Mumbai",
      type,
      description: description || "",
      requirements: requirements || [],
    });
    res.json({ ok: true, opening });
  } catch (err) {
    console.error("Failed to create opening:", err);
    res.status(500).json({ ok: false, error: "Could not create opening." });
  }
});

// Admin: update opening
app.patch("/api/admin/openings/:id", async (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  try {
    const opening = await JobOpening.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!opening) return res.status(404).json({ ok: false, error: "Opening not found." });
    res.json({ ok: true, opening });
  } catch (err) {
    console.error("Failed to update opening:", err);
    res.status(500).json({ ok: false, error: "Could not update opening." });
  }
});

// Admin: delete opening
app.delete("/api/admin/openings/:id", async (req, res) => {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  try {
    const opening = await JobOpening.findByIdAndDelete(req.params.id);
    if (!opening) return res.status(404).json({ ok: false, error: "Opening not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete opening:", err);
    res.status(500).json({ ok: false, error: "Could not delete opening." });
  }
});

// Seed openings from hardcoded data if DB is empty
async function seedOpenings() {
  try {
    const count = await JobOpening.countDocuments();
    if (count > 0) return;
    console.log("[seed] No openings found, seeding from defaults...");
    const defaults = [
      { title: "Finance Intern", department: "Finance", company: "Indexia Group", location: "Mumbai", type: "Intern", description: "Gain hands-on experience in financial operations, loan processing, and banking procedures.", requirements: ["Currently pursuing or recently completed degree in Finance/Commerce", "Interest in financial services and banking", "Proficiency in MS Excel and basic financial tools"] },
      { title: "HR Intern", department: "Human Resources", company: "Indexia Group", location: "Mumbai", type: "Intern", description: "Learn end-to-end HR processes including recruitment, onboarding, and employee management.", requirements: ["Currently pursuing or recently completed degree in HR/Management", "Strong communication and interpersonal skills", "Basic knowledge of HR practices"] },
      { title: "Digital Marketing Intern", department: "Digital Marketing", company: "Indexia Group", location: "Mumbai", type: "Intern", description: "Assist in digital marketing campaigns, SEO optimization, and social media management.", requirements: ["Currently pursuing or recently completed degree in Marketing/Communications", "Knowledge of SEO, SEM, and social media platforms", "Creative thinking and analytical skills"] },
      { title: "IT Intern", department: "Information Technology", company: "Indexia Group", location: "Mumbai", type: "Intern", description: "Support IT infrastructure, software development, and technical operations.", requirements: ["Currently pursuing or recently completed degree in Computer Science/IT", "Basic programming knowledge", "Interest in software development and IT systems"] },
      { title: "Digital Marketing Executive", department: "Digital Marketing", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "Lead digital marketing strategies including SEO, SEM, social media marketing, and content creation to drive online presence and lead generation.", requirements: ["Minimum 1 year experience in digital marketing", "Strong knowledge of SEO, SEM, and SMO", "Experience with Google Analytics, Ads, and social media tools", "Excellent communication and analytical skills"] },
      { title: "IT Developer", department: "Information Technology", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "Develop and maintain software applications, manage databases, and support IT infrastructure across the organization.", requirements: ["Minimum 1 year experience as a full-stack developer", "Proficiency in frontend and backend technologies", "Experience with databases and API development", "Strong problem-solving and debugging skills"] },
      { title: "HR Executive", department: "Human Resources", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "Manage end-to-end HR processes including profile hiring, shortlisting candidates, conducting interviews, managing joining formalities, induction, training, salary management, and exit formalities.", requirements: ["Minimum 1 year experience in HR", "End-to-end recruitment experience from hiring to exit", "Knowledge of HR policies, salary management, and employee relations", "Strong interpersonal and organizational skills"] },
      { title: "Customer Support Associate (CSA)", department: "Customer Support", company: "Indexia Finserve Pvt. Ltd.", location: "Delhi", type: "Full-time", description: "Handle customer inquiries across all loan products, provide end-to-end support from application to disbursal, and ensure a seamless customer experience at Indexia Finserve.", requirements: ["Handle inbound/outbound calls for loan enquiries (Personal, Business, Home, LAP, etc.)", "Guide customers through eligibility, documentation, and application process", "Maintain customer records and follow up on pending applications", "Coordinate with banks and NBFCs for loan processing updates", "Resolve customer complaints and escalate issues when necessary", "Achieve monthly targets for customer engagement and satisfaction", "Strong communication skills in English and Hindi", "Basic knowledge of financial products and banking processes"] },
      { title: "Executive Assistant to Director", department: "Administration", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "Support the Director in managing multiple profiles, coordinating schedules, handling correspondence, and acting as a supporting hand for day-to-day operations.", requirements: ["Minimum 1 year experience as EA or similar administrative role", "Ability to handle multiple profiles and priorities", "Excellent organizational and time management skills", "Proficiency in MS Office and communication tools", "Discretion and professionalism in handling confidential matters"] },
    ];
    await JobOpening.insertMany(defaults);
    console.log("[seed] Seeded " + defaults.length + " openings.");
  } catch (err) {
    console.error("[seed] Failed:", err.message);
  }
}

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

if (existsSync(path.join(DIST_DIR, "index.html"))) {
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(DIST_DIR, "index.html"));
    }
    next();
  });
}
} // end if (!IS_VERCEL)

// SPA fallback, serve index.html for all non-API GET requests.
// On Vercel the Express app is invoked as a serverless function and the
// rewrites in vercel.json may not reach the static file, so we handle it
// here as well.  On the standalone server the express.static middleware
// above already serves the file, but this catch-all is a safety net.
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
