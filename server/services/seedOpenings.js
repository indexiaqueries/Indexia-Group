import JobOpening from "../models/JobOpening.js";
import { defaultOpenings } from "../data/defaultOpenings.js";

/**
 * Seed the openings collection with the defaults — only when it is empty.
 * Called once after the initial MongoDB connection succeeds.
 */
export async function seedOpenings() {
  try {
    const count = await JobOpening.countDocuments();
    if (count > 0) return;
    console.log("[seed] No openings found, seeding from defaults...");
    await JobOpening.insertMany(defaultOpenings);
    console.log(`[seed] Seeded ${defaultOpenings.length} openings.`);
  } catch (err) {
    console.error("[seed] Failed:", err.message);
  }
}
