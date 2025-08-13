import React, { useState, useEffect } from "react";
import GuideIntroduction from "../../Components/TutorialComponents/GuideIntroduction/GuideIntroduction";
import WelcomeScreen from "../../Components/TutorialComponents/Welcome Screen/WelcomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { prevStep } from "../../lib/Slices/tutorialSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

const TutorialPage = () => {
  const { currentStep, isTutorialComplete } = useSelector(
    (state) => state.tutorial
  );
  const dispatch = useDispatch();
  return (
    <section className={`relative flex justify-center items-center h-screen ${
      currentStep === 2
        ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800"
        : "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800"
    } overflow-hidden`}>
      {currentStep > 0 && (
        <button
          onClick={() => {
            if (!isTutorialComplete) {
              dispatch(prevStep());
            }
          }}
          className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
        >
          <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
        </button>
      )}
      {currentStep === 0 && <WelcomeScreen></WelcomeScreen>}
      {currentStep === 1 && <GuideIntroduction></GuideIntroduction>}
      {currentStep === 2 && <Navigate to="/gameElements"></Navigate>}
    </section>
  );
};

export default TutorialPage;
