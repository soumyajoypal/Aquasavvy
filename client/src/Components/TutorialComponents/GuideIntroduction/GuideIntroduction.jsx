import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
import Joyride, { STATUS } from "react-joyride";
import aqua from "../../../assets/aqua/aqua.png"
import "./GuideIntoduction.css"


const GuideIntroduction = () => {
  const dispatch = useDispatch();
  const [run, setRun] = useState(true);
  const steps = [
    {
      target: ".aqua-animation",
      content: "Hi there, I am Aqua your personal guide",
      disableBeacon: true,
      placement: "left",
      spotlightPadding: 10,
    },
    {
      target: ".continue-button",
      content: "Click here to continue to the next step!",
      placement: "right",
    },
  ];

  const handleJoyride = (data) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };
  return (
    <div className="relative flex flex-col items-center">
      <h1 className="text-white text-4xl liu-jian mb-8">Let's introduce you to your Guide</h1>
      <div className="bg-transparent aqua-animation rounded-[20px]">
        <img src={aqua} alt="aqua" className=" animate-scaleUp" />
      </div>

      <Joyride
        steps={steps}
        run={run}
        continuous
        callback={handleJoyride}
        disableOverlayClose
        locale={{
          back: "Previous", // Custom text for the Back button
          last: "Finish", // Custom text for the Last button (usually the Finish button)
          next: "Next", // Custom text for the Next button
          skip: "Skip", // Custom text for the Skip button
        }}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#34d399", // Tailwind green-400
            backgroundColor: "#ffffff",
            textColor: "#333333",
          },
          buttonNext: {
            backgroundColor: "rgb(4 120 87)", // Tailwind green-500
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
            backgroundColor: "rgb(101 163 13)", // Tailwind gray-50
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
            fontSize: "18px",
            fontFamily: "Inconsolata, sans-serif",
            fontWeight: "600",
            color:"black"
          },
          spotlight: {
            borderRadius: "20px", // Increase this value to make the spotlight's border radius bigger
          },
        }}
      ></Joyride>
      <button
        onClick={() => {
          if (!run) {
            dispatch(nextStep());
          }
        }}
        className="continue-button montserrat mt-8 px-6 py-3 text-white font-semibold rounded-md bg-gradient-to-b from-teal-400 to-teal-600 hover:from-teal-600 hover:to-teal-800 hover:scale-110 transition-all duration-300 shadow-lg"
        style={{ borderRadius: "20px" }}
      >
        Continue
      </button>
    </div>
  );
};

export default GuideIntroduction;
