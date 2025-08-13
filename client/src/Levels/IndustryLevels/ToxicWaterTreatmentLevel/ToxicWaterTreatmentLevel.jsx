import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToxicLevel from "../../../assets/Levels/IndustryLevel/toxicwater.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRecycle,
  faFlask,
  faTint,
  faIndustry,
  faBiohazard,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/waterpipe.png";
import taskicon2 from "../../../assets/Icons/testtube.png";
import taskicon3 from "../../../assets/Icons/search.png";
import Joyride, { STATUS } from "react-joyride";
import {
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Wastewater Recycling Setup",
    description:
      "Implement a wastewater recycling system in the industry to treat and reuse toxic water. This reduces the discharge of harmful pollutants into groundwater and conserves water resources.",
    images: [
      <FontAwesomeIcon icon={faRecycle} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Toxic Chemical Neutralization",
    description:
      "Develop and integrate a chemical neutralization process to detoxify harmful chemicals before they reach groundwater. This prevents contamination and protects water quality.",
    images: [
      <FontAwesomeIcon icon={faFlask} className="text-red-500 w-12 h-12" />,
    ],
  },
  {
    title: "Groundwater Monitoring System",
    description:
      "Install a comprehensive groundwater monitoring system that tracks water quality and quantity near the industry. Regular monitoring helps detect and address potential contamination issues early.",
    images: [
      <FontAwesomeIcon icon={faTint} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Effluent Treatment Plants",
    description:
      "Set up effluent treatment plants to treat industrial wastewater before it is released into the environment. Proper treatment prevents harmful substances from contaminating groundwater.",
    images: [
      <FontAwesomeIcon icon={faIndustry} className="text-gray-500 w-12 h-12" />,
    ],
  },
  {
    title: "Hazardous Waste Management",
    description:
      "Implement a hazardous waste management program to safely handle and dispose of toxic materials, preventing them from leaching into groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faBiohazard}
        className="text-yellow-500 w-12 h-12"
      />,
    ],
  },
];

const ToxicWaterTreatmentLevel = () => {
  const { modalOpen, toxicWaterLevel } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Toxic Water Treatment Level! Let's explore sustainable water disposing practices to conserve groundwater.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "Here are your tasks. Complete them to learn more about eco-friendly water disposal management from industries and achieve your goals in the game.",
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
      dispatch(setIntroTrue("toxicWaterLevel"));
      dispatch(setModalOpen());
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${ToxicLevel})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/industry");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <Joyride
        steps={steps}
        run={!toxicWaterLevel}
        callback={handleJoyrideCallback}
        continuous
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
            Toxic Water Treatment Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=toxic-water-treatment&type=quiz`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Wastewater Recycling Setup
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Implement a wastewater recycling system in the industry to treat
                and reuse toxic water
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=toxic-water-treatment&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Toxic Chemical Neutralization
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Develop and integrate a chemical neutralization process in the
                industrial setup to detoxify harmful chemicals before they reach
                the groundwater
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=industry&level=toxic-water-treatment&type=quiz`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Groundwater Monitoring System
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                nstall a comprehensive groundwater monitoring system that tracks
                the quality and quantity of groundwater near the industry
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToxicWaterTreatmentLevel;
