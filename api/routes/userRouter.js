const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  getUser,
  updateResult,
} = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/:userId").get(verifyToken, getUser);
userRouter.route("/tasks/:taskId").patch(verifyToken, updateResult);

module.exports = userRouter;
