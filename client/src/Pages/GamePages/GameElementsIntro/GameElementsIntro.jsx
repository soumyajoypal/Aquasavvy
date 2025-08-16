import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import aqua from "../../../assets/aqua/aqua.png";
import Joyride, { STATUS } from "react-joyride";
import {
  nextStep,
  setTutorialActive,
  setTutorialDeactive,
} from "../../../lib/Slices/tutorialSlice";
import farm from "../../../assets/IntroPageAssets/farm.png";
import home from "../../../assets/IntroPageAssets/home.png";
import industry from "../../../assets/IntroPageAssets/industry.png";
import "./GameElementsInto.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";

const ElementMap = [
  { name: "Farm", imgSrc: farm },
  { name: "Home", imgSrc: home },
  { name: "Industry", imgSrc: industry },
];

const GameElementsIntro = () => {
  const dispatch = useDispatch();
  const {
    tutorial: { active },
    currentStep,
  } = useSelector((state) => state.tutorial);

  const elements = useSelector((state) => state.progress.elements);

  const [tutorialStep, setTutorialStep] = useState(active ? 0 : null);
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
    if (index === steps.length - 1) {
      setTutorialStep(0);
    } else {
      setTutorialStep(index);
    }
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      dispatch(nextStep());
    }
  };

  return (
    <section className="min-h-screen w-full relative ">
      <Joyride
        steps={steps}
        run={active}
        continuous
        showProgress={false}
        showSkipButton
        callback={handleJoyride}
        spotlightPadding={10}
        disableOverlayClose
        locale={{
          back: "◀ Previous",
          last: "🎉 Finish",
          next: "Next ▶",
          skip: "✖ Skip",
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399", // emerald green
            backgroundColor: "#ffffff",
            textColor: "#1f2937", // gray-800
            borderRadius: 12,
            arrowColor: "#ffffff",
            overlayColor: "rgba(0, 0, 0, 0.55)",
            width: 320,
          },
          buttonNext: {
            background: "linear-gradient(90deg, #34d399, #059669)", // emerald → green
            color: "#ffffff",
            borderRadius: 10,
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "15px",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            transition: "all 0.25s ease",
          },
          buttonBack: {
            backgroundColor: "#f1f5f9", // gray-100
            color: "#374151", // gray-700
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: "14px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "500",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.25s ease",
          },
          buttonSkip: {
            backgroundColor: "transparent",
            color: "#ef4444", // red-500
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            textDecoration: "underline",
            cursor: "pointer",
          },
          tooltip: {
            borderRadius: 14,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            padding: "18px",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            lineHeight: "1.6",
            background: "linear-gradient(145deg, #ffffff, #f9fafb)", // subtle gradient
            color: "#111827",
          },
          tooltipContent: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
          spotlight: {
            borderRadius: "12px",
            boxShadow: "0 0 0 4px rgba(52, 211, 153, 0.5)", // emerald glow
          },
        }}
      />

      <button
        onClick={() => {
          navigate("/");
          if (active) {
            dispatch(setTutorialDeactive());
          }
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <p className="absolute top-0 left-1/2 -translate-x-1/2 elements-container"></p>
      <div className="absolute inset-0 grid grid-cols-3 w-[98%] h-[98%] overflow-hidden m-auto ">
        {ElementMap.map((item, index) => {
          const { name, imgSrc } = item;

          const progress = elements.find(
            (el) => el.name === name.toLowerCase()
          );
          const unlocked = progress?.unlocked;

          const isFarm = name.toLowerCase() === "farm";
          const isActiveTutorialFarm = active && currentStep === 4 && isFarm;

          return (
            <div
              key={index}
              className={`relative group flex flex-col items-center justify-center m-2 rounded-lg transition-transform duration-300
        ${
          (!active && unlocked) || isFarm
            ? "cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-green-400/30"
            : "cursor-not-allowed"
        }
        ${
          isActiveTutorialFarm ? "shadow-lg shadow-green-400 animate-pulse" : ""
        }
        bg-white/10 backdrop-blur-md border border-white/10 ${name.toLowerCase()}`}
              onClick={() => {
                if ((!active && unlocked) || (active && isFarm)) {
                  navigate(`/element/${name.toLowerCase()}`);
                }
              }}
            >
              {/* Lock Icon */}
              <span className="absolute top-4 right-4 text-3xl font-bold text-white z-20">
                {active || (!active && unlocked) ? (
                  <FontAwesomeIcon
                    icon={faLockOpen}
                    className="text-yellow-400 drop-shadow-[0_0_5px_rgba(255,255,0,0.6)]"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-yellow-400 drop-shadow-[0_0_5px_rgba(255,255,0,0.6)]"
                  />
                )}
              </span>

              {/* Locked overlay effect */}
              {!active && !unlocked && !isFarm && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 rounded-lg z-10 backdrop-blur-[2px] flex items-center justify-center"></div>
              )}

              {/* Image */}
              <img
                src={imgSrc}
                alt={`${name} Image`}
                className={`object-contain w-96 h-96 mb-4 transition-all duration-300 ${
                  !unlocked && !isFarm ? "opacity-40 blur-[1px]" : "opacity-100"
                }`}
              />

              {/* Name label */}
              <h1
                className={`font-bold text-white text-5xl transition-opacity duration-300 liu-jian ${
                  tutorialStep === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {name}
              </h1>

              {/* Tutorial dark overlay (only for locked during tutorial) */}
              {active && currentStep === 4 && !isFarm && (
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
