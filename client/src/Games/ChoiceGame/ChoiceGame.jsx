import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeWaterLevel,
  updateScore,
} from "../../lib/Slices/userSlice";
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";
import {
  faArrowRight,
  faHourglass,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserProgress } from "../../lib/Slices/userProgressSlice";

const colorMap = {
  best: "from-green-400 to-teal-600 hover:from-teal-600 hover:to-green-400",
  good: "from-yellow-300 to-orange-500 hover:from-orange-500 hover:to-yellow-300",
  worst: "from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-400",
  bad: "from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400",
};
const ChoiceGame = () => {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [popup, setPopup] = useState("");
  const [choiceSelected, setChoiceSelected] = useState(null);
  const [result, setResult] = useState({
    option: "",
    outcome: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { currentTask, isTaskRunning } = useSelector((state) => state.game);

  const handleOption = (index) => {
    if (!currentTask) return;

    if (choiceSelected === null) {
      const selectedChoice =
        currentTask?.scenarios?.[currentQuestion]?.options?.[index];
      const { score: Score, coins: Coins, outcomeText } = selectedChoice || {};

      setChoiceSelected(index);
      setScore((prevScore) => prevScore + (Score || 0));
      setCoins((prevCoins) => prevCoins + (Coins || 0));

      setPopup(outcomeText || "");
      setResult({
        option: index,
        outcome: outcomeText?.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    } else if (choiceSelected !== null) {
      const selectedChoice =
        currentTask?.scenarios?.[currentQuestion]?.options?.[index];
      const { outcomeText } = selectedChoice || {};

      setPopup(outcomeText || "");
      setResult({
        option: index,
        outcome: outcomeText?.split("-")[0].split(" ")[0].trim().toLowerCase(),
      });
    }
  };

  useEffect(() => {
    if (
      currentQuestion === currentTask?.scenarios?.length - 1 &&
      result.outcome
    ) {
      dispatch(addScore(score));
      dispatch(addCoins(coins));
      if (score < currentTask?.taskDetails?.scoreThreshold) {
        dispatch(
          removeWaterLevel(currentTask?.taskDetails?.waterLevelDeduction)
        );
      } else {
        const maxPoints = currentTask?.taskDetails?.maxPoints;
        const waterLevelIncrease = currentTask?.taskDetails?.waterLevelIncrease;

        let value;
        if (score === maxPoints) {
          value = Math.min(waterLevelIncrease, 100 - user?.groundWaterLevel);
        } else if (score >= Math.floor(maxPoints / 2)) {
          value = Math.min(
            waterLevelIncrease / 2,
            100 - user?.groundWaterLevel
          );
        }
        dispatch(addWaterLevel(value));
      }
      dispatch(updateScore());
      dispatch(updateUserProgress());
      dispatch(setTaskComplete());
    }
  }, [result]);

  return (
    <div className={`w-full h-[calc(100vh-64px)] flex flex-col p-4`}>
      <h1 className="text-4xl font-semibold text-cyan-300 inconsolata text-center mt-2">
        Choice Title: {currentTask.name}
      </h1>
      <div className="w-[1300px] mx-auto montserrat">
        <div className="flex items-center justify-between mb-6">
          <button
            className="montserrat mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-cyan-800  transition-all hover:scale-110 duration-300 shadow-lg cursor-pointer"
            onClick={() => {
              dispatch(setTaskRunning());
            }}
            disabled={currentQuestion === currentTask?.scenarios?.length - 1}
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
        {popup && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div
              className={`p-6 text-white rounded-lg shadow-lg transition-colors bg-gradient-to-r flex items-center justify-center flex-col ${
                colorMap[result.outcome]
              }`}
            >
              <p className="text-lg">{popup}</p>
              <button
                onClick={() => setPopup("")}
                className="mt-4 bg-gray-900 hover:opacity-75 text-white py-2 px-6 rounded cursor-pointer font-bold shadow-xl "
              >
                OK
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-10 w-full mt-6 flex-row-reverse ">
          <div className="flex-[0.6] flex flex-col ">
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
            {currentQuestion < currentTask?.scenarios?.length - 1 &&
              result.outcome && (
                <button
                  onClick={() => {
                    if (!popup) {
                      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
                      setResult({ option: "", outcome: "" });
                      setChoiceSelected(null);
                    }
                  }}
                  className="montserrat mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-cyan-800  transition-all hover:scale-110 duration-300 shadow-lg cursor-pointer w-1/2"
                >
                  Next Question
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="ml-2"
                  ></FontAwesomeIcon>
                </button>
              )}
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-cyan-300 uppercase audiowide">
              Scenarios
            </h1>
            <p className="text-lg font-medium text-cyan-200">
              {currentTask?.scenarios?.[currentQuestion]?.scenario}
            </p>
            <div>
              <h2 className="font-medium text-white">
                Choose from the given options:
              </h2>
              <ul className="flex flex-col gap-1 mt-4">
                {currentTask?.scenarios?.[currentQuestion]?.options?.map(
                  (item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        isTaskRunning && handleOption(index);
                      }}
                    >
                      <div
                        className={`cursor-pointer p-3 rounded-lg hover:scale-105 hover:shadow-xl bg-gradient-to-t transition-all relative ${
                          choiceSelected === index
                            ? `border-yellow-50 shadow-md rounded-none border-4 hover:scale-100 ${
                                result.outcome && index === result.option
                                  ? `${colorMap[result.outcome]}`
                                  : ` from-sky-200 to-sky-50  hover:from-sky-50 hover:to-white`
                              }`
                            : " from-sky-200 to-sky-50  hover:from-sky-50 hover:to-white   "
                        }`}
                      >
                        <span className="block font-semibold text-lg text-blue-950">
                          Choice {index + 1}:
                        </span>
                        <span className="block text-sm text-wrap text-gray-800">
                          {item?.choice}
                        </span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceGame;
