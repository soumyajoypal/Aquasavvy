const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyOTP,
  resendOTP,
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/resend-otp", resendOTP);

module.exports = authRouter;
