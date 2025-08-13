const mongoose = require("mongoose");

const options = { discriminatorKey: "type", timestamps: true };

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of Task is required!"],
    },
    level: {
      type: String,
      required: [true, "Level is required!"],
    },
    element: {
      type: String,
      required: [true, "Element is required"],
    },
    description: String,
    instructions: [String],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  options
);

module.exports = mongoose.model("Task", taskSchema);
