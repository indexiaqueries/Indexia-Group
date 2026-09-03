import cors from "cors";
import express from "express";
import multer from "multer";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import nodemailer from "nodemailer";
import { connectDB } from "./db.js";
import Application from "./models/Application.js";
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

const mailTo = process.env.MAIL_TO;
const mailFrom = process.env.MAIL_FROM;

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const rejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "true";

let transporter = null;
if (smtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized },
    connectionTimeout: 10_000,
    socketTimeout: 10_000,
    greetingTimeout: 10_000,
  });
}

async function sendMail({ to = mailTo, subject, text, html }) {
  if (!transporter) {
    console.log(`\n[mail:dev] SMTP not configured, email NOT sent.\nTo: ${to}\nSubject: ${subject}\n${text}\n`);
    return { delivered: false, dev: true };
  }
  const info = await Promise.race([
    transporter.sendMail({ from: mailFrom, to, subject, text, html }),
    new Promise((_, reject) => setTimeout(() => reject(new Error("SMTP send timed out")), 15_000)),
  ]);
  console.log(`[mail:sent] "${subject}" -> ${to}`);
  return { delivered: true };
}

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildContactEmail({ name, phone, email, subject, message }) {

  const cleanSubject = (subject || "General enquiry").trim();
  const text = [
    `New website enquiry for ${cleanSubject}`,
    "",
    `Company: ${cleanSubject}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
  ].join("\n");

  const row = (label, value) =>
    `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(label)}</td></tr>` +
    `<tr><td style="padding:0 0 14px;color:#111827;font-size:15px">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
        <div style="background:#066a9c;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
          New Website Enquiry, ${escapeHtml(cleanSubject)}
        </div>
        <table style="width:100%;border-collapse:collapse;padding:0 24px">
          <tr><td style="padding:20px 24px 0">
            <table style="width:100%;border-collapse:collapse">
              ${row("Company", cleanSubject)}
              ${row("Name", name)}
              ${row("Phone", phone)}
              ${row("Email", email)}
              ${row("Message", message)}
            </table>
          </td></tr>
        </table>
        <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
          Sent from the Indexia Group website contact form.
        </div>
      </div>
    </div>`;

  return { subject: `New website enquiry for ${cleanSubject}`, text, html };
}

function buildAutoReplyEmail({ name, email, subject }) {
  const cleanSubject = (subject || "your enquiry").trim();
  return {
    subject: "We received your enquiry - Indexia Group",
    text: [
      `Hi ${name},`,
      "",
      `Thank you for reaching out to Indexia Group. We have received your enquiry for "${cleanSubject}"`,
      "and a member of our team will get back to you within 24 hours.",
      "",
      "While you wait, you can explore our businesses at https://indexiagroup.com or call us",
      "on +91 86551 68551 for anything urgent.",
      "",
      "Warm regards,",
      "The Indexia Group team",
      "",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
          <div style="background:#066a9c;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
            Thank you, ${escapeHtml(name)}
          </div>
          <div style="padding:20px 24px;color:#111827;font-size:15px;line-height:1.7">
            <p style="margin:0 0 12px">Thanks for reaching out to <strong>Indexia Group</strong>. We have received your enquiry
              for <em>&ldquo;${escapeHtml(cleanSubject)}&rdquo;</em> and a member of our team will get back to you within 24 hours.</p>
            <p style="margin:0 0 12px">For anything urgent, call us on <strong>+91 86551 68551</strong>.</p>
            <p style="margin:0">Warm regards,<br />The Indexia Group team</p>
          </div>
          <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
            This is an automated acknowledgement - please do not reply to this email.
          </div>
        </div>
      </div>`,
  };
}

const HR_EMAILS = "hr@indexiafinance.com,hr.indexia@gmail.com";

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

// Connect to MongoDB (non-blocking)
connectDB().then(() => {
  seedOpenings();
  if (!IS_VERCEL) startNewsScheduler();
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, smtpConfigured, mailTo });
});

// Make sendMail available to admin routes
app.locals.sendMail = sendMail;

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
      { title: "Customer Support Associate (CSA)", department: "Customer Support", company: "Indexia Finserve Pvt. Ltd.", location: "Mumbai", type: "Full-time", description: "Handle customer inquiries across all loan products, provide end-to-end support from application to disbursal, and ensure a seamless customer experience at Indexia Finserve.", requirements: ["Handle inbound/outbound calls for loan enquiries (Personal, Business, Home, LAP, etc.)", "Guide customers through eligibility, documentation, and application process", "Maintain customer records and follow up on pending applications", "Coordinate with banks and NBFCs for loan processing updates", "Resolve customer complaints and escalate issues when necessary", "Achieve monthly targets for customer engagement and satisfaction", "Strong communication skills in English and Hindi", "Basic knowledge of financial products and banking processes"] },
      { title: "Executive Assistant to Director", department: "Administration", company: "Indexia Group", location: "Mumbai", type: "Full-time", description: "Support the Director in managing multiple profiles, coordinating schedules, handling correspondence, and acting as a supporting hand for day-to-day operations.", requirements: ["Minimum 1 year experience as EA or similar administrative role", "Ability to handle multiple profiles and priorities", "Excellent organizational and time management skills", "Proficiency in MS Office and communication tools", "Discretion and professionalism in handling confidential matters"] },
    ];
    await JobOpening.insertMany(defaults);
    console.log("[seed] Seeded " + defaults.length + " openings.");
  } catch (err) {
    console.error("[seed] Failed:", err.message);
  }
}

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body ?? {};
  const messageText = String(message ?? "").trim();

  if (!name || !phone || !email || !subject || !messageText) {
    return res.status(400).json({ ok: false, error: "Name, phone, email, subject and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    const result = await sendMail(buildContactEmail({ name, phone, email, subject, message: messageText }));

    // Fire auto-reply in background — don't block the response
    sendMail({ ...buildAutoReplyEmail({ name, email, subject }), to: email }).catch((replyErr) => {
      console.error("Failed to send auto-reply:", replyErr);
    });

    res.json({ ok: true, dev: result.dev });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    res.status(500).json({ ok: false, error: "Could not send your message. Please try again later." });
  }
});

