const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  fetchUserProgress,
  updateUserProgress,
} = require("../controllers/userProgresscontroller");
const userProgressRouter = express.Router();

userProgressRouter.get("/", verifyToken, fetchUserProgress);
userProgressRouter.put("/", verifyToken, updateUserProgress);
module.exports = userProgressRouter;
