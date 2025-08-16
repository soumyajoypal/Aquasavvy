import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTask,
  resetTask,
  setTaskInfo,
} from "../../../lib/Slices/gameSlice";
import { setCurrentStep, setGameTrue } from "../../../lib/Slices/tutorialSlice";
import QuizGame from "../../../Games/QuizGame/QuizGame";
import PuzzleGame from "../../../Games/PuzzleGame/PuzzleGame";
import ChoiceGame from "../../../Games/ChoiceGame/ChoiceGame";
import { Vortex } from "react-loader-spinner";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import {
  faArrowAltCircleLeft,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Joyride, { STATUS } from "react-joyride";
import { useState } from "react";
const gameMap = {
  quiz: QuizGame,
  puzzle: PuzzleGame,
  choice: ChoiceGame,
};

const steps = {
  quiz: [
    {
      target: ".quiz-question",
      content: "Answer the question by selecting the correct option.",
      placement: "top",
    },
  ],
  puzzle: [
    {
      target: ".puzzle-board",
      content: "Arrange the pieces to solve the puzzle.",
      placement: "top",
    },
  ],
  choice: [
    {
      target: ".choice-options",
      content: "Pick the correct choice to proceed.",
      placement: "top",
    },
  ],
};

const TaskPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { currentTask, status, error, isTaskRunning } = useSelector(
    (state) => state.game
  );
  const {
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const element = searchParams.get("element");
  const level = searchParams.get("level");
  const type = searchParams.get("type");

  useEffect(() => {
    if (element && level && type) {
      dispatch(
        setTaskInfo({ gameLevel: level, gameElement: element, taskType: type })
      );
      dispatch(fetchTask({ level, element, type }));
    }
  }, [dispatch, element, level, type]);

  if (status === "loading") {
    return (
      <ContentWrapper>
        <div className="w-full h-[calc(100vh-64px)] flex flex-col p-4 items-center justify-center">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["#00A9E0", "#00B2A9", "#007A7A", "#E0F7FA", "#00A859"]}
          />
        </div>
      </ContentWrapper>
    );
  }

  if (status === "error") {
    return (
      <ContentWrapper>
        <h1 className="text-xl font-semibold">Error: {error}</h1>
      </ContentWrapper>
    );
  }

  const GameComponent = gameMap[type];

  const handleJoyride = ({ status }) => {
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setJoyrideRun(false);
      dispatch(setGameTrue(type));
    }
  };

  return (
    <ContentWrapper>
      {currentTask && currentTask.name ? (
        <>
          <button
            onClick={() => {
              if (!isTaskRunning) {
                dispatch(resetTask());
                if (active) {
                  dispatch(setCurrentStep(6));
                }
                navigate(`/element/${element}/level/${level}-level`);
              }
            }}
            className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
          >
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </button>
          <GameComponent></GameComponent>
        </>
      ) : (
        <div className="text-gray-500">No Task Found</div>
      )}
    </ContentWrapper>
  );
};

export default TaskPage;
