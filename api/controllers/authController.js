const { StatusCodes } = require("http-status-codes");
const User = require("../models/userSchema");
const otpGenerator = require("../utils/otpGenerator");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { BadRequest, NotFound } = require("../errors");

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

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
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
