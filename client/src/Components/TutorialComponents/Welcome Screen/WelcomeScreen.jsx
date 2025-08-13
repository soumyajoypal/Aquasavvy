import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
import "./WelcomeScreen.css";
import background from "../../../assets/BackGround/registerpagebackground.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover w-screen"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <button
        onClick={() => {
          navigate("/start");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <div className="text-center py-32 px-32 rounded-lg bg-black/70 transition-all ease-in animate-scaleUpBlur delay-700 duration-300">
        <h1 className="audiowide text-6xl text-white mb-4 ">
          AquaSavvy
        </h1>
        <p className="inconsolata font-medium text-xl text-gray-200">
          Welcome to AquaSavvy!<br /> Learn how to conserve groundwater and make a
          difference.
        </p>
        <button
          onClick={() => {
            dispatch(nextStep());
          }}
          className="montserrat mt-8 px-6 py-3 bg-gradient-to-b from-emerald-600 to-green-400 text-white font-semibold rounded-md hover:from-green-400 hover:to-emerald-800  transition-all hover:scale-110 duration-300 shadow-lg"
        >
          Next<FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-2"></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
