import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    address: {
      type: String,
      minLength: 10,
      maxLength: 100,
    },
    phone_number: {
      type: String,
      // minLength: 10,
      // maxLength: 15,
    },
    role: {
      type: String,
      enum: ["student", "admin", "teacher"],
      default: "student",
    },
    dob: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const UserModel = mongoose.model("User", UserSchema);
