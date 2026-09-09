import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

holidaySchema.index({ date: 1 });

export default mongoose.model("Holiday", holidaySchema);
