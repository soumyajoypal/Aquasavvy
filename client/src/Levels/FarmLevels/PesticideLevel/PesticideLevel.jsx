import React, { useState } from "react";
import pesticideLevelImage from "../../../assets/Levels/FarmLevel/Pesticide.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBug,
  faLeaf,
  faTree,
  faSearch,
  faInfoCircle,
  faLock,
  faPlayCircle,
  faSyncAlt,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/pestcontrol.png";
import taskicon2 from "../../../assets/Icons/plantwithroot.png";
import taskicon3 from "../../../assets/Icons/watershield.png";
import { setIntroTrue, setModalOpen } from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Integrated Pest Management",
    description:
      "Implement Integrated Pest Management (IPM) practices to control pests using a combination of biological, cultural, and mechanical methods. This reduces reliance on chemical pesticides and minimizes environmental impact.",
    images: [
      <FontAwesomeIcon icon={faBug} className="text-red-500 w-12 h-12" />,
    ],
  },
  {
    title: "Use of Biopesticides",
    description:
      "Utilize biopesticides derived from natural organisms to manage pests. These environmentally friendly alternatives to chemical pesticides reduce harm to beneficial insects and soil health.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Buffer Zones Creation",
    description:
      "Create buffer zones around fields to prevent pesticide drift and contamination of nearby water sources. These zones help protect natural ecosystems and maintain groundwater quality.",
    images: [
      <FontAwesomeIcon icon={faTree} className="text-green-700 w-12 h-12" />,
    ],
  },
  {
    title: "Pest Monitoring Systems",
    description:
      "Set up pest monitoring systems to track pest populations and activity. This data helps in making informed decisions about pest control, reducing the need for widespread pesticide use.",
    images: [
      <FontAwesomeIcon icon={faSearch} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Educate on Safe Pesticide Use",
    description:
      "Provide training and resources on the safe and effective use of pesticides. Proper application techniques and safety measures help prevent overuse and reduce environmental impact.",
    images: [
      <FontAwesomeIcon
        icon={faInfoCircle}
        className="text-yellow-600 w-12 h-12"
      />,
    ],
  },
];

const PesticideLevel = () => {
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const { elements } = useSelector((state) => state.progress);
  const check = elements[0].levels[2].tasks; // adjust index if pesticide isn't level[2]

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const tasks = [
    {
      title: "Integrated Pest Management",
      type: "quiz",
      icon: taskicon1,
      description:
        "Implement Integrated Pest Management (IPM) practices that combine biological methods to control pests",
    },
    {
      title: "Use of Biopesticides",
      type: "choice",
      icon: taskicon2,
      description:
        "Encourage the use of biopesticides derived from natural materials such as plants, bacteria, and minerals",
    },
    {
      title: "Buffer Zones Creation",
      type: "quiz",
      icon: taskicon3,
      description:
        "Create buffer zones of vegetation between crop fields and water sources",
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${pesticideLevelImage})` }}
      className="w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat flex items-center justify-center"
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
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {modalOpen && (
        <ModalComponent modalData={modalData} setModalOpen={setModalOpen} />
      )}

      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Pesticide Level
          </h1>
          <div className="flex justify-center space-x-6">
            {tasks.map((task, index) => {
              const isLocked =
                (active && index !== 0) || !check[index]?.unlocked;
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
                    }`}
                  onClick={() => {
                    if (!isLocked) {
                      navigate(
                        `/game/taskPage?element=farm&level=pesticide&type=${task.type}`
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-semibold shadow-md flex items-center gap-2 bg-white text-gray-800">
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

export default PesticideLevel;
