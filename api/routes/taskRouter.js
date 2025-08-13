const express = require("express");
const { createTasks, getTasks } = require("../controllers/tasksController");
const taskRouter = express.Router();
const verifyToken = require("../middleware/authMiddleware");
taskRouter.route("/:gameId").post(createTasks);
taskRouter.route("/").get(verifyToken, getTasks);

module.exports = taskRouter;
