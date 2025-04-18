import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

export const CategoryModel = mongoose.model("Category", CategorySchema);
