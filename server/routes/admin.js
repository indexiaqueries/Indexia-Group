import { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Application from "../models/Application.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESUME_DIR = path.resolve(__dirname, "../uploads/resumes");

const router = Router();

// Simple admin token auth — set ADMIN_TOKEN in .env
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

function requireAuth(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ ok: false, error: "Admin auth not configured. Set ADMIN_TOKEN in .env." });
  }
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized." });
  }
  next();
}

// List all applications (newest first)
router.get("/applications", requireAuth, async (_req, res) => {
  try {
    const apps = await Application.find()
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    res.json({ ok: true, count: apps.length, applications: apps });
  } catch (err) {
    console.error("[admin] List error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch applications." });
  }
});

// Get single application
router.get("/applications/:id", requireAuth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).select("-__v").lean();
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });
    res.json({ ok: true, application: app });
  } catch (err) {
    console.error("[admin] Get error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch application." });
  }
});

// ── Status change email templates ──────────────────────────────

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const STATUS_CONFIG = {
  pending: {
    subject: "Your application is under review — Indexia Group",
    heading: "Application Under Review",
    message: "Your application for <strong>{role}</strong> at Indexia Group is currently under review by our HR team.",
    note: "We will get back to you shortly with an update.",
    color: "#f59e0b",
  },
  reviewed: {
    subject: "Your application has been reviewed — Indexia Group",
    heading: "Application Reviewed",
    message: "Your application for <strong>{role}</strong> at Indexia Group has been reviewed by our HR team.",
    note: "If your profile matches our requirements, we will reach out to you for the next steps.",
    color: "#3b82f6",
  },
  shortlisted: {
    subject: "Congratulations! You've been shortlisted — Indexia Group",
    heading: "You've Been Shortlisted!",
    message: "Great news! Your application for <strong>{role}</strong> at Indexia Group has been shortlisted.",
    note: "Our HR team will contact you soon to schedule the next round of interviews. Please keep your phone accessible.",
    color: "#10b981",
  },
  rejected: {
    subject: "Update on your application — Indexia Group",
    heading: "Application Update",
    message: "Thank you for applying for <strong>{role}</strong> at Indexia Group. After careful consideration, we have decided to move forward with other candidates at this time.",
    note: "We encourage you to apply again for future openings that match your skills. We wish you the very best in your career.",
    color: "#ef4444",
  },
};

function buildStatusEmail({ name, role, status }) {
  const cfg = STATUS_CONFIG[status];
  const body = cfg.message.replace("{role}", escapeHtml(role));

  const text = [
    cfg.heading,
    "",
    `Hi ${name},`,
    "",
    body.replace(/<[^>]+>/g, ""),
    "",
    cfg.note,
    "",
    "Warm regards,",
    "The Indexia Group HR Team",
    "",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
        <div style="background:${cfg.color};color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
          ${escapeHtml(cfg.heading)}
        </div>
        <div style="padding:20px 24px;color:#111827;font-size:15px;line-height:1.7">
          <p style="margin:0 0 12px">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 12px">${body}</p>
          <p style="margin:0 0 12px">${cfg.note}</p>
          <p style="margin:0">Warm regards,<br />The Indexia Group HR Team</p>
        </div>
        <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
          This is an automated notification — please do not reply to this email.
        </div>
      </div>
    </div>`;

  return { subject: cfg.subject, text, html };
}

// Update application status
router.patch("/applications/:id", requireAuth, async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "reviewed", "shortlisted", "rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ ok: false, error: `Status must be one of: ${allowed.join(", ")}` });
  }
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-__v");
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });

    // Send status update email to applicant
    const sendMail = req.app.locals.sendMail;
    if (sendMail && app.email) {
      try {
        await sendMail({
          to: app.email,
          ...buildStatusEmail({ name: app.name, role: app.roleTitle, status }),
        });
        console.log(`[admin] Status email sent to ${app.email} — ${status}`);
      } catch (mailErr) {
        console.error(`[admin] Failed to send status email to ${app.email}:`, mailErr.message);
      }
    }

    res.json({ ok: true, application: app });
  } catch (err) {
    console.error("[admin] Update error:", err);
    res.status(500).json({ ok: false, error: "Failed to update application." });
  }
});

// Serve resume file
router.get("/applications/:id/resume", requireAuth, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).select("resumePath resumeFileName").lean();
    if (!app || !app.resumePath) {
      return res.status(404).json({ ok: false, error: "Resume not found." });
    }
    const filePath = path.resolve(RESUME_DIR, app.resumePath);
    // Prevent path traversal
    if (!filePath.startsWith(RESUME_DIR)) {
      return res.status(403).json({ ok: false, error: "Access denied." });
    }
    res.sendFile(filePath, { root: "/" });
  } catch (err) {
    console.error("[admin] Resume error:", err);
    res.status(500).json({ ok: false, error: "Failed to serve resume." });
  }
});

// Delete application
router.delete("/applications/:id", requireAuth, async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("[admin] Delete error:", err);
    res.status(500).json({ ok: false, error: "Failed to delete application." });
  }
});

export default router;
