import { Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Application from "../models/Application.js";
import Enquiry from "../models/Enquiry.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESUME_DIR = path.resolve(__dirname, "../uploads/resumes");

const router = Router();

// ── Job applications ─────────────────────────────────────────────

// List all applications (newest first)
router.get("/applications", requireAdmin, async (_req, res) => {
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
router.get("/applications/:id", requireAdmin, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).select("-__v").lean();
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });
    res.json({ ok: true, application: app });
  } catch (err) {
    console.error("[admin] Get error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch application." });
  }
});

// Update application status
router.patch("/applications/:id", requireAdmin, async (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "reviewed", "shortlisted", "rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ ok: false, error: `Status must be one of: ${allowed.join(", ")}` });
  }
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    ).select("-__v");
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });
    res.json({ ok: true, application: app });
  } catch (err) {
    console.error("[admin] Update error:", err);
    res.status(500).json({ ok: false, error: "Failed to update application." });
  }
});

// Serve resume file (supports both disk and base64 storage)
router.get("/applications/:id/resume", requireAdmin, async (req, res) => {
  try {
    const app = await Application.findById(req.params.id).select("resumePath resumeFileName resumeData resumeMime").lean();
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });

    // Base64 storage (Vercel serverless)
    if (app.resumeData) {
      const buffer = Buffer.from(app.resumeData, "base64");
      const mime = app.resumeMime || "application/pdf";
      const ext = app.resumeFileName?.split(".").pop() || "pdf";
      res.setHeader("Content-Type", mime);
      res.setHeader("Content-Disposition", `inline; filename="${app.resumeFileName || `resume.${ext}`}"`);
      return res.send(buffer);
    }

    // Disk storage (local development)
    if (!app.resumePath) {
      return res.status(404).json({ ok: false, error: "Resume not found. This application was submitted without a stored resume file." });
    }
    const { existsSync } = await import("node:fs");
    const filePath = path.resolve(RESUME_DIR, app.resumePath);
    if (!filePath.startsWith(RESUME_DIR) || !existsSync(filePath)) {
      return res.status(404).json({ ok: false, error: "Resume file not found on this server. It was stored locally and is not available in the deployed environment." });
    }
    res.sendFile(filePath, { root: "/" });
  } catch (err) {
    console.error("[admin] Resume error:", err);
    res.status(500).json({ ok: false, error: "Failed to serve resume." });
  }
});

// Delete application
router.delete("/applications/:id", requireAdmin, async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ ok: false, error: "Application not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("[admin] Delete error:", err);
    res.status(500).json({ ok: false, error: "Failed to delete application." });
  }
});

// ── Contact-form enquiries ──────────────────────────────────────

// List all enquiries (newest first)
router.get("/enquiries", requireAdmin, async (_req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    res.json({ ok: true, count: enquiries.length, enquiries });
  } catch (err) {
    console.error("[admin] Enquiry list error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch enquiries." });
  }
});

// Update enquiry status ("new" | "read" | "handled")
router.patch("/enquiries/:id", requireAdmin, async (req, res) => {
  const { status } = req.body;
  const allowed = ["new", "read", "handled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ ok: false, error: `Status must be one of: ${allowed.join(", ")}` });
  }
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { returnDocument: "after" }).select("-__v");
    if (!enquiry) return res.status(404).json({ ok: false, error: "Enquiry not found." });
    res.json({ ok: true, enquiry });
  } catch (err) {
    console.error("[admin] Enquiry update error:", err);
    res.status(500).json({ ok: false, error: "Failed to update enquiry." });
  }
});

// Delete enquiry
router.delete("/enquiries/:id", requireAdmin, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ ok: false, error: "Enquiry not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("[admin] Enquiry delete error:", err);
    res.status(500).json({ ok: false, error: "Failed to delete enquiry." });
  }
});

export default router;
