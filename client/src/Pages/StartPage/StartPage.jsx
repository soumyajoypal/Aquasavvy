import React from "react";
import { Link, useNavigate } from "react-router-dom";
import video from "../../assets/Video/StartPage.mp4";
import "./StartPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowLeft,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

const StartPage = () => {
  const navigate = useNavigate();
  const profileButton = () => {
    navigate("/profile");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={video}
        autoPlay
        loop
        muted
      ></video>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-8xl font-bold mb-4 audiowide animate-fadeIn">
          AquaSavvy
        </h1>
        <p className="text-lg md:text-2xl mb-8 montserrat font-light">
          Conserve Groundwater, Save the Future!
        </p>
        <div className="flex gap-5 justify-center">
          <Link to="/tutorial">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-300 hover:from-emerald-300 hover:to-teal-700 text-white text-2xl tracking-wider montserrat font-semibold rounded shadow-lg transform transition-all duration-300 hover:scale-110">
              Tutorial
            </button>
          </Link>
          <Link to="/tutorial">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-300 hover:from-emerald-300 hover:to-teal-700 text-white text-2xl tracking-wider montserrat font-semibold rounded shadow-lg transform transition-all duration-300 hover:scale-110">
              Start Game <FontAwesomeIcon icon={faPlayCircle}></FontAwesomeIcon>
            </button>
          </Link>
        </div>

        <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto inconsolata">
          AquaSavvy is an educational game that teaches you about groundwater
          conservation. Complete challenges, collect coins, and save the
          environment!
        </p>
      </div>

      <div className="absolute top-5 right-5">
        <button
          className="text-white montserrat text-md border-white border-2 p-2 rounded-2xl overflow-hidden transition-all duration-150 hover:bg-black/80  hover:text-white hover:scale-105"
          onClick={profileButton}
        >
          View Profile
          <FontAwesomeIcon icon={faUser} className="text-xl ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StartPage;
