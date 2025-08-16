const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    elements: [
      {
        name: {
          type: String,
          enum: ["farm", "industry", "home"],
          required: true,
        },
        unlocked: { type: Boolean, default: false },
        levels: [
          {
            level: { type: String, required: true },
            unlocked: { type: Boolean, default: false },
            score: { type: Number, default: 0 },
            waterLevel: { type: Number, default: 0 },
            tasks: [
              {
                task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
                unlocked: { type: Boolean, default: false },
                completed: { type: Boolean, default: false },
                failed: { type: Boolean, default: false },
                attempts: { type: Number, default: 0 },
                score: { type: Number, default: 0 },
                bestScore: { type: Number, default: 0 },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProgress", userProgressSchema);
