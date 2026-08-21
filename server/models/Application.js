import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    experience: { type: String, default: "" },
    intro: { type: String, required: true, trim: true },
    roleTitle: { type: String, default: "Open Position" },
    department: { type: String, default: "" },
    resumeFileName: { type: String, default: "" },
    resumePath: { type: String, default: "" },
    resumeData: { type: String, default: "" },
    resumeMime: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
