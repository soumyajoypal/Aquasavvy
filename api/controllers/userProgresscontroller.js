const { StatusCodes } = require("http-status-codes");
const UserProgress = require("../models/userProgressSchema");
const Task = require("../models/taskSchema");
const { translateAliases } = require("../models/userSchema");
const fetchUserProgress = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const progress = await UserProgress.findOne({ user: id })
    .populate({
      path: "elements.levels.tasks.task",
      select: "name level element difficulty type",
    })
    .lean();

  if (!progress) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User progress not found.",
    });
  }

  res.status(StatusCodes.OK).json({
    data: progress,
    message: "User progress fetched successfully!",
  });
};

const updateUserProgress = async (req, res) => {
  const { id } = req.user;
  const { elementName, levelName, taskId, score } = req.body;

  const userProgress = await UserProgress.findOne({ user: id });
  if (!userProgress) {
    return res.status(404).json({ message: "User progress not found" });
  }

  const element = userProgress.elements.find((e) => e.name === elementName);
  if (!element) return res.status(404).json({ message: "Element not found" });

  const level = element.levels.find((l) => l.level === levelName);
  if (!level) return res.status(404).json({ message: "Level not found" });

  const task = level.tasks.find((t) => t.task.toString() === taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const dbTask = await Task.findById(taskId);
  if (!dbTask) return res.status(404).json({ message: "Task not found in DB" });

  task.attempts = (task.attempts || 0) - 1;
  if (task.attempts === 0) {
    task.attempts = Number.MAX_SAFE_INTEGER;
  }

  if (score >= dbTask.threshold * 100) {
    console.log(dbTask.threshold * 100);

    task.completed = true;
    task.failed = false;
  } else {
    task.failed = true;
    console.log("failed");
  }
  if (!task.completed) {
    task.score = score;
  } else {
    task.score = 60;
  }
  task.bestScore = Math.max(task.bestScore || 0, score);

  if (task.completed) {
    const currentTaskIndex = level.tasks.findIndex(
      (t) => t.task.toString() === taskId
    );

    if (currentTaskIndex + 1 < level.tasks.length) {
      level.tasks[currentTaskIndex + 1].unlocked = true;
    } else {
      const currentLevelIndex = element.levels.findIndex(
        (l) => l.level === levelName
      );
      if (currentLevelIndex + 1 < element.levels.length) {
        element.levels[currentLevelIndex + 1].unlocked = true;
        element.levels[currentLevelIndex + 1].tasks[0].unlocked = true;
      } else {
        const currentElementIndex = userProgress.elements.findIndex(
          (e) => e.name === elementName
        );
        if (currentElementIndex + 1 < userProgress.elements.length) {
          // If you want to unlock next element too
          // userProgress.elements[currentElementIndex + 1].unlocked = true;
          // userProgress.elements[currentElementIndex + 1].levels[0].unlocked = true;
          // userProgress.elements[currentElementIndex + 1].levels[0].tasks[0].unlocked = true;
        }
      }
    }
  }

  await userProgress.save();
  res.json({ message: "Progress updated", data: userProgress });
};

module.exports = { fetchUserProgress, updateUserProgress };
