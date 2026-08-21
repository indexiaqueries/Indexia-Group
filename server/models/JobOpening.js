import mongoose from "mongoose";

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    company: { type: String, default: "Indexia Group", trim: true },
    location: { type: String, default: "Mumbai", trim: true },
    type: {
      type: String,
      enum: ["Full-time", "Intern"],
      required: true,
    },
    description: { type: String, default: "", trim: true },
    requirements: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("JobOpening", jobOpeningSchema);