function buildApplyEmail({ name, email, phone, experience, intro, roleTitle, department, resumeUrl }) {
  const cleanRole = (roleTitle || "Open Position").trim();
  const cleanDept = (department || "General").trim();

  const text = [
    `New job application for ${cleanRole}`,
    "",
    `Position: ${cleanRole}`,
    `Department: ${cleanDept}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Experience: ${experience || "Not specified"}`,
    "",
    "About the applicant:",
    intro,
    "",
    resumeUrl ? `Resume: ${resumeUrl}` : "",
    "",
  ].join("\n");

  const row = (label, value) =>
    `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(label)}</td></tr>` +
    `<tr><td style="padding:0 0 14px;color:#111827;font-size:15px">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
        <div style="background:#26ae90;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
          Job Application, ${escapeHtml(cleanRole)}
        </div>
        <table style="width:100%;border-collapse:collapse;padding:0 24px">
          <tr><td style="padding:20px 24px 0">
            <table style="width:100%;border-collapse:collapse">
              ${row("Position", cleanRole)}
              ${row("Department", cleanDept)}
              ${row("Name", name)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Experience", experience || "Not specified")}
              ${row("About the applicant", intro)}
              ${resumeUrl ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">Resume</td></tr><tr><td style="padding:0 0 14px"><a href="${escapeHtml(resumeUrl)}" style="color:#26ae90;font-size:15px;font-weight:600;text-decoration:underline">View Resume</a></td></tr>` : ""}
            </table>
          </td></tr>
        </table>
        <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
          Sent from the Indexia Group Careers page.
        </div>
      </div>
    </div>`;

  return { subject: `New job application for ${cleanRole}, ${name}`, text, html };
}

function buildApplyAutoReply({ name, roleTitle }) {
  const cleanRole = (roleTitle || "the position").trim();
  return {
    subject: "Application Received, Indexia Group",
    text: [
      `Hi ${name},`,
      "",
      `Thank you for applying for the position of ${cleanRole} at Indexia Group.`,
      "We have received your application and a member of our HR team will review it shortly.",
      "",
      "If your profile matches our requirements, we will get back to you within 5-7 business days.",
      "",
      "Warm regards,",
      "The Indexia Group HR Team",
      "",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
          <div style="background:#26ae90;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
            Application Received, ${escapeHtml(name)}
          </div>
          <div style="padding:20px 24px;color:#111827;font-size:15px;line-height:1.7">
            <p style="margin:0 0 12px">Thank you for applying for the position of <strong>${escapeHtml(cleanRole)}</strong> at <strong>Indexia Group</strong>.</p>
            <p style="margin:0 0 12px">We have received your application and a member of our HR team will review it shortly. If your profile matches our requirements, we will get back to you within 5-7 business days.</p>
            <p style="margin:0">Warm regards,<br />The Indexia Group HR Team</p>
          </div>
          <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
            This is an automated acknowledgement, please do not reply to this email.
          </div>
        </div>
      </div>`,
  };
}

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

    // Respond immediately — fire emails in background
    res.json({ ok: true, applicationId: application._id });

    // Send email notification to HR (with resume URL)
    const resumeUrl = `${req.protocol}://${req.get("host")}/api/admin/applications/${application._id}/resume?token=${process.env.ADMIN_TOKEN || ""}`;
    sendMail({
      to: HR_EMAILS,
      ...buildApplyEmail({ name, email, phone, experience, intro: introText, roleTitle, department, resumeUrl }),
    }).catch((mailErr) => {
      console.error("Failed to send application email:", mailErr);
    });

    // Send auto-reply
    sendMail({ ...buildApplyAutoReply({ name, roleTitle }), to: email }).catch((replyErr) => {
      console.error("Failed to send application auto-reply:", replyErr);
    });
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
    console.log(smtpConfigured ? `Email delivery via SMTP → ${mailTo}` : "SMTP not configured, emails will be logged to the console (dev mode). Set SMTP_* env vars to enable delivery.");
  });
}

export default app;
