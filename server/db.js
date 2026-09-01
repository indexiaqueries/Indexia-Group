import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let connected = false;

export async function connectDB() {
  if (connected) return;
  if (!MONGODB_URI) {
    console.log("[db] MONGODB_URI not set, database features disabled.");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    connected = true;
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
  }
}

export function isDBConnected() {
  return connected;
}
