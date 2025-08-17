const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const otpGenerator = require("../utils/otpGenerator");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { BadRequest, NotFound } = require("../errors");
const mongoose = require("mongoose");

const UserProgress = require("../models/userProgressSchema");

const Task = require("../models/taskSchema");

async function generateDefaultUserProgress(userId) {
  const tasks = await Task.find().lean();

  // Group tasks by element and level
  const grouped = {};
  for (const task of tasks) {
    if (!grouped[task.element]) grouped[task.element] = {};
    if (!grouped[task.element][task.level])
      grouped[task.element][task.level] = [];
    grouped[task.element][task.level].push(task);
  }
  const TASK_ORDER = { quiz: 0, choice: 1, puzzle: 2 };
  const LEVEL_ORDER = {
    farm: ["crop", "irrigation", "pesticide"],
  };

  const byTaskType = (a, b) => {
    const aKey = String(a.type || "").toLowerCase();
    const bKey = String(b.type || "").toLowerCase();

    const aOrder = TASK_ORDER.hasOwnProperty(aKey)
      ? TASK_ORDER[aKey]
      : Number.MAX_SAFE_INTEGER;
    const bOrder = TASK_ORDER.hasOwnProperty(bKey)
      ? TASK_ORDER[bKey]
      : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) return aOrder - bOrder;
    return String(a._id).localeCompare(String(b._id));
  };
  const elements = Object.entries(grouped).map(
    ([elementName, levelsObj], elementIndex) => {
      let levelsArr = Object.entries(levelsObj);
      if (LEVEL_ORDER[elementName]) {
        const order = LEVEL_ORDER[elementName];
        levelsArr.sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));
      }

      return {
        name: elementName,
        unlocked: elementIndex === 0,
        levels: levelsArr.map(([levelName, levelTasks], levelIndex) => {
          const sortedTasks = levelTasks.slice().sort(byTaskType);

          return {
            level: levelName,
            unlocked: elementIndex === 0 && levelIndex === 0,
            score: 0,
            waterLevel: 100,
            tasks: sortedTasks.map((t, taskIndex) => ({
              task: t._id,
              unlocked:
                elementIndex === 0 && levelIndex === 0 && taskIndex === 0,
              completed: false,
              failed: false,
              attempts: Number.MAX_SAFE_INTEGER,
              score: 0,
              bestScore: 0,
            })),
          };
        }),
      };
    }
  );

  return {
    user: userId,
    elements,
  };
}

const registerUser = async (req, res) => {
  const { username, email } = req.body;
  let user = await User.findOne({ username, email });

  if (user && user.isVerified) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "User already exists and is verified!" });
  }

  if (user && !user.isVerified) {
    await otpGenerator(user, email);
    return res
      .status(StatusCodes.OK)
      .json({ message: "OTP resent. Please verify your email!" });
  }
  user = await User.create(req.body);

  // here the default user progress will be created
  const defaultProgress = await generateDefaultUserProgress(user._id);
  await UserProgress.create(defaultProgress);

  await otpGenerator(user, email);
  return res
    .status(StatusCodes.CREATED)
    .json({ data: user.otpExpires, message: "OTP Sent Successfully!" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Username and Password must be entered!");
  }

  const user = await User.findOne({ username, isVerified: true });
  if (!user) {
    throw new BadRequest("Invalid Credentials!");
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequest("Invalid Credentials!");
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password: _, ...userInfo } = user._doc;

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    maxAge: 24 * 60 * 60 * 1000, 
  });
  return res
    .status(StatusCodes.OK)
    .json({ data: userInfo, message: "Login Successful!" });
};

const logoutUser = async (req, res, next) => {
  res
    .clearCookie("token")
    .status(StatusCodes.OK)
    .json({ message: "Logout successful" });
};

const verifyOTP = async (req, res) => {
  const { email, username, otp } = req.body;
  const user = await User.findOne({ email, username, isVerified: false });
  if (!user) {
    throw new NotFound("User not found!");
  }

  if (user.otp !== otp) {
    throw new BadRequest("OTP verification failed!");
  }

  if (moment().isAfter(user.otpExpires)) {
    throw new BadRequest("OTP has expired!");
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  user.isVerified = true;
  await user.save();

  await User.deleteMany({ email, _id: { $ne: user._id }, isVerified: false });

  const topUsers = await User.find({})
    .sort({ score: -1 })
    .limit(6)
    .select("_id score leaderBoardPosition");

  for (let i = 0; i < topUsers.length; i++) {
    topUsers[i].leaderBoardPosition = i + 1;
    await topUsers[i].save();
  }

  return res
    .status(StatusCodes.OK)
    .json({ data: user, message: "OTP verified successfully!" });
};

const resendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "User not found!" });
  }

  await otpGenerator(user, email);
  return res
    .status(StatusCodes.OK)
    .json({ message: "OTP sent successfully!", data: user.otpExpires });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyOTP,
  resendOTP,
};
