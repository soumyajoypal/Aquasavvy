const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    currentStep: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    stepsSeen: { type: [String], default: [] },
    elementIntro: {
      farm: { type: Boolean, default: false },
      home: { type: Boolean, default: false },
      industry: { type: Boolean, default: false },
    },
    gamesIntro: {
      quiz: { type: Boolean, default: false },
      choice: { type: Boolean, default: false },
      puzzle: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tutorial", tutorialSchema);
