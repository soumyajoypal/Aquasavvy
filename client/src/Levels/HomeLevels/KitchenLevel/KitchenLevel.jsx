import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KitchenLevelImage from "../../../assets/Levels/HomeLevel/Kitchen-Level.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUtensils,
  faTint,
  faCloudRain,
  faSearch,
  faFaucet,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/dishwasher.png";
import taskicon2 from "../../../assets/Icons/rainwaterTank.png";
import taskicon3 from "../../../assets/Icons/faucet.png";
import Joyride, { STATUS } from "react-joyride";
import {
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Install Water-Efficient Appliances",
    description:
      "Upgrade your kitchen with water-efficient appliances, such as dishwashers and faucets, to minimize water usage without sacrificing performance.",
    images: [
      <FontAwesomeIcon icon={faTint} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Use Rainwater for Household Needs",
    description:
      "Implement a rainwater harvesting system to collect and use rainwater for non-potable household tasks, such as dishwashing and cleaning, reducing the demand on groundwater.",
    images: [
      <FontAwesomeIcon
        icon={faCloudRain}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Regularly Inspect for Leaks",
    description:
      "Conduct routine inspections in your kitchen to detect and repair any leaks in pipes and faucets, preventing water wastage and reducing the strain on groundwater sources.",
    images: [
      <FontAwesomeIcon icon={faSearch} className="text-red-500 w-12 h-12" />,
    ],
  },
  {
    title: "Adopt Low-Flow Faucets",
    description:
      "Install low-flow faucets in your kitchen to reduce the flow of water while maintaining effective cleaning, thus conserving water with every use.",
    images: [
      <FontAwesomeIcon icon={faFaucet} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Use a Water-Efficient Dishwasher",
    description:
      "Switch to a water-efficient dishwasher that uses less water per cycle, ensuring clean dishes while conserving water.",
    images: [
      <FontAwesomeIcon
        icon={faUtensils}
        className="text-purple-500 w-12 h-12"
      />,
    ],
  },
];

const KitchenLevel = () => {
  const { modalOpen, kitchenLevel } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Kitchen Level! Let's learn how to conserve water.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "These are your tasks. Complete them to achieve your goals in the game.",
      placement: "bottom",
    },
    {
      target: ".joyride-step-3",
      content:
        "Important information will be provided in a modal after this guide. Make sure to follow it to complete your tasks.",
      placement: "center",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, kitchenLevel } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      dispatch(setIntroTrue("kitchenLevel"));
      dispatch(setModalOpen());
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${KitchenLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/home");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <Joyride
        steps={steps}
        callback={handleJoyrideCallback}
        run={!kitchenLevel}
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
      {!modalOpen && (
        <div className="z-50">
          <h1 className="text-white text-4xl font-bold text-center mb-6 audiowide">
            Kitchen Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Water-Efficient Appliances
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Upgrade to water-efficient appliances like dishwashers and
                washing machines to reduce water usage in the home
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/60  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(`/game/taskPage?element=home&level=kitchen&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Rainwater Harvesting for Household Use
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Set up a rainwater harvesting system in your home to collect and
                store rainwater
              </p>
            </div>
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=puzzle`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Leak Detection and Repair
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Repairing leaks promptly can save a significant amount of water
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen && <ModalComponent modalData={modalData} />}
    </div>
  );
};

export default KitchenLevel;
