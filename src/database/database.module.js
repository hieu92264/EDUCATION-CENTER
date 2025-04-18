import mongoose from "mongoose";
import "dotenv/config";

export class DatabaseModule {
  static async init() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        connectTimeoutMS: 5000,
        dbName: process.env.MONGO_DB,
      });
      console.log("Database module init successful");
    } catch (error) {
      console.log("database error:>>>> ", error.message);
    }
  }
}
