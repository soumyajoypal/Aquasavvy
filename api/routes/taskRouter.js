const express = require("express");
const {
  createTasks,
  getTasks,
  getLevelTasks,
} = require("../controllers/tasksController");
const taskRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware");
taskRouter.route("/create/:gameId").post(createTasks);
taskRouter.route("/").get(verifyToken, getTasks);
taskRouter.route("/getTasks").get(getLevelTasks);

module.exports = taskRouter;
