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
} from "@fortawesome/free-solid-svg-icons";
import taskicon1 from "../../../assets/Icons/pestcontrol.png";
import taskicon2 from "../../../assets/Icons/plantwithroot.png";
import taskicon3 from "../../../assets/Icons/watershield.png";
import Joyride from "react-joyride";
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
  const { modalOpen, pesticideLevel } = useSelector((state) => state.tutorial);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const steps = [
    {
      target: ".joyride-step-1",
      content:
        "Welcome to the Pesticide Level! Let's explore sustainable farming practices to conserve groundwater.",
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
      dispatch(setIntroTrue("pesticideLevel"));
      dispatch(setModalOpen());
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${pesticideLevelImage})` }}
      className={`w-full h-[calc(100vh-64px)]  bg-cover bg-no-repeat flex items-center justify-center`}
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
        run={!pesticideLevel}
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
            Pesticide Level
          </h1>
          <div className="flex justify-center space-x-6">
            {/* Task 1 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-1"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=farm&level=pesticide&type=quiz`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 1
              </h2>
              <p className="text-base text-white text-center montserrat">
                Integrated Pest Management
              </p>
              <img src={taskicon1} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                {" "}
                Implement Integrated Pest Management (IPM) practices that
                combine biological methods to control pests
              </p>
            </div>

            {/* Task 2 */}
            <div
              className="w-72 h-96 bg-black/50  text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-2"
              onClick={() => {
                navigate(
                  `/game/taskPage?element=farm&level=pesticide&type=choice`
                );
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 2
              </h2>
              <p className="text-base text-white text-center montserrat">
                Use of Biopesticides
              </p>
              <img src={taskicon2} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                Encourage the use of biopesticides derived from natural
                materials such as plants, bacteria, and minerals
              </p>
            </div>

            {/* Task 3 */}
            <div
              className="w-72 h-96 bg-black/50 text-white flex flex-col justify-center items-center gap-2 p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform joyride-step-3"
              onClick={() => {
                navigate(`/game/taskPage?element=farm&level=crop&type=quiz`);
              }}
            >
              <h2 className="text-xl font-bold mb-2 montserrat text-white">
                Task 3
              </h2>
              <p className="text-base text-white text-center montserrat">
                Buffer Zones Creation
              </p>
              <img src={taskicon3} alt="icon" className="w-12 h-12 m-2" />
              <p className="text-center inconsolata">
                {" "}
                Create buffer zones of vegetation between crop fields and water
                sources
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PesticideLevel;
