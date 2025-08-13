import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import aqua from "../../../assets/aqua/aqua.png";
import Joyride, { STATUS } from "react-joyride";
import {
  nextStep,
  setIntroTrue,
  setSelectedElement,
} from "../../../lib/Slices/tutorialSlice";
import farm from "../../../assets/IntroPageAssets/farm.png";
import home from "../../../assets/IntroPageAssets/home.png";
import industry from "../../../assets/IntroPageAssets/industry.png";
import "./GameElementsInto.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ElementMap = [
  { name: "Farm", imgSrc: farm },
  { name: "Home", imgSrc: home },
  { name: "Industry", imgSrc: industry },
];

const GameElementsIntro = () => {
  const dispatch = useDispatch();
  const { gameElementsIntro, isTutorialComplete } = useSelector(
    (state) => state.tutorial
  );
  const [currentStep, setCurrentStep] = useState(!gameElementsIntro ? 0 : null);
  const navigate = useNavigate();

  const steps = [
    {
      target: `.farm`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is the Farm! Farms use a significant amount of groundwater.
              Let's explore how we can conserve water here.
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),
      disableBeacon: true,
      placement: "right",
    },
    {
      target: `.home`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is your Home! Every drop of water counts here. Let's discover
              ways to conserve water in our daily lives.
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: `.industry`,
      content: (
        <>
          <div className="flex flex-wrap items-center justify-center">
            <p className="inconsolata">
              This is the Industry! Water is essential for production. Let's
              find innovative methods to save water in industrial processes.
            </p>
            <div>
              <img src={aqua} alt="aqua" className="w-28 h-28" />
            </div>
          </div>
        </>
      ),
      placement: "left",
    },
    {
      target: ".farm",
      content: (
        <div className="flex flex-wrap items-center justify-center text-center">
          <p className="inconsolata text-lg font-medium mb-2">
            Let’s start by selecting the farm!
          </p>
          <img src={aqua} alt="aqua" className="w-28 h-28" />
        </div>
      ),
      placement: "center",
      disableOverlayClose: true,
      disableCloseOnEsc: true,
      spotlightPadding: 10,
    },
  ];

  const handleJoyride = (data) => {
    const { status, index } = data;
    if (currentStep === 3) {
      setCurrentStep(0);
    } else {
      setCurrentStep(index);
    }
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      dispatch(setIntroTrue("gameElementsIntro"));
    }
  };

  return (
    <section className="min-h-screen w-full relative ">
      <Joyride
        steps={steps}
        run={!gameElementsIntro}
        continuous
        showProgress={false}
        showSkipButton
        callback={handleJoyride}
        spotlightPadding={10}
        disableOverlayClose
        locale={{
          back: "Previous",
          last: "Finish",
          next: "Next",
          skip: "Skip",
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399",
            backgroundColor: "#ffffff",
            textColor: "#333333",
            borderRadius: 8,
            arrowColor: "#ffffff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
          },
          buttonNext: {
            backgroundColor: "rgb(4 120 87)",
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonBack: {
            backgroundColor: "rgb(101 163 13)",
            color: "#ffffff",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          buttonSkip: {
            backgroundColor: "#edf2f7",
            color: "#2d3748",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "400",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          },
          tooltip: {
            borderRadius: 12,
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            padding: "15px",
            fontSize: "18px",
            fontFamily: "Inconsolata, sans-serif",
            fontWeight: "600",
            color: "black",
          },
          tooltipContent: {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <p className="absolute top-0 left-1/2 -translate-x-1/2 elements-container"></p>
      <div className="absolute inset-0 grid grid-cols-3 w-[98%] h-[98%] overflow-hidden m-auto ">
        {ElementMap.map((item, index) => {
          const { name, imgSrc } = item;
          return (
            <div
              key={index}
              className={`relative group flex flex-col items-center justify-center m-2 rounded-lg transition-transform duration-300
    ${
      isTutorialComplete || name.toLowerCase() === "farm"
        ? "cursor-pointer hover:scale-105"
        : "cursor-not-allowed"
    }
    ${
      !isTutorialComplete && gameElementsIntro && name.toLowerCase() === "farm"
        ? "shadow-lg shadow-green-400 animate-pulse"
        : ""
    }
    bg-white/10 ${name.toLowerCase()}`}
              onClick={() => {
                if (
                  isTutorialComplete ||
                  (!isTutorialComplete && item.name.toLowerCase() === "farm")
                ) {
                  navigate(`/element/${item.name.toLowerCase()}`);
                }
              }}
            >
              <img
                src={imgSrc}
                alt={`${name} Image`}
                className={`object-contain w-96 h-96 mb-4 `}
              />
              <h1
                className={`font-bold text-white text-5xl transition-opacity duration-300 liu-jian ${
                  currentStep === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {name}
              </h1>
              {!isTutorialComplete &&
                gameElementsIntro &&
                name.toLowerCase() !== "farm" && (
                  <div className="absolute inset-0 bg-black/80 rounded-lg z-20"></div>
                )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GameElementsIntro;
