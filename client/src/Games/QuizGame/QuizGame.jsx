import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeWaterLevel,
  updateScore,
} from "../../lib/Slices/userSlice";
import "react-circular-progressbar/dist/styles.css";
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHourglass,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  completeTutorial,
  updateTutorialProgress,
} from "../../lib/Slices/tutorialSlice";
import { updateUserProgress } from "../../lib/Slices/userProgressSlice";

const QuizGame = () => {
  const dispatch = useDispatch();
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const { currentTask, isTaskRunning, isTaskComplete } = useSelector(
    (state) => state.game
  );

  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(currentTask.taskDetails?.timeLimit || 0);
  const [startTimer, setStartTimer] = useState(false);
  const [result, setResult] = useState({
    option: "",
    outcome: "",
  });

  const getFormattedTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleOption = (item, index) => {
    if (timer <= 0 || result.outcome) return;

    const isCorrect =
      currentTask.questions[currentQuestion]?.correctAnswer === item;

    if (isCorrect) {
      setResult({ option: index, outcome: "correct" });
      setScore(
        (prevScore) =>
          prevScore + Number(currentTask.taskDetails?.pointsPerQuestion || 0)
      );
      setCoins(
        (prevCoins) =>
          prevCoins + Number(currentTask.taskDetails?.coinsPerQuestion || 0)
      );
    } else {
      setResult({ option: index, outcome: "incorrect" });
    }

    if (currentQuestion === currentTask.questions.length - 1) {
      setStartTimer(false);
      handleGameCompletion();
    }
  };

  const handleGameCompletion = () => {
    dispatch(addCoins(coins));
    dispatch(addScore(score));
    if (timer <= 0) {
      dispatch(removeWaterLevel(20));
    } else if (score < Number(currentTask.taskDetails?.scoreThreshold || 0)) {
      dispatch(removeWaterLevel(10));
    } else {
      const timeLeft = Math.floor(timer / 1000);
      dispatch(addScore(timeLeft * 2));
      dispatch(addWaterLevel(10));
    }
    dispatch(updateUserProgress());
    dispatch(setTaskComplete());
    if (currentStep === 11) {
      dispatch(completeTutorial());
      dispatch(updateTutorialProgress({ completed: true, active: false }));
    }
  };

  useEffect(() => {
    if (startTimer && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(interval);
            handleGameCompletion();
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTimer, timer]);

  const percentage =
    ((currentTask.taskDetails?.timeLimit - timer) /
      (currentTask.taskDetails?.timeLimit || 1)) *
    100;

  let pathColor;

  if (percentage > 60) {
    pathColor = "#ef4444";
  } else if (percentage > 30) {
    pathColor = "#f59e0b";
  } else {
    pathColor = "#10b981";
  }

  return (
    <>
      <div className="w-36 h-36 absolute top-10 right-10">
        <CircularProgressbar
          value={percentage}
          text={getFormattedTime(timer)}
          styles={buildStyles({
            pathColor: pathColor,
            textColor: "#fff",
            trailColor: "#fff",
            strokeWidth: 6,
          })}
        />
      </div>
      <div className={`w-full h-[calc(100vh-64px)] flex flex-col p-4`}>
        <h1 className="text-4xl font-semibold text-cyan-300 inconsolata text-center mt-2">
          Quiz Name: {currentTask.name}
        </h1>
        <div className="w-[1300px] mx-auto montserrat">
          <div className="flex items-center justify-between mb-6">
            <button
              disabled={
                startTimer ||
                currentQuestion === currentTask.questions.length - 1
              }
              onClick={() => {
                dispatch(setTaskRunning());
                setStartTimer(true);
              }}
              className="montserrat mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-cyan-800  transition-all hover:scale-110 duration-300 shadow-lg cursor-pointer"
            >
              {isTaskRunning ? (
                <p>
                  Playing...{" "}
                  <FontAwesomeIcon
                    icon={faHourglass}
                    className="ml-2"
                  ></FontAwesomeIcon>
                </p>
              ) : (
                <p>
                  Play Quiz{" "}
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="ml-2"
                  ></FontAwesomeIcon>
                </p>
              )}
            </button>
          </div>
          <div className="flex gap-10 w-full mt-16 ">
            <div className="flex-[0.6] flex flex-col justify-center ">
              <h1 className="text-3xl font-semibold text-cyan-300 uppercase audiowide mb-5">
                Details:
              </h1>
              <div className="space-y-3 rounded-md p-4 bg-gradient-to-bl from-sky-500 to-sky-200 ">
                <h4 className="text-md text-gray-900">
                  <p className="font-semibold text-2xl text-gray-800 mb-2">
                    Description:
                  </p>
                  {currentTask.description}
                </h4>
                <p className="text-gray-800 font-semibold text-2xl">
                  Information for the player:
                </p>
                <ul className="list-disc ml-6 text-gray-900 text-md">
                  {currentTask.instructions?.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              <h1 className="text-3xl font-semibold text-cyan-300 uppercase audiowide">
                Questions
              </h1>
              <p className="text-lg font-medium text-cyan-400">
                <span className="text-xl">Q. </span>
                {currentTask.questions[currentQuestion]?.question}
              </p>
              <div>
                <h2 className="font-medium text-white">
                  Choose from the given options:
                </h2>
                <ul className="grid grid-cols-2 gap-8 mt-4">
                  {currentTask.questions[currentQuestion]?.options.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="cursor-pointer p-3 rounded-md bg-gradient-to-t from-sky-200 to-sky-50  hover:from-sky-50 hover:to-white  transition-all relative hover:shadow-xl hover:scale-105"
                        onClick={() => {
                          if (startTimer) {
                            handleOption(item, index);
                          }
                        }}
                      >
                        <div
                          className={`absolute inset-0 w-full h-full rounded-md ${
                            result.option === index
                              ? result.outcome === "correct"
                                ? "bg-green-600/50"
                                : "bg-red-600/50"
                              : ""
                          }`}
                        ></div>
                        <span className="block font-semibold text-lg text-blue-950">
                          Option {index + 1}:
                        </span>
                        <span className="block text-md text-gray-800">
                          {item}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {result.outcome &&
              currentQuestion < currentTask.questions.length - 1 && (
                <button
                  onClick={() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setResult({ option: "", outcome: "" });
                  }}
                  className="montserrat mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-cyan-800  transition-all hover:scale-110 duration-300 shadow-lg cursor-pointer absolute right-10 bottom-5"
                >
                  Next Question
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2"
                  ></FontAwesomeIcon>
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizGame;
