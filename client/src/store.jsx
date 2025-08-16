import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./lib/Slices/userSlice";
import tutorialReducer from "./lib/Slices/tutorialSlice";
import progressReducer from "./lib/Slices/userProgressSlice";
import gameReducer from "./lib/Slices/gameSlice";
import leaderboardReducer from "./lib/Slices/leaderBoardSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    tutorial: tutorialReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    progress: progressReducer,
  },
});

export default store;
