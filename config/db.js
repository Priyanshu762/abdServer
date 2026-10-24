import mongoose from "mongoose";
import { runAutoSeed } from "../seeder/initialSeed.js";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/affordable_balloons";

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);

    // Run auto-seeder to ensure default admin & content exist
    await runAutoSeed();
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn("[MongoDB] Please verify MongoDB is running locally (mongod) or provide a valid MONGODB_URI in server/.env.");
  }
}
