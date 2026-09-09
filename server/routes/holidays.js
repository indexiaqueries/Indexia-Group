import { Router } from "express";
import Holiday from "../models/Holiday.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

// List all holidays (public — for calendar display)
router.get("/", async (_req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 }).lean();
    res.json({ ok: true, holidays });
  } catch (err) {
    console.error("Failed to fetch holidays:", err);
    res.status(500).json({ ok: false, error: "Could not fetch holidays." });
  }
});

// Admin router — mounted at /api/admin/holidays
export const adminHolidaysRouter = Router();
adminHolidaysRouter.use(requireAdmin);

// List all holidays (admin)
adminHolidaysRouter.get("/", async (_req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 }).lean();
    res.json({ ok: true, holidays });
  } catch (err) {
    console.error("[admin] Holiday list error:", err);
    res.status(500).json({ ok: false, error: "Failed to fetch holidays." });
  }
});

// Create holiday
adminHolidaysRouter.post("/", async (req, res) => {
  const { name, date } = req.body ?? {};
  if (!name || !date) {
    return res.status(400).json({ ok: false, error: "Name and date are required." });
  }
  try {
    const holiday = await Holiday.create({
      name,
      date: new Date(date),
    });
    res.json({ ok: true, holiday });
  } catch (err) {
    console.error("[admin] Holiday create error:", err);
    res.status(500).json({ ok: false, error: "Could not create holiday." });
  }
});

// Update holiday
adminHolidaysRouter.patch("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.date) updateData.date = new Date(updateData.date);
    const holiday = await Holiday.findByIdAndUpdate(req.params.id, updateData, { returnDocument: "after" });
    if (!holiday) return res.status(404).json({ ok: false, error: "Holiday not found." });
    res.json({ ok: true, holiday });
  } catch (err) {
    console.error("[admin] Holiday update error:", err);
    res.status(500).json({ ok: false, error: "Could not update holiday." });
  }
});

// Delete holiday
adminHolidaysRouter.delete("/:id", async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) return res.status(404).json({ ok: false, error: "Holiday not found." });
    res.json({ ok: true });
  } catch (err) {
    console.error("[admin] Holiday delete error:", err);
    res.status(500).json({ ok: false, error: "Could not delete holiday." });
  }
});

export default router;
