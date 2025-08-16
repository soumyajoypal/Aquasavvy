import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AuthComponent from "./Components/AuthComponent/AuthComponent";
import OtpPage from "./Pages/OtpPage/OtpPage";
import StartPage from "./Pages/StartPage/StartPage";
import TutorialPage from "./Pages/TutorialPage/TutorialPage";
import GameElementsIntro from "./Pages/GamePages/GameElementsIntro/GameElementsIntro";
import GameElement from "./Pages/GamePages/GameElement/GameElement";
import GameLevel from "./Pages/GamePages/GameLevel/GameLevel";
import TaskPage from "./Pages/GamePages/TaskPage/TaskPage";
import Leaderboard from "./Pages/LeaderBoardPage/LeaderBoardPage";
import { getLeaderBoard } from "./lib/Slices/leaderBoardSlice";
import { fetchTutorialProgress } from "./lib/Slices/tutorialSlice";

const App = () => {
  const { user, otpVerification } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OtpPage />} />
        <Route path="/tutorial" element={<TutorialPage></TutorialPage>}></Route>
        <Route
          path="/start"
          element={
            <AuthComponent>
              <StartPage></StartPage>
            </AuthComponent>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <AuthComponent>
              <ProfilePage></ProfilePage>
            </AuthComponent>
          }
        ></Route>
        {/* Game Routes */}
        <Route
          path="/gameElements"
          element={<GameElementsIntro></GameElementsIntro>}
        ></Route>
        <Route path="/element/:elementId" element={<GameElement />}>
          <Route path="level/:levelId" element={<GameLevel />}></Route>
        </Route>
        <Route path="/game/taskPage" element={<TaskPage />} />
        <Route
          path="/leaderboard"
          element={<Leaderboard></Leaderboard>}
        ></Route>
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </main>
  );
};

export default App;
