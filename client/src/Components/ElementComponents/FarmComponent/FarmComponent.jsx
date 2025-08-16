import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import FarmElement from "../../../assets/Elements/FarmElement.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  prevStep,
  setCurrentStep,
  setIntroTrue,
} from "../../../lib/Slices/tutorialSlice";
import aqua from "../../../assets/aqua/aqua.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowLeft,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const FarmComponent = () => {
  const {
    currentStep,
    tutorial: { active },
  } = useSelector((state) => state.tutorial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const steps = [
    {
      target: ".farm-heading",
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              Welcome to the Farm section! This is where you'll manage your farm
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),
      disableBeacon: true,
      placement: "bottom",
    },
    {
      target: ".farm-image",
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              Here's a visual representation of your farm. Hover over it to
              interact
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),

      placement: "bottom",
    },
    {
      target: ".crop-marker",
      content:
        "This is the Crop Level. Click here to start learning about crops.",
      placement: "top",
    },
    {
      target: ".irrigation-marker",
      content: "This is the Irrigation Level. Keep your farm hydrated!",
      placement: "top",
    },
    {
      target: ".pesticide-marker",
      content: "This is the Pesticide Level. Protect your crops from pests.",
      placement: "top",
    },
    {
      target: ".crop-marker",
      content: "Lets go to the crop level ",
      placement: "top",
    },
  ];

  const { elements } = useSelector((state) => state.progress);
  const farmElement = elements.find((el) => el.name === "farm");
  const irrigationLevel = farmElement.levels.find(
    (el) => el.level === "irrigation"
  );
  const pesticideLevel = farmElement.levels.find(
    (el) => el.level === "pesticide"
  );

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      dispatch(setIntroTrue("farm"));
      dispatch(nextStep());
    }
  };

  return (
    <div
      className={`w-full h-[calc(100vh-64px)] bg-slate-800 flex flex-col items-center`}
    >
      <Joyride
        steps={steps}
        run={active && currentStep === 4}
        continuous
        showProgress
        showSkipButton
        hideCloseButton
        disableOverlayClose
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#059669", // emerald green
            zIndex: 10000,
            arrowColor: "#fff",
            backgroundColor: "#fff",
            textColor: "#111827",
            overlayColor: "rgba(0,0,0,0.5)",
          },
          tooltip: {
            borderRadius: "1rem",
            padding: "1rem 1.25rem",
            boxShadow:
              "0px 4px 12px rgba(0, 0, 0, 0.15), 0px 8px 20px rgba(0, 0, 0, 0.1)",
          },
          buttonNext: {
            backgroundColor: "#059669",
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
            fontWeight: "600",
            color: "white",
          },
          buttonBack: {
            backgroundColor: "#e5e7eb",
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
            fontWeight: "500",
            color: "#374151",
          },
          buttonSkip: {
            backgroundColor: "transparent",
            color: "#6b7280",
            fontSize: "0.875rem",
          },
        }}
        locale={{
          back: "← Back",
          close: "Got it",
          last: "Finish",
          next: "Next →",
          skip: "Skip Tutorial",
        }}
      />
      <button
        onClick={() => {
          if (active) {
            dispatch(setCurrentStep(2));
          }
          navigate("/gameElements");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <h1 className="font-bold text-4xl text-white farm-heading liu-jian mt-4">
        Farm
      </h1>
      <div className="relative bg-white/10 p-4 mt-8 rounded-3xl">
        {currentStep == 6 && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/60 z-20 pointer-events-auto animate-pulse"
            style={{
              clipPath: "circle(80px at 220px 240px)",
            }}
          />
        )}
        <div
          className="group farm-land crop-marker absolute w-[120px] h-[75px] bg-transparent bottom-[270px] left-[150px] cursor-pointer z-30"
          onClick={() => {
            navigate("/element/farm/level/crop-level");
          }}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-rose-600 text-4xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce group-hover:opacity-0 transition-opacity duration-300"
          />
          <div className="hidden inconsolata group-hover:block absolute top-[-80px] left-[50%] transform -translate-x-1/2 w-[200px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg">
            Click to enter the crop level!
          </div>
        </div>
        <div
          className={`${
            currentStep == 6 || !irrigationLevel.unlocked
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } group irrigation-land irrigation-marker absolute w-[150px] h-[110px] bg-transparent bottom-[150px] left-[280px]  z-30`}
          onClick={() => {
            if (!active && irrigationLevel.unlocked)
              navigate("/element/farm/level/irrigation-level");
          }}
        >
          <FontAwesomeIcon
            icon={irrigationLevel.unlocked ? faMapMarkerAlt : faLock}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl 
      ${
        irrigationLevel.unlocked
          ? "text-rose-600 animate-bounce"
          : "text-gray-500 opacity-70"
      } 
      transition-opacity duration-300
      ${active || !irrigationLevel.unlocked ? "" : "group-hover:opacity-0"}
    `}
          />

          {!active && (
            <div className="hidden inconsolata group-hover:block absolute top-[-80px] left-[50%] transform -translate-x-1/2 w-[220px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg">
              {irrigationLevel.unlocked
                ? "Click to enter the irrigation level!"
                : "🔒 Complete the Crop Level to unlock this!"}
            </div>
          )}
        </div>

        {/* ----------- Pesticide Level ----------- */}

        <div
          className={`
    group farm-land pesticide-marker absolute w-[120px] h-[85px] bottom-[220px] left-[470px] z-30
    ${
      currentStep == 6 || !pesticideLevel.unlocked
        ? "cursor-not-allowed"
        : "cursor-pointer"
    }
  `}
          onClick={() => {
            if (!active && pesticideLevel.unlocked)
              navigate("/element/farm/level/pesticide-level");
          }}
        >
          <FontAwesomeIcon
            icon={pesticideLevel.unlocked ? faMapMarkerAlt : faLock}
            className={`
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl
      ${
        pesticideLevel.unlocked
          ? "text-rose-600 animate-bounce"
          : "text-gray-500 opacity-70"
      }
      transition-opacity duration-300
      ${!active && pesticideLevel.unlocked ? "group-hover:opacity-0" : ""}
    `}
          />

          {!active && (
            <div
              className="hidden group-hover:block absolute top-[-80px] left-1/2 transform -translate-x-1/2
        w-[220px] z-30 bg-gray-800 text-white text-center p-4 rounded-lg shadow-lg inconsolata"
            >
              {pesticideLevel.unlocked
                ? "Click to enter the pesticide level!"
                : "🔒 Complete the Irrigation Level to unlock this"}
            </div>
          )}
        </div>
        <img
          src={FarmElement}
          alt=""
          className="w-[700px] h-[500px] farm-image"
        />
      </div>
    </div>
  );
};

export default FarmComponent;
