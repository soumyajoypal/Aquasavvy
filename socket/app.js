const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

// const updateLeaderboard = (userId, score) => {
//   const userOnLeaderboard = leaderboard.find((user) => user.userId === userId);

//   if (userOnLeaderboard) {
//     userOnLeaderboard.score = score;
//   } else {
//     if (
//       leaderboard.length < 10 ||
//       score > leaderboard[leaderboard.length - 1].score
//     ) {
//       leaderboard.push({ userId, score });
//     }
//   }

//   leaderboard.sort((a, b) => b.score - a.score);
//   if (leaderboard.length > 10) {
//     leaderboard = leaderboard.slice(0, 10);
//   }
// };
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   socket.on("newUser", ({ userId, score }) => {
//     console.log(`New user connected with ID ${userId} and score ${score}`);
//     const lowestScoreOnLeaderboard =
//       leaderboard.length > 0 ? leaderboard[leaderboard.length - 1].score : null;

//     if (leaderboard.length < 10 || score > lowestScoreOnLeaderboard) {
//       updateLeaderboard(userId, score);
//       io.emit("leaderboardUpdate", leaderboard);
//     } else {
//       console.log(
//         `User ${userId} could not be added to the leaderboard with score ${score}`
//       );
//     }
//     socket.emit("leaderboardUpdate", leaderboard);
//   });
//   socket.on("scoreUpdate", ({ userId, score }) => {
//     console.log(`Score update received for user ${userId}: ${score}`);
//     updateLeaderboard(userId, score);
//     io.emit("leaderboardUpdate", leaderboard);
//   });
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// io.listen(3001, () => {
//   console.log("Socket server is running on port 3001");
// });
