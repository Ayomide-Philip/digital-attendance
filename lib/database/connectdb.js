import { MONGODB_URI } from "./config";
import mongoose from "mongoose";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
export default async function connectToDatabase() {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: "digital-attendance",
        bufferCommands: false,
      });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    cached.promise = null;
    throw new Error("Unable to connect with databse");
  }
}
