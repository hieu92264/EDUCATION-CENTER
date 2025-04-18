const { default: mongoose } = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 5,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
    collection: "courses", // sửa typo "cousres" → "courses"
  }
);

export const CourseModel = mongoose.model("Course", CourseSchema);
