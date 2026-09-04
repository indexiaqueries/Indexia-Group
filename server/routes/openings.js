import { Router } from "express";
import JobOpening from "../models/JobOpening.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

// Public router — mounted at /api/openings
const router = Router();

// List active openings (public)
router.get("/", async (_req, res) => {
  try {
    const openings = await JobOpening.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ ok: true, openings });
  } catch (err) {
    console.error("Failed to fetch openings:", err);
    res.status(500).json({ ok: false, error: "Could not fetch openings." });
  }
});

// Admin router — mounted at /api/admin/openings (token-protected)
export const adminOpeningsRouter = Router();
adminOpeningsRouter.use(requireAdmin);

// List all openings (including inactive)
adminOpeningsRouter.get("/", async (_req, res) => {
  try {
    const openings = await JobOpening.find().sort({ createdAt: -1 });
    res.json({ ok: true, openings });
  } catch (err) {
    console.error("Failed to fetch openings:", err);
    res.status(500).json({ ok: false, error: "Could not fetch openings." });
  }
});

// Create opening
adminOpeningsRouter.post("/", async (req, res) => {
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

// Update opening
adminOpeningsRouter.patch("/:id", async (req, res) => {
  try {
    const opening = await JobOpening.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    if (!opening) return res.status(404).json({ ok: false, error: "Opening not found." });
    res.json({ ok: true, opening });
  } catch (err) {
    console.error("Failed to update opening:", err);
    res.status(500).json({ ok: false, error: "Could not update opening." });
  }
});

// Delete opening
adminOpeningsRouter.delete("/:id", async (req, res) => {
  try {
    const opening = await JobOpening.findByIdAndDelete(req.params.id);
    if (!opening) return res.status(404).json({ ok: false, error: "Opening not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete opening:", err);
    res.status(500).json({ ok: false, error: "Could not delete opening." });
  }
});

export default router;