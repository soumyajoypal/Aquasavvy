const express = require("express");
const { getLeaderBoard } = require("../controllers/userController");
const leaderBoardRouter = express.Router();

leaderBoardRouter.route("/").get(getLeaderBoard);

module.exports = leaderBoardRouter;
