import React from "react";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../lib/Slices/tutorialSlice";
import background from "../../../assets/BackGround/registerpagebackground.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center w-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/start")}
        className="absolute top-5 left-5 z-50 w-12 h-12 flex items-center justify-center rounded-full 
        bg-white/90 shadow-md hover:shadow-xl cursor-pointer transition-all duration-200 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-emerald-600 text-lg"
        />
      </motion.button>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl py-16 px-12 rounded-2xl bg-black/70 backdrop-blur-md 
        shadow-[0_8px_30px_rgb(0,0,0,0.6)]"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="audiowide text-6xl text-emerald-400 drop-shadow-lg mb-6 tracking-wide"
        >
          AquaSavvy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inconsolata font-medium text-lg text-gray-200 leading-relaxed"
        >
          Welcome to{" "}
          <span className="font-semibold text-emerald-300">AquaSavvy!</span>{" "}
          <br />
          Learn how to conserve groundwater and make a difference. 🌊
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(nextStep())}
          className="montserrat mt-10 px-8 py-3 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700
          text-white font-semibold text-lg rounded-xl shadow-lg 
          hover:from-green-400 hover:to-emerald-800 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Next
          <FontAwesomeIcon icon={faArrowAltCircleRight} className="text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
