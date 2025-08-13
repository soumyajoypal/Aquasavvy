const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { uploadAvatar } = require("../controllers/userController");
const uploadRouter = express.Router();

uploadRouter.route("/uploadAvatar").post(verifyToken, uploadAvatar);

module.exports = uploadRouter;
