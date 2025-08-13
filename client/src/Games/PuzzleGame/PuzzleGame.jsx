import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCoins,
  addScore,
  addWaterLevel,
  removeCoins,
  removeWaterLevel,
  updateScore,
} from "../../lib/Slices/userSlice";
import { setTaskComplete, setTaskRunning } from "../../lib/Slices/gameSlice";
import {
  faCheck,
  faExclamationCircle,
  faHourglass,
  faLightbulb,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const randomLetterGenerator = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};
let interval;
const colorMap = {
  correct: "bg-green-500",
  incorrect: "bg-red-500",
  completion: "bg-blue-500",
};
const PuzzleGame = () => {
  const { currentTask } = useSelector((state) => state.game);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [feedBack, setFeedBack] = useState({ status: "", statement: "" });
  const [startDrag, setStartDrag] = useState(false);
  const [dragString, setDragString] = useState("");
  const [visitedPositions, setVisitedPositions] = useState(new Set());
  const [linePath, setLinePath] = useState("");
  const [lastValidPosition, setLastValidPosition] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(
    currentTask?.taskDetails?.maxAttempts || 0
  );
  const [storeAnswers, setStoreAnswers] = useState(new Set());
  const [answeredLetters, setAnsweredLetters] = useState({});
  const [hint, setHint] = useState("");
  const [hintsLeft, setHintsLeft] = useState(2);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isTaskRunning, isTaskComplete } = useSelector((state) => state.game);
  useEffect(() => {
    const initAnsweredLetters = {};
    currentTask?.crosswordGrid?.clues?.forEach((clue) => {
      const { position, direction, answer } = clue;
      for (let i = 0; i < answer.length; i++) {
        const key =
          direction === "across"
            ? `${position[0]},${Number(position[1]) + i}`
            : `${Number(position[0]) + i},${position[1]}`;
        if (!initAnsweredLetters[key]) {
          initAnsweredLetters[key] = {
            wordsFound: 0,
            totalWords: 1,
            foundAll: false,
          };
        } else {
          initAnsweredLetters[key].totalWords += 1;
        }
      }
    });
    setAnsweredLetters(initAnsweredLetters);
  }, []);

  const gridLetters = useMemo(() => {
    const grid = [];
    const { size, clues } = currentTask?.crosswordGrid;

    for (let i = 0; i < size[0]; i++) {
      const row = [];
      for (let j = 0; j < size[1]; j++) {
        const clue = clues.find((item) => {
          const [rowPos, colPos] = item.position;
          const isAcross = item.direction === "across";
          const isDown = item.direction === "down";
          return (
            (isAcross &&
              Number(rowPos) === i &&
              j >= Number(colPos) &&
              j < Number(colPos) + item.answer.length) ||
            (isDown &&
              Number(colPos) === j &&
              i >= Number(rowPos) &&
              i < Number(rowPos) + item.answer.length)
          );
        });

        if (clue) {
          const letterIndex =
            clue.direction === "across"
              ? j - Number(clue.position[1])
              : i - Number(clue.position[0]);
          row.push(clue.answer[letterIndex]);
        } else {
          row.push(randomLetterGenerator());
        }
      }
      grid.push(row);
    }
    return grid;
  }, [currentTask?.crosswordGrid]);

  const handleHint = useCallback(() => {
    const find = currentTask?.crosswordGrid?.clues?.find((item) => {
      return !storeAnswers.has(item);
    });
    if (!find || hintsLeft <= 0 || user.coins < 400 / hintsLeft) {
      return;
    }
    const hintCost = 400 / hintsLeft;
    setHint(find.clue);
    dispatch(removeCoins(hintCost));
    setHintsLeft((prevNum) => prevNum - 1);
  }, [storeAnswers, hintsLeft, user.coins]);

  const handleMouseDown = useCallback(
    (e) => {
      if (showResults || maxAttempts === 0) return;

      e.preventDefault();
      const [i, j] = e.currentTarget.dataset.position.split(",").map(Number);
      const positionKey = `${i},${j}`;
      if (answeredLetters[positionKey]?.foundAll) {
        return;
      }

      setStartDrag(true);
      setDragString(e.currentTarget.dataset.value);
      setVisitedPositions(new Set([positionKey]));
      setLinePath(`M${j * 50 + 25},${i * 50 + 25}`);
      setLastValidPosition({ i, j });
    },
    [answeredLetters, showResults, maxAttempts]
  );

  const handleMouseOver = useCallback(
    (e) => {
      if (!startDrag || showResults || maxAttempts === 0) return;

      const [i, j] = e.currentTarget.dataset.position.split(",").map(Number);
      const positionKey = `${i},${j}`;
      if (
        !visitedPositions.has(positionKey) &&
        !answeredLetters[positionKey]?.foundAll
      ) {
        const { i: lastI, j: lastJ } = lastValidPosition || {};
        const isValidMove =
          lastI !== undefined &&
          lastJ !== undefined &&
          (lastI === i || lastJ === j);

        if (isValidMove) {
          setDragString((prev) => prev + e.target.dataset.value);
          setVisitedPositions((prev) => new Set(prev).add(positionKey));
          setLinePath((prev) => prev + ` L${j * 50 + 25},${i * 50 + 25}`);
          setLastValidPosition({ i, j });
        }
      }
    },
    [
      startDrag,
      visitedPositions,
      lastValidPosition,
      answeredLetters,
      showResults,
      maxAttempts,
    ]
  );

  const handleAnswer = useCallback(() => {
    const isPresent = currentTask?.crosswordGrid?.clues?.find(
      (item) => item.answer === dragString
    );
    clearInterval(interval);
    setFeedBack({
      status: "correct",
      statement: currentTask?.feedback?.correct,
    });
    interval = setTimeout(() => {
      setFeedBack({ status: "", statement: "" });
    }, 1000);
    if (isPresent && !storeAnswers.has(isPresent)) {
      setStoreAnswers((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(isPresent);
        return newSet;
      });
      const { position, direction, answer } = isPresent;
      const [startRow, startCol] = position.map(Number);
      const newAnsweredLetters = { ...answeredLetters };

      for (let k = 0; k < answer.length; k++) {
        const posKey =
          direction === "across"
            ? `${startRow},${startCol + k}`
            : `${startRow + k},${startCol}`;

        if (!newAnsweredLetters[posKey]) {
          newAnsweredLetters[posKey] = { wordsFound: 0, totalWords: 1 };
        }
        newAnsweredLetters[posKey].wordsFound += 1;
        const isFullyAnswered =
          newAnsweredLetters[posKey].wordsFound ===
          newAnsweredLetters[posKey].totalWords;

        newAnsweredLetters[posKey].foundAll = isFullyAnswered;
      }

      setAnsweredLetters(newAnsweredLetters);

      setScore(
        (prevScore) =>
          prevScore + currentTask?.taskDetails?.pointsPerCorrectAnswer
      );
      setCoins(
        (prevCoins) =>
          prevCoins + currentTask?.taskDetails?.coinsPerCorrectAnswer
      );
    } else if (maxAttempts > 0) {
      clearInterval(interval);
      setFeedBack({
        status: "incorrect",
        statement: currentTask?.feedback?.incorrect,
      });
      interval = setTimeout(() => {
        setFeedBack({ status: "", statement: "" });
      }, 1000);
      setMaxAttempts((prevAttempts) => prevAttempts - 1);
    }
  }, [dragString, storeAnswers, answeredLetters, maxAttempts]);

  const handleMouseUp = useCallback(() => {
    if (showResults) return;

    setStartDrag(false);
    setVisitedPositions(new Set());
    setLinePath("");
    setLastValidPosition(null);
    if (dragString.length > 1) {
      handleAnswer();
    }
    setDragString("");
  }, [dragString, handleAnswer, showResults, setShowResults]);

  useEffect(() => {
    if (
      storeAnswers.size === currentTask?.crosswordGrid?.clues?.length ||
      maxAttempts === 0
    ) {
      dispatch(addScore(score));
      dispatch(addCoins(coins));
      if (maxAttempts !== 0) {
        clearInterval(interval);
        setFeedBack({
          status: "completion",
          statement: currentTask?.feedback?.completion,
        });
        interval = setTimeout(() => {
          setFeedBack({ status: "", statement: "" });
        }, 1000);
      }
      if (score < currentTask?.taskDetails?.scoreThreshold) {
        dispatch(
          removeWaterLevel(currentTask?.taskDetails?.waterLevelDeduction)
        );
      } else {
        if (maxAttempts === currentTask?.taskDetails?.maxAttempts) {
          dispatch(addScore(currentTask?.taskDetails?.bonusForCompletion));
          dispatch(addWaterLevel(20));
        } else {
          dispatch(addWaterLevel(10));
        }
      }
      dispatch(updateScore());
      dispatch(setTaskComplete());
      setShowResults(true);
    }
  }, [storeAnswers, maxAttempts]);
  return (
    <div
      className={`w-full h-[calc(100vh-64px)] flex flex-col p-4`}
      onMouseUp={handleMouseUp}
    >
      <h1 className="text-4xl font-semibold text-cyan-300 inconsolata text-center mt-2">
        Puzzle Name: {currentTask.name}
      </h1>
      {hint && (
        <div className="absolute top-2 p-4 bg-gradient-to-r from-emerald-100 to-emerald-600 text-cyan-900 left-1/2 -translate-x-1/2 rounded-lg flex gap-2 flex-col">
          <h3 className="text-xl font-bold">Hint {2 - hintsLeft}</h3>
          <p className="text-emerald-900">{hint}</p>
          <button
            className="bg-cyan-800 p-2 rounded-md text-cyan-100 hover:opacity-85"
            onClick={() => {
              setHint("");
            }}
          >
            Done
          </button>
        </div>
      )}
      <div className="w-[1300px] mx-auto montserrat">
        <div className="flex items-center justify-between mb-4">
          <button
            disabled={isTaskRunning || isTaskComplete}
            onClick={() => {
              dispatch(setTaskRunning());
              setStartTimer(true);
            }}
            className="montserrat mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-md hover:from-cyan-400 hover:to-cyan-800  transition-all hover:scale-110 duration-300 shadow-lg cursor-pointer"
          >
            {isTaskRunning ? (
              <p>
                Playing...
                <FontAwesomeIcon
                  icon={faHourglass}
                  className="ml-2"
                ></FontAwesomeIcon>
              </p>
            ) : !isTaskComplete ? (
              <p>
                Play Puzzle{" "}
                <FontAwesomeIcon
                  icon={faPlay}
                  className="ml-2"
                ></FontAwesomeIcon>
              </p>
            ) : maxAttempts !== 0 ? (
              <p>
                Task Completed
                <FontAwesomeIcon
                  icon={faCheck}
                  className="ml-2"
                ></FontAwesomeIcon>
              </p>
            ) : (
              <p>
                Task Failed{" "}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="ml-2"
                ></FontAwesomeIcon>
              </p>
            )}
          </button>
        </div>
        {feedBack.statement && (
          <div
            className={`absolute left-2 bottom-2 p-2 ${
              colorMap[feedBack.status]
            }`}
          >
            <p className="text-md font-bold text-white montserrat">
              {feedBack.statement}
            </p>
          </div>
        )}
        <div className="flex gap-10 w-full ">
          <div className="absolute top-20 right-4 p-4 bg-gradient-to-r bg-cyan-100  rounded-full w-36">
            <p className="text-cyan-950 text-md">
              Attempts: {maxAttempts}/{currentTask?.taskDetails?.maxAttempts}
            </p>
          </div>
          <div className="flex flex-col flex-[0.8] justify-center ">
            <h1 className="text-3xl font-semibold text-emerald-300 uppercase audiowide mb-5">
              Details:
            </h1>
            <div className="space-y-3 rounded-md p-4 bg-gradient-to-l from-emerald-500 to-green-100 ">
              <h4 className="text-md text-gray-900">
                <p className="font-semibold text-2xl text-gray-800 mb-2">
                  Description:
                </p>
                {currentTask.description}
              </h4>
              <p className="text-gray-900 font-semibold text-2xl">
                Information for the player:
              </p>
              <ul className="list-disc ml-6 text-gray-800 text-md">
                {currentTask.instructions?.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-10">
            <div
              className="bg-white flex flex-1 flex-wrap relative shadow-lg "
              style={{
                width: `${currentTask?.crosswordGrid?.size[1] * 50}px`,
              }}
            >
              {gridLetters.map((row, i) =>
                row.map((letter, j) => {
                  const positionKey = `${i},${j}`;
                  const cellClass = answeredLetters[positionKey]?.foundAll
                    ? "bg-green-200"
                    : answeredLetters[positionKey]?.wordsFound >= 1
                    ? "bg-blue-200"
                    : "bg-white";
                  return (
                    <div
                      key={`${i}-${j}`}
                      data-value={letter}
                      data-position={`${i},${j}`}
                      className={`w-[50px] h-[50px] border flex items-center justify-center select-none ${cellClass} border-cyan-950 audiowide text-cyan-950 ${
                        answeredLetters[positionKey]?.foundAll
                          ? `cursor-not-allowed`
                          : startDrag
                          ? `cursor-grab`
                          : `cursor-pointer`
                      }`}
                      onMouseDown={isTaskRunning && handleMouseDown}
                      onMouseOver={isTaskRunning && handleMouseOver}
                    >
                      {letter}
                    </div>
                  );
                })
              )}
              <svg
                className="absolute top-0 left-0"
                style={{
                  width: `${currentTask?.crosswordGrid?.size[1] * 50}px`,
                  height: `${currentTask?.crosswordGrid?.size[0] * 50}px`,
                  pointerEvents: "none",
                }}
              >
                <path
                  d={linePath}
                  stroke="#1CBD87"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col w-72 items-center justify-center">
              <h1 className="text-3xl font-semibold text-cyan-300 uppercase audiowide mb-5">
                Hints:
              </h1>
              <div className="bg-gradient-to-tl from-cyan-700 to-cyan-300 p-4 rounded-md">
                <ol className="flex flex-col gap-2 text-wrap list-decimal list-inside">
                  {currentTask?.crosswordGrid?.hints?.map((item, index) => {
                    return (
                      <li key={index} className="text-sm text-gray-800">
                        {item.hint}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center justify-center flex-col  text-cyan-200 rounded-lg shadow-lg transform -translate-y-1/2 transition-all duration-300 ${
              user.coins < 400 / hintsLeft
                ? `opacity-70 cursor-not-allowed`
                : `opacity-100 cursor-pointer `
            } absolute right-5 top-[38%]`}
          >
            <p className="text-lg font-semibold">{hintsLeft}/2</p>
            <button
              onClick={handleHint}
              disabled={!isTaskRunning || user.coins < 400 / hintsLeft}
              className={`mt-2 transition-all px-4 py-2 rounded-md bg-cyan-500 text-white hover:shadow-xl hover:scale-105 ${
                user.coins < 400 / hintsLeft
                  ? `bg-gray-300 cursor-not-allowed`
                  : `hover:bg-cyan-600`
              }`}
            >
              Use Clue
              <FontAwesomeIcon
                icon={faLightbulb}
                className="text-yellow-200 ml-2"
              ></FontAwesomeIcon>
            </button>
            {hintsLeft > 0 && (
              <p className="text-sm mt-2 ">
                <span className="font-bold uppercase text-cyan-400">
                  Cost:{" "}
                </span>
                {400 / hintsLeft} coins
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGame;
