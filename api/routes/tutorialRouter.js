const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  getTutorialProgress,
  updateTutorialProgress,
  resetTutorialProgress,
} = require("../controllers/tutorialController");

const tutorialRouter = express.Router();
tutorialRouter.get("/", verifyToken, getTutorialProgress);
tutorialRouter.put("/", verifyToken, updateTutorialProgress);
tutorialRouter.post("/reset", verifyToken, resetTutorialProgress);

module.exports = tutorialRouter;
