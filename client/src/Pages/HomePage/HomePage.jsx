import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import logo from "../../assets/WebsiteLogo/logo2.png";
import badge from "../../assets/Icons/badge.png";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import certificate from "../../assets/IntroPageAssets/CertificateSample.png";
import { useSelector } from "react-redux";

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
      <section className="relative flex items-center justify-center min-h-screen bg-gray-800 text-white">
        <div className="website-logo h-64 w-40  absolute -top-4 -left-4 z-20">
          <img src={logo} alt="website-logo" className="rounded-full" />
        </div>
        <div className="absolute top-4 right-4 z-20 gap-4 flex">
          <button
            className="montserrat text-white text-md bg-gradient-to-r from-blue-800 to-blue-600 py-2 px-4 rounded-2xl overflow-hidden transition-all duration-150 hover:from-blue-800 hover:to-blue-950 hover:scale-105"
            onClick={() => {
              if (user) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
          >
            {user ? `Profile` : `Login`}
          </button>
          <button
            className="montserrat text-white text-md border-white border-2 p-2 rounded-2xl overflow-hidden transition-all duration-150 hover:bg-gradient-to-b hover:from-teal-600 hover:to-cyan-600 hover:text-white hover:border-transparent hover:scale-105"
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            View Leaderboard
            <FontAwesomeIcon icon={faClipboard} className="text-xl ml-2" />
          </button>
        </div>
        <div className="absolute inset-0 bg-black/70 z-10"></div>
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

        <div className="relative z-20 text-center px-4 md:px-8">
          <h1 className="heading text-4xl md:text-6xl font-bold leading-tight">
            AquaSavvy
          </h1>
          <p className="normal-text mt-4 text-lg md:text-2xl">
            Learn, Play, and Conserve Groundwater through Fun!
          </p>
          <Link to="/start">
            <button className="mt-8 mx-4 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-400 text-white text-lg normal-text font-bold rounded shadow hover:from-cyan-400 hover:to-sky-700 transition-all transform hover:scale-105">
              Play Now
            </button>
          </Link>
          <button
            onClick={() => {
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 mx-4 px-6 py-3 bg-gradient-to-r from-blue-950 to-sky-600 text-white text-lg normal-text font-bold rounded shadow hover:from-sky-600 hover:to-sky-700 transition-all transform hover:scale-105"
          >
            Know More
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              className="ml-2"
            ></FontAwesomeIcon>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about-section"
        className="py-16  px-4 text-center relative bg-gradient-to-r from-black via-slate-900 to-slate-700"
      >
        {/* Animated Background */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-sky-950 via-blue-800 to-indigo-950 opacity-75 rounded-lg shadow-lg"></div> */}
        <div className="relative z-10">
          <h2 className="heading text-4xl font-extrabold text-white mb-6">
            Discover AquaSavvy's Unique Gameplay
          </h2>
          <p className="normal-text text-gray-300 leading-relaxed max-w-2xl mx-auto text-lg">
            AquaSavvy isn’t just a game—it's a strategy experience where every
            move you make impacts the environment. Conserve groundwater as you
            navigate through various levels, each designed to challenge your
            decision-making skills. Protect your virtual world from droughts by
            implementing real-world water-saving techniques. The choices you
            make can either sustain the ecosystem or lead to a water crisis. Are
            you ready to be a water hero?
          </p>
        </div>
        {/* Icons for Visual Enhancement */}
        <div className="relative z-10 mt-8 flex justify-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FontAwesomeIcon
                className="text-lg"
                icon={faWater}
              ></FontAwesomeIcon>
            </div>
            <p className="text-gray-300 normal-text">Water Sources</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FontAwesomeIcon
                className="text-lg"
                icon={faPuzzlePiece}
              ></FontAwesomeIcon>
            </div>
            <p className="text-gray-300 normal-text">Challenges</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FontAwesomeIcon
                className="text-lg"
                icon={faLightbulb}
              ></FontAwesomeIcon>
            </div>
            <p className="text-gray-300 normal-text">Strategic Moves</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 text-center bg-gradient-to-r from-black via-slate-900 to-slate-700">
        <h2 className="text-3xl font-semibold mb-8 heading">Features</h2>
        <div className="container mx-auto w-[72rem] grid grid-cols-1 md:grid-cols-3 gap-20 text-center">
          {/* Collect Coins Feature */}
          <div className="relative p-6 bg-gray-700 rounded-lg shadow-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 to-cyan-400 blur-md opacity-50"></div>
            <h3 className="relative text-xl mb-4 heading z-20 flex justify-center">
              Collect Coins
              <FontAwesomeIcon
                icon={faCoins}
                className="pl-2"
              ></FontAwesomeIcon>
            </h3>
            <p className="relative text-white text-base normal-text z-10">
              Earn coins by performing tasks such as fixing water leaks,
              planting trees, and implementing sustainable farming methods. Each
              coin represents a positive impact on groundwater conservation.
            </p>
          </div>

          {/* Earn Scores Feature */}
          <div className="relative p-6 bg-gray-700 rounded-lg shadow-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 to-cyan-400 blur-md opacity-50"></div>
            <h3 className="relative text-xl  mb-4 heading z-20">
              Earn Scores
              <FontAwesomeIcon icon={faStar} className="pl-2"></FontAwesomeIcon>
            </h3>
            <p className="relative text-white text-base normal-text z-10">
              Track your progress with a dynamic scoring system. The more
              conservation tasks you complete, the higher your score and the
              healthier the virtual environment becomes.
            </p>
          </div>

          {/* Leaderboard Feature */}
          <div className="relative p-6 bg-gray-700 rounded-lg shadow-lg">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 to-cyan-400 blur-md opacity-50"></div>
            <h3 className="relative text-xl  mb-4 heading z-20">
              Leaderboard
              <FontAwesomeIcon
                icon={faClipboard}
                className="pl-2"
              ></FontAwesomeIcon>
            </h3>
            <p className="relative text-white text-base normal-text z-10">
              Compete with players worldwide! Check out the leaderboard to see
              how your conservation efforts stack up against others.
            </p>
            <Link
              to="/leaderboard"
              className="relative text-white text-base normal-text hover:underline mt-4 block z-20"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Awards and Certificates Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-black via-slate-900 to-slate-700">
        <h2 className="text-3xl font-semibold mb-6 heading flex justify-center items-center">
          Earn Awards and Certificates
          <img src={badge} alt="badge" className="h-[3rem] w-[4rem] pl-2" />
        </h2>
        <p className="text-gray-400 normal-text leading-relaxed max-w-2xl mx-auto mb-8">
          Showcase your achievements with awards and certificates. As you
          progress, you'll unlock recognition for your groundwater conservation
          skills, motivating you to continue making a difference.
        </p>
        <img
          src={certificate}
          alt="Awards"
          className="mx-auto rounded shadow w-[600px] h-[400px]"
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
