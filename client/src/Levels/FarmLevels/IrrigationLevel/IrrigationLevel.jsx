import React, { useState } from "react";
import irrigationLevelImage from "../../../assets/Levels/FarmLevel/Irrigation.png";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faWater,
  faCloudRain,
  faLeaf,
  faSeedling,
  faSyncAlt,
  faLightbulb,
  faLock,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterhose.png";
import taskicon3 from "../../../assets/Icons/mulch.png";
import taskicon2 from "../../../assets/Icons/rainTank.png";
import Joyride, { STATUS } from "react-joyride";
import {
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Drip Irrigation Setup",
    description:
      "Install drip irrigation systems to ensure efficient water delivery directly to the plant roots. This method helps reduce water wastage through evaporation and runoff, promoting water conservation.",
    images: [
      <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Rainwater Harvesting Installation",
    description:
      "Set up rainwater harvesting systems to collect and store rainwater. This stored water can be used for irrigation, reducing the dependence on groundwater and conserving water resources.",
    images: [
      <FontAwesomeIcon
        icon={faCloudRain}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Mulching Practice",
    description:
      "Apply mulch around crops to help retain soil moisture, reduce weed growth, and prevent soil erosion. This practice supports healthy plant growth and efficient water use.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Soil Moisture Monitoring",
    description:
      "Use soil moisture sensors to keep track of soil water levels. This helps optimize irrigation schedules and ensures crops receive the right amount of water for healthy growth.",
    images: [
      <FontAwesomeIcon
        icon={faSeedling}
        className="text-green-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Crop Rotation",
    description:
      "Implement crop rotation techniques to enhance soil health and improve water retention. This reduces the need for excessive irrigation and supports sustainable farming practices.",
    images: [
      <FontAwesomeIcon
        icon={faSyncAlt}
        className="text-yellow-500 w-12 h-12"
      />,
    ],
  },
];

const IrrigationLevel = () => {
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { elements } = useSelector((state) => state.progress);
  const check = elements[0].levels[1].tasks;

  const [modalOpen, setModalOpen] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      dispatch(setIntroTrue("irrigationLevel"));
      dispatch(setModalOpen());
    }
  };

  const tasks = [
    {
      title: "Drip Irrigation Setup",
      type: "puzzle",
      icon: taskicon1,
      description:
        "Set up a drip irrigation system on the farm to reduce water wastage and enhance efficient water use by delivering water directly to the roots of the crops",
    },
    {
      title: "Rainwater Harvesting Installation",
      type: "choice",
      icon: taskicon2,
      description:
        "Install a rainwater harvesting system to collect and store rainwater for irrigation purposes, reducing dependence on groundwater",
    },
    {
      title: "Mulching Practice",
      type: "quiz",
      icon: taskicon3,
      description:
        "Apply mulch around plants to retain soil moisture, reduce evaporation, and minimize the need for additional irrigation, thereby conserving groundwater",
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${irrigationLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <button
        className="absolute top-20 left-5 z-50 flex items-center gap-2 
                   bg-gradient-to-r from-purple-600 to-indigo-600 
                   text-white px-4 py-2 rounded-full shadow-lg
                   hover:scale-105 hover:from-purple-700 hover:to-indigo-700 
                   transition-all duration-200 ease-in-out"
        onClick={() => setModalOpen(true)}
      >
        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-300" />
        <span className="font-semibold tracking-wide">Trivia</span>
      </button>
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/farm");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      {modalOpen && (
        <ModalComponent modalData={modalData} setModalOpen={setModalOpen} />
      )}
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Irrigation Level
          </h1>
          <div className="flex justify-center space-x-6">
            {tasks.map((task, index) => {
              const isLocked =
                (active && index !== 0) || !check[index].unlocked;
              const isFailed = check[index]?.failed;
              const isCompleted = check[index]?.completed;

              return (
                <div
                  key={index}
                  className={`relative w-72 h-96 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg transition-transform joyride-step-${
                    index + 1
                  }
                  ${
                    isLocked
                      ? "bg-gray-800/70 cursor-not-allowed"
                      : "bg-black/50 hover:scale-105 cursor-pointer"
                  }
                  ${
                    currentStep === 8 && index === 0
                      ? "animate-pulse hover:animate-none"
                      : ""
                  }
                `}
                  onClick={() => {
                    if (!isLocked) {
                      if (index === 0 && active) {
                        dispatch(nextStep());
                      }
                      navigate(
                        `/game/taskPage?element=farm&level=crop&type=${task.type}`
                      );
                    }
                  }}
                >
                  {/* Overlay for locked tasks */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-white text-4xl mb-2"
                      />
                      <p className="text-sm text-gray-300">Locked</p>
                    </div>
                  )}

                  {/* Status badge */}
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-semibold shadow-md
                    flex items-center gap-2
                    bg-white text-gray-800"
                  >
                    {isFailed ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSyncAlt}
                          className="text-red-500"
                        />
                        <span className="text-red-600">Retry</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <FontAwesomeIcon
                          icon={faLightbulb}
                          className="text-yellow-500"
                        />
                        <span className="text-yellow-600">Replay</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPlayCircle}
                          className="text-green-500"
                        />
                        <span className="text-green-600">Start</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-2 montserrat text-white">
                    Task {index + 1}
                  </h2>
                  <p className="text-base text-white text-center montserrat">
                    {task.title}
                  </p>
                  <img src={task.icon} alt="icon" className="w-12 h-12 m-2" />
                  <p className="text-center inconsolata">{task.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IrrigationLevel;
