import React, { useState } from "react";
import cropLevelImage from "../../../assets/Levels/FarmLevel/Crop-Level.png";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  setCurrentStep,
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Joyride from "react-joyride";
import {
  faArrowLeft,
  faCloudRain,
  faLeaf,
  faLightbulb,
  faLock,
  faPlayCircle,
  faSeedling,
  faSyncAlt,
  faTint,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterLeaf.png";
import taskicon2 from "../../../assets/Icons/mulching.png";
import taskicon3 from "../../../assets/Icons/legumes.png";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Use Drip Irrigation",
    description:
      "Implement drip irrigation systems to deliver water directly to the plant roots, minimizing water loss through evaporation and runoff.",
    images: [
      <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Mulching to Retain Moisture",
    description:
      "Apply mulch around crops to retain soil moisture, reduce weed growth, and prevent soil erosion, promoting healthy plant growth.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Rainwater Harvesting",
    description:
      "Set up rainwater harvesting systems to collect and store rainwater for irrigation purposes, reducing reliance on groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faCloudRain}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Soil Moisture Monitoring",
    description:
      "Utilize soil moisture sensors to monitor the water levels in the soil and optimize irrigation schedules, ensuring crops receive the right amount of water.",
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
      "Practice crop rotation to improve soil health and water retention, reducing the need for excessive irrigation.",
    images: [
      <FontAwesomeIcon
        icon={faSyncAlt}
        className="text-yellow-500 w-12 h-12"
      />,
    ],
  },
];
const steps = [
  {
    target: ".joyride-step-1",
    content:
      "Welcome to the Crop Level! Let's explore sustainable farming practices to conserve groundwater.",
    placement: "center",
  },
  {
    target: ".joyride-step-2",
    content:
      "Here are your tasks. Complete them to learn more about water-smart crop management and achieve your goals in the game.",
    placement: "bottom",
  },
  {
    target: ".joyride-step-3",
    content:
      "After this guide, you'll get more detailed information in a modal. Follow the instructions to successfully complete your tasks.",
    placement: "center",
  },
  {
    target: ".joyride-step-1",
    content: "This is the first task you will start with",
    placement: "left",
  },
];

const tasks = [
  {
    title: "Water-Smart Crop Management Quiz",
    type: "quiz",
    icon: taskicon1,
    description: "Test your knowledge on sustainable crop management...",
  },
  {
    title: "Mulching to Reduce Evaporation",
    type: "choice",
    icon: taskicon2,
    description: "Apply organic mulch around crops...",
  },
  {
    title: "Implement Crop Rotation with Legumes",
    type: "puzzle",
    icon: taskicon3,
    description: "Rotate crops by planting legumes...",
  },
];

const CropLevel = () => {
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { elements } = useSelector((state) => state.progress);
  const check = elements[0].levels[0].tasks;

  const [modalOpen, setModalOpen] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];
    if (finishedStatuses.includes(status)) {
      setModalOpen(true);
      dispatch(nextStep());
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${cropLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat flex items-center justify-center`}
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
          if (active) {
            dispatch(setCurrentStep(4));
          }
          navigate("/element/farm");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <Joyride
        steps={steps}
        run={active}
        callback={handleJoyrideCallback}
        continuous
        showProgress={false}
        showSkipButton
        locale={{
          back: "Previous", // Custom text for the Back button
          last: "Finish", // Custom text for the Last button (usually the Finish button)
          next: "Next", // Custom text for the Next button
          skip: "Skip", // Custom text for the Skip button
        }}
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#4A90E2",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#000",
            textColor: "#fff",
            width: 300,
            zIndex: 1000,
          },
          buttonNext: {
            backgroundColor: "white", // Tailwind green-500
            color: "black",
            borderRadius: 8,
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonBack: {
            backgroundColor: "black", // Tailwind gray-50
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          tooltip: {
            borderRadius: "20px", // Increase this value to make the corners more rounded
            padding: "15px", // Adjust padding as needed
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // Optional: Adjust the box shadow
            fontSize: "15px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "600",
            color: "black",
          },
          spotlight: {
            borderRadius: "20px", // Increase this value to make the spotlight's border radius bigger
          },
        }}
      />
      {modalOpen && (
        <ModalComponent modalData={modalData} setModalOpen={setModalOpen} />
      )}
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Crop Level
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

export default CropLevel;
