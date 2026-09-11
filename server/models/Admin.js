// Admin model — the dashboard's single login account.
//
// There is intentionally only ever ONE admin record. It is created once via
// POST /api/admin/register (setup) and only stores a bcrypt hash of the
// password — never the plaintext password itself.
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    passwordHash: { type: String, required: true, select: false },
  },
  { timestamps: true } // createdAt / updatedAt
);

// Belt-and-braces: refuse to save a document that still contains a plaintext
// password field (the password should exist only for the length of one request).
adminSchema.pre("validate", async function guardNoPlaintext() {
  if ("password" in this) {
    throw new Error("Admin documents must never store a plaintext password.");
  }
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
