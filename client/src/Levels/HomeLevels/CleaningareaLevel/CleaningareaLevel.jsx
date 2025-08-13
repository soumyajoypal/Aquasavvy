import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CleaningAreaLevel from "../../../assets/Levels/HomeLevel/Cleaningarea.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faClock,
  faRecycle,
  faSnowflake,
  faTachometerAlt,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/washingmachine.png";
import taskicon2 from "../../../assets/Icons/savewater.png";
import taskicon3 from "../../../assets/Icons/timer.png";
import Joyride, { STATUS } from "react-joyride";
import {
  setIntroTrue,
  setModalClose,
  setModalOpen,
} from "../../../lib/Slices/tutorialSlice";
import ModalComponent from "../../../Components/ModalComponent/ModalComponent";

const modalData = [
  {
    title: "Efficient Washing Cycle",
    description:
      "Use washing machines with efficient washing cycles that use less water and energy. Opt for shorter cycles when possible to conserve water and reduce the strain on groundwater resources.",
    images: [
      <FontAwesomeIcon icon={faClock} className="text-blue-500 w-12 h-12" />,
    ],
  },
  {
    title: "Greywater Recycling",
    description:
      "Implement a greywater recycling system to reuse water from washing machines for non-potable purposes such as irrigation and toilet flushing, reducing the demand on freshwater and groundwater.",
    images: [
      <FontAwesomeIcon icon={faRecycle} className="text-green-500 w-12 h-12" />,
    ],
  },
  {
    title: "Cold Water Wash",
    description:
      "Use cold water for laundry whenever possible. Cold water washing saves energy and reduces the overall environmental impact, conserving both water and energy.",
    images: [
      <FontAwesomeIcon
        icon={faSnowflake}
        className="text-blue-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Load Optimization",
    description:
      "Ensure the washing machine is fully loaded before running a cycle. This reduces the number of cycles needed, saving water and energy.",
    images: [
      <FontAwesomeIcon
        icon={faTachometerAlt}
        className="text-yellow-500 w-12 h-12"
      />,
    ],
  },
  {
    title: "Eco-Friendly Detergent",
    description:
      "Use eco-friendly detergents that are biodegradable and less harmful to the environment. This helps reduce the contamination of water sources, including groundwater.",
    images: [
      <FontAwesomeIcon icon={faLeaf} className="text-green-500 w-12 h-12" />,
    ],
  },
];

const Cleaningarea = () => {
  const { modalOpen, cleaningAreaLevel } = useSelector(
    (state) => state.tutorial
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Cleaning Area Level! Let's explore sustainable farming practices to conserve groundwater.",
      placement: "center",
    },
    {
      target: ".joyride-step-2",
      content:
        "Here are your tasks. Complete them to learn more about smart water management and achieve your goals in the game.",
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
      dispatch(setIntroTrue("cleaningAreaLevel"));
      dispatch(setModalOpen());
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${CleaningAreaLevel})` }}
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
        callback={handleJoyrideCallback}
        run={!cleaningAreaLevel}
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
            Cleaning Area Level
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
                Efficient Washing Cycle
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Optimize your washing machine usage by selecting the most
                efficient cycle that uses less water while still cleaning
                clothes effectively
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/60  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Greywater Recycling
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Implement a greywater recycling system that reuses water from
                your washing machine for other household tasks like flushing
                toilets or watering plants
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/60 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=home&level=kitchen&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Cold Water Wash
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Encourage the use of cold water for washing clothes. Cold water
                washes not only save energy but also help conserve groundwater
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cleaningarea;
