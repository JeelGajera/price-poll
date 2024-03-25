import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  if (!process.env.MONGODB_URI) {
    throw new Error("=> no database connection string provided");
  }
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("=> MongoDB connection established");
    
  } catch (error) {
    
  }
};
