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
    threshold: {
      type: Number,
      default: 0.7,
    },
    replayCost: {
      type: Number,
      default: 0.25,
    },
  },
  options
);

module.exports = mongoose.model("Task", taskSchema);
