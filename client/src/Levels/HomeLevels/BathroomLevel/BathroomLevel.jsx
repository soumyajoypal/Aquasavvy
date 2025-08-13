import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BathroomLevelImage from "../../../assets/Levels/HomeLevel/Bathroom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShower,
  faTools,
  faToilet,
  faWater,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/shower.png";
import taskicon2 from "../../../assets/Icons/bathtub.png";
import taskicon3 from "../../../assets/Icons/toilet.png";
import Joyride, { STATUS } from "react-joyride";
import {
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Water-Saving Shower Challenge",
    description:
      "Take on the challenge of reducing your shower time to save water. Shorter showers conserve a significant amount of water, helping to protect our groundwater resources.",
    images: [
      <FontAwesomeIcon icon={faShower} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Fix the Leaky Bathtub",
    description:
      "Identify and repair leaks in the bathtub to prevent water wastage. A small drip can lead to significant water loss over time, impacting groundwater levels.",
    images: [
      <FontAwesomeIcon icon={faTools} className="text-red-500 w-12 h-12" />,
    ],
  },
  {
    title: "Dual-Flush Toilet Upgrade",
    description:
      "Upgrade to a dual-flush toilet system that allows you to choose the amount of water used per flush. This reduces water consumption and conserves groundwater.",
    images: [
      <FontAwesomeIcon icon={faToilet} className="text-gray-500 w-12 h-12" />,
    ],
  },
  {
    title: "Install Low-Flow Showerheads",
    description:
      "Switch to low-flow showerheads that use less water without compromising on shower quality. This simple upgrade can significantly reduce water usage.",
    images: [
      <FontAwesomeIcon icon={faWater} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Collect and Reuse Shower Water",
    description:
      "Place a bucket in the shower to collect water as it warms up. Use this water for tasks like cleaning or watering plants, reducing overall water wastage.",
    images: [
      <FontAwesomeIcon icon={faRecycle} className="text-green-500 w-12 h-12" />,
    ],
  },
];

const BathroomLevel = () => {
  const { modalOpen, bathroomLevel } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the BathRoom Level! Let's explore sustainable farming practices to conserve groundwater.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "Here are your tasks. Complete them to learn more about water-saving techniques and achieve your goals in the game.",
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
      dispatch(setIntroTrue("bathroomLevel"));
      dispatch(setModalOpen());
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${BathroomLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <button
        onClick={() => {
          navigate("/element/home");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <Joyride
        steps={steps}
        run={!bathroomLevel}
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
            Bathroom Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=bathroom&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Water-Saving Shower Challenge
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Encourage players to take shorter showers to conserve water. The
                challenge is to reduce shower time to five minutes or less,
                helping to save gallons of water daily
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/60  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=bathroom&type=quiz`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Fix the Leaky Bathtub
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Task players with identifying and fixing a leaky faucet in the
                bathroom. This activity teaches them the importance of
                maintaining fixtures to prevent water wastage
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=bathroom&type=puzzle`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Dual-Flush Toilet Upgrade
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Encourage players to install a dual-flush toilet system to
                reduce water use. The task highlights the efficiency of using
                less water for liquid waste and more for solid waste
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BathroomLevel;
