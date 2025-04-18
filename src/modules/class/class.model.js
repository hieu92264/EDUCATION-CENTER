const { default: mongoose } = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
      unique: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    startDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      maxLength: 255,
    },
  },
  {
    timestamps: true,
    collection: "classes",
  }
);

export const ClassModel = mongoose.model("Class", ClassSchema);
