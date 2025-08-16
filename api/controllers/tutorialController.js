const { StatusCodes } = require("http-status-codes");
const Tutorial = require("../models/tutorialSchema");

const getTutorialProgress = async (req, res) => {
  try {
    const { id } = req.user;

    let progress = await Tutorial.findOne({ user: id });

    if (!progress) {
      progress = await Tutorial.create({ user: id });
    }

    return res
      .status(StatusCodes.OK)
      .json({ data: progress, message: "Data sent successfully!" });
  } catch (err) {
    console.error("Error fetching tutorial:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const updateTutorialProgress = async (req, res) => {
  try {
    const { id } = req.user;
    const fields = [
      "currentStep",
      "completed",
      "active",
      "stepsSeen",
      "elementIntro",
      "gamesIntro",
    ];

    const updatedFields = {};
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updatedFields[field] = req.body[field];
      }
    }

    const progress = await Tutorial.findOneAndUpdate(
      { user: id },
      { $set: updatedFields },
      { new: true, upsert: true }
    );

    return res
      .status(StatusCodes.OK)
      .json({ data: progress, message: "Updated successfully!" });
  } catch (error) {
    console.error("Error updating tutorial:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

const resetTutorialProgress = async (req, res) => {
  try {
    const progress = await Tutorial.findOneAndUpdate(
      { user: req.user.id },
      {
        currentStep: 0,
        completed: false,
        active: true,
        stepsSeen: [],
        elementIntro: { farm: false, home: false, industry: false },
        gamesIntro: { quiz: false, choice: false, puzzle: false },
      },
      { new: true }
    );

    res
      .status(StatusCodes.OK)
      .json({ data: progress, message: "Reset successfully!" });
  } catch (error) {
    console.error("Error resetting tutorial:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error" });
  }
};

module.exports = {
  getTutorialProgress,
  updateTutorialProgress,
  resetTutorialProgress,
};
