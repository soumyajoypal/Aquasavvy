import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faWater,
  faPuzzlePiece,
  faLightbulb,
  faCoins,
  faStar,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import logo from "../../assets/WebsiteLogo/logo2.png";
import badge from "../../assets/Icons/badge.png";
import certificate from "../../assets/IntroPageAssets/CertificateSample.png";
import { useSelector } from "react-redux";
import "./HomePage.css";

const videoLinks = [
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658888/bgfvjzpklnz6cq1lv4pg.mp4",
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724659068/rpcvt0eejq8plxdayqi1.mp4",
  "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658770/jgmecb0bdmaz0hpe43lw.mp4",
];

const HomePage = () => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const { user } = useSelector((state) => state.user);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentVideoIndex(
          (prevIndex) => (prevIndex + 1) % videoLinks.length
        );
        setFade(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gray-800 text-white overflow-hidden">
        {/* Logo */}
        <motion.div
          className="website-logo h-64 w-40 absolute -top-4 -left-4 z-20"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logo} alt="website-logo" className="rounded-full" />
        </motion.div>

        {/* Top Right Buttons */}
        <motion.div
          className="absolute top-4 right-4 z-20 gap-4 flex"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            className="montserrat text-white text-md bg-gradient-to-r from-blue-800 to-blue-600 py-2 px-4 rounded-2xl shadow hover:scale-105 transition-all"
            onClick={() => (user ? navigate("/profile") : navigate("/login"))}
          >
            {user ? `Profile` : `Login`}
          </button>
          <button
            className="montserrat text-white text-md border-white border-2 p-2 rounded-2xl transition-all hover:bg-gradient-to-b hover:from-teal-600 hover:to-cyan-600 hover:border-transparent hover:scale-105"
            onClick={() => navigate("/leaderboard")}
          >
            View Leaderboard
            <FontAwesomeIcon icon={faClipboard} className="text-xl ml-2" />
          </button>
        </motion.div>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background Video */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          src={videoLinks[currentVideoIndex]}
          type="video/mp4"
          autoPlay
          muted
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-20 text-center px-4 md:px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="heading text-4xl md:text-6xl font-bold leading-tight"
            whileHover={{ scale: 1.05 }}
          >
            AquaSavvy
          </motion.h1>
          <p className="normal-text mt-4 text-lg md:text-2xl">
            Learn, Play, and Conserve Groundwater through Fun!
          </p>
          <motion.div
            className="mt-8 flex justify-center flex-wrap gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/start">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-400 text-white text-lg font-bold rounded shadow hover:from-cyan-400 hover:to-sky-700 transition-all"
              >
                Play Now
              </motion.button>
            </Link>
            <motion.button
              onClick={() =>
                document
                  .getElementById("about-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-950 to-sky-600 text-white text-lg font-bold rounded shadow hover:from-sky-600 hover:to-sky-700 transition-all flex items-center"
            >
              Know More
              <FontAwesomeIcon icon={faArrowCircleDown} className="ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about-section"
        className="py-16 px-4 text-center relative bg-gradient-to-r from-black via-slate-900 to-slate-700"
      >
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading text-4xl font-extrabold text-white mb-6">
            Discover AquaSavvy's Unique Gameplay
          </h2>
          <p className="normal-text text-gray-300 leading-relaxed max-w-2xl mx-auto text-lg">
            AquaSavvy isn’t just a game—it's a strategy experience where every
            move you make impacts the environment. Conserve groundwater as you
            navigate through levels, each designed to challenge your decisions.
          </p>
        </motion.div>

        {/* Icons */}
        <motion.div
          className="relative z-10 mt-8 flex justify-center space-x-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {[
            { icon: faWater, label: "Water Sources", color: "bg-green-500" },
            { icon: faPuzzlePiece, label: "Challenges", color: "bg-blue-500" },
            {
              icon: faLightbulb,
              label: "Strategic Moves",
              color: "bg-red-500",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div
                className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <FontAwesomeIcon className="text-lg" icon={item.icon} />
              </div>
              <p className="text-gray-300 normal-text">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 text-center bg-gradient-to-r from-black via-slate-900 to-slate-700">
        <h2 className="text-3xl font-semibold mb-8 heading">Features</h2>
        <div className="container mx-auto w-[72rem] grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
          {[
            {
              title: "Collect Coins",
              icon: faCoins,
              text: "Earn coins by fixing leaks, planting trees, and sustainable farming.",
            },
            {
              title: "Earn Scores",
              icon: faStar,
              text: "Track your progress. More conservation = higher score.",
            },
            {
              title: "Leaderboard",
              icon: faClipboard,
              text: "Compete worldwide! Check the leaderboard for your rank.",
              link: "/leaderboard",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative p-6 bg-gray-700 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 to-cyan-400 blur-md opacity-50"></div>
              <h3 className="relative text-xl mb-4 heading z-20 flex justify-center">
                {feature.title}
                <FontAwesomeIcon icon={feature.icon} className="pl-2" />
              </h3>
              <p className="relative text-white text-base normal-text z-10">
                {feature.text}
              </p>
              {feature.link && (
                <Link
                  to={feature.link}
                  className="relative text-white hover:underline mt-4 block z-20"
                >
                  View Leaderboard
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-black via-slate-900 to-slate-700">
        <motion.h2
          className="text-3xl font-semibold mb-6 heading flex justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Earn Awards and Certificates
          <img src={badge} alt="badge" className="h-[3rem] w-[4rem] pl-2" />
        </motion.h2>
        <motion.p
          className="text-gray-400 normal-text leading-relaxed max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Showcase your achievements with awards and certificates as you
          progress!
        </motion.p>
        <motion.img
          src={certificate}
          alt="Awards"
          className="mx-auto rounded shadow w-[600px] h-[400px]"
          whileHover={{ scale: 1.05 }}
        />
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-slate-800 to-slate-600 text-gray-400 py-6 normal-text">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AquaSavvy. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
