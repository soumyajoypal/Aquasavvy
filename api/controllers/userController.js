const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const UserProgress = require("../models/userProgressSchema");
const { BadRequest, NotFound } = require("../errors");

const getLeaderBoard = async (req, res) => {
  const users = await User.find({})
    .sort({ score: -1 })
    .limit(6)
    .select("username score leaderBoardPosition avatar playerLevel");
  return res.status(200).json({ data: users, msg: "LeaderBoard received!" });
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  const { id } = req.user;

  if (id !== userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Not Authenticated!" });
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFound(`User with id:${userId} not found!`);
  }

  res
    .status(StatusCodes.OK)
    .json({ data: user, message: "Successful in getting user!" });
};

const updateResult = async (req, res) => {
  const { id } = req.user;
  const { taskId } = req.params;
  const { score, coins, groundWaterLevel, playerLevel } = req.body;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ msg: `Task with ID ${taskId} not found!` });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: `User with ID ${id} not found!` });
  }
  // const userProgress = await UserProgress.findOne({ user: id });
  // const taskAlreadyCompleted = userProgress.elements.some((element) =>
  //   element.levels.some((level) =>
  //     level.tasks.some((t) => t.task && t.task.equals(taskId) && t.completed)
  //   )
  // );
  if (true) {
    user.completedTasks.push({ task: taskId });
    user.score = score;
    user.coins = coins;
    user.groundWaterLevel = groundWaterLevel;
  } else {
    // user.score = score * task.replayCost;
    user.score = 0;
    user.coins = coins * task.replaceOne;
  }
  user.playerLevel = playerLevel;

  await user.save();
  const topUsers = await User.find({})
    .sort({ score: -1 })
    .limit(6)
    .select("_id score leaderBoardPosition");

  for (let i = 0; i < topUsers.length; i++) {
    topUsers[i].leaderBoardPosition = i + 1;
    await topUsers[i].save();
  }
  return res.status(200).json({ data: user, msg: "Updated Successfully!" });
};

const uploadAvatar = async (req, res) => {
  const { id } = req.user;
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequest("Avatar should be selected!");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new NotFound(`User with ${id} not found!`);
  }
  user.avatar = avatar;
  await user.save();
  return res.status(200).json({
    message: "Avatar uploaded successfully",
  });
};

module.exports = { getUser, uploadAvatar, updateResult, getLeaderBoard };
