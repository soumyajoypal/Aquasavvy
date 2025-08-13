import React, { useState } from "react";
import cropLevelImage from "../../../assets/Levels/FarmLevel/Crop-Level.png";
import { useDispatch, useSelector } from "react-redux";
import {
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

const CropLevel = () => {
  const { modalOpen, cropLevel } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      dispatch(setIntroTrue("cropLevel"));
      dispatch(setModalOpen());
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${cropLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/farm");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <Joyride
        steps={steps}
        run={!cropLevel}
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
      {modalOpen && <ModalComponent modalData={modalData} />}
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Crop Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Water-Smart Crop Management Quiz
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Test your knowledge on sustainable crop management practices
                that protect and conserve groundwater
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=choice`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Mulching to Reduce Evaporation
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Apply organic mulch around crops to retain soil moisture and
                reduce evaporation
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=puzzle`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Implement Crop Rotation with Legumes
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Rotate crops by planting legumes to improve soil health and
                water retention
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropLevel;
