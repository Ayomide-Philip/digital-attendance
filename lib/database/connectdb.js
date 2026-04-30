import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

let connectPromise = null;

export async function connectDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection is in progress");
    await mongoose.connection.asPromise();
    return mongoose.connection;
  }

  if (connectPromise) {
    await connectPromise;
    return mongoose.connection;
  }

  try {
    connectPromise = mongoose.connect(MONGODB_URI, {
      dbName: "digital-attedance",
      bufferCommands: false,
    });

    await connectPromise;
    console.log("MongoDB connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.log(error);
    throw new Error("Could not connect to MongoDB");
  } finally {
    connectPromise = null;
  }
}
