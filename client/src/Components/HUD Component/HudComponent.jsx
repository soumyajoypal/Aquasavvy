import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joyride, { STATUS } from "react-joyride";
import { nextStep } from "../../lib/Slices/tutorialSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import "./HudComponent.css";
import { usePrevious } from "@uidotdev/usehooks";

const getScoreFromLevel = (level) => {
  if (level === 5) return 2000;
  if (level === 4) return 1000;
  if (level === 3) return 750;
  if (level === 2) return 500;
  return 250;
};

const Hud = () => {
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const { user } = useSelector((state) => state.user);
  const { currentTask, isTaskRunning } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      dispatch(nextStep());
    }
  };

  const [updates, setUpdates] = useState([]);

  // Store previous values
  const prevScore = usePrevious(user.score);
  const prevCoins = usePrevious(user.coins);
  const prevWater = usePrevious(user.groundWaterLevel);

  useEffect(() => {
    if (prevScore !== undefined && user.score !== prevScore) {
      const diff = user.score - prevScore;
      if (diff !== 0)
        addUpdate(
          `${diff > 0 ? "+" : ""}${diff} Score`,
          diff > 0 ? "text-green-400" : "text-red-400"
        );
    }
    if (prevCoins !== undefined && user.coins !== prevCoins) {
      const diff = user.coins - prevCoins;
      if (diff !== 0)
        addUpdate(
          `${diff > 0 ? "+" : ""}${diff} Coins`,
          diff > 0 ? "text-yellow-400" : "text-red-400"
        );
    }
    if (prevWater !== undefined && user.groundWaterLevel !== prevWater) {
      const diff = user.groundWaterLevel - prevWater;
      if (diff !== 0)
        addUpdate(
          `${diff > 0 ? "+" : ""}${diff} Water`,
          diff > 0 ? "text-blue-400" : "text-red-400"
        );
    }
  }, [user.score, user.coins, user.groundWaterLevel]);

  const addUpdate = (text, colorClass) => {
    const id = Date.now();
    setUpdates((prev) => [...prev, { id, text, colorClass }]);
    setTimeout(() => {
      setUpdates((prev) => prev.filter((u) => u.id !== id));
    }, 20000);
  };

  const steps = [
    {
      target: ".hud",
      content: "This is the Hud Component!",
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".hud-title",
      content: "This is the game title!",
      placement: "bottom",
    },
    {
      target: ".hud-tasks",
      content:
        "Here is the current task you are performing or need to perform!",
      placement: "bottom",
    },
    {
      target: ".hud-score",
      content: "Your score is displayed here.",
      placement: "bottom",
    },
    {
      target: ".hud-coins",
      content: "Here, the coins you collected are shown.",
      placement: "bottom",
    },
    {
      target: ".hud-profile",
      content: "This is your profile. Click to view your profile details.",
      placement: "bottom",
    },
    {
      target: ".hud-water-level",
      content: "Here, the water level stored is displayed!",
      placement: "bottom",
    },
  ];
  const percentage = (user.score / getScoreFromLevel(user.playerLevel)) * 100;

  useEffect(() => {
    if (currentStep === 9) {
      setRun(true);
    }
  }, [currentStep]);

  return (
    <>
      <Joyride
        steps={steps}
        continuous
        run={run}
        showSkipButton
        showProgress
        disableOverlayClose
        callback={handleJoyrideCallback}
        locale={{
          back: "◀ Previous",
          last: "🎉 Finish",
          next: "Next ▶",
          skip: "✖ Skip",
        }}
        styles={{
          options: {
            arrowColor: "#0f172a", // matches blue-950
            backgroundColor: "#0f172a", // tooltip bg same as HUD top
            overlayColor: "rgba(15, 23, 42, 0.7)", // semi-transparent blue overlay
            primaryColor: "#38bdf8", // Tailwind sky-400 for highlights
            textColor: "#f1f5f9", // slate-100 (soft white)
            width: 320,
            zIndex: 1000,
          },
          tooltip: {
            borderRadius: "14px",
            padding: "18px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            fontSize: "15px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            lineHeight: 1.5,
          },
          buttonNext: {
            background: "linear-gradient(90deg, #38bdf8, #0ea5e9)", // aqua gradient
            color: "white",
            borderRadius: "8px",
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.2s ease",
          },
          buttonBack: {
            backgroundColor: "#1e3a8a", // blue-800
            color: "white",
            borderRadius: "8px",
            padding: "10px 16px",
            fontSize: "14px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "500",
          },
          buttonSkip: {
            backgroundColor: "transparent",
            color: "#94a3b8", // slate-400
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Montserrat, sans-serif",
            textDecoration: "underline",
            marginRight: "10px",
            cursor: "pointer",
          },
          spotlight: {
            borderRadius: "12px",
            boxShadow: "0 0 0 4px rgba(56, 189, 248, 0.5)", // aqua glow
          },
        }}
      />

      <div className="absolute top-0 left-0 p-4 bg-gradient-to-b from-blue-950 to-blue-900 shadow-lg w-full flex justify-between items-center hud  h-16 text-white">
        <h2
          className="text-xl font-bold audiowide tracking-wide hud-title"
          onClick={() => {
            navigate("/");
          }}
        >
          AquaSavvy
        </h2>
        <div className="flex items-center space-x-6">
          <div className="montserrat text-base tasks hud-tasks">
            <strong>Tasks:</strong> {`"${currentTask?.name || `No Tasks`}"`}
          </div>
          <div className="text-sm score flex gap-4">
            <p className="montserrat text-base hud-score">
              <strong>Score:</strong> {user.score}
            </p>
            <p className="coins montserrat text-base hud-coins">
              <strong>Coins:</strong> {user.coins}
            </p>
          </div>
          <div
            className="flex items-center space-x-4 cursor-pointer hud-profile"
            onClick={() => {
              if (!isTaskRunning && !active) {
                navigate("/profile");
              }
            }}
          >
            <div className="relative w-14 h-14">
              <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#00FF00",
                  trailColor: "#1A1D23",
                  strokeLinecap: "round",
                  pathTransitionDuration: 0.5,
                })}
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <img
                  src={user.avatar}
                  alt="profile-pic"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  style={{ zIndex: 1 }}
                />
              </div>
            </div>
            <div className="montserrat text-base">
              <p className="font-semibold">Level {user.playerLevel}</p>
            </div>
          </div>
          <div className="water-level flex flex-col items-center hud-water-level">
            <strong className="montserrat text-base">Water Level:</strong>
            <div className={`bg-gray-700 h-2 mt-1 w-32 relative rounded`}>
              <div
                className={`absolute inset-0 h-full ${
                  user.groundWaterLevel >= 50
                    ? `bg-blue-500`
                    : user.groundWaterLevel >= 25
                    ? `bg-yellow-300`
                    : `bg-red-500`
                } rounded`}
                style={{ width: `${user.groundWaterLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating score/coin/water updates */}
      <div className="absolute top-20 right-6 flex flex-col space-y-2 items-end z-50">
        {updates.map((u) => (
          <div
            key={u.id}
            className={`px-4 py-2 rounded-lg bg-gray-800 bg-opacity-80 shadow-lg text-sm font-bold ${u.colorClass} animate-fade-up`}
          >
            {u.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default Hud;
