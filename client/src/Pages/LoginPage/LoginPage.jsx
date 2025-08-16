import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearError, loginUser } from "../../lib/Slices/userSlice";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchTutorialProgress } from "../../lib/Slices/tutorialSlice";
import { fetchUserProgress } from "../../lib/Slices/userProgressSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const { error } = useSelector((state) => state.user);
  const location = useLocation();
  const path = location.state?.path || "/";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const resultAction = await dispatch(loginUser(form)); // <-- await here

    if (loginUser.fulfilled.match(resultAction)) {
      dispatch(fetchTutorialProgress());
      navigate(path, { replace: true });
    }
  };
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const videoLinks = [
    "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658888/bgfvjzpklnz6cq1lv4pg.mp4",
    "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724659068/rpcvt0eejq8plxdayqi1.mp4",
    "https://res.cloudinary.com/dzjbxojvu/video/upload/v1724658770/jgmecb0bdmaz0hpe43lw.mp4",
  ];

  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [fade, setFade] = useState(false);

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
    <div className=" min-h-screen relative">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[50px] h-[50px] rounded-full bg-white cursor-pointer absolute top-5 left-5 z-50 hover:scale-110 transition-all duration-100 ease-in-out"
      >
        <FontAwesomeIcon icon={faArrowLeft} className=""></FontAwesomeIcon>
      </button>

      <div className="absolute bg-black opacity-50 left-0 top-0 size-full z-[-1] bg-cover bg-center">
        <video
          ref={videoRef}
          className={`object-cover size-full z-[-1] transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          src={videoLinks[currentVideoIndex]}
          type="video/mp4"
          autoPlay
          muted
        />
      </div>

      <div className="flex items-center justify-center min-h-screen z-10 w-full p-4">
        <div className="z-20 flex flex-col w-full max-w-md bg-slate-900 p-12 shadow-lg rounded-lg space-y-4">
          <h1 className="inconsolata text-2xl font-bold mb-6 text-center text-white">
            Login to AquaSavvy
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="inconsolata text-base tracking-widest font-medium text-gray-300 capitalize"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={form.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 tracking-wide border border-gray-600 bg-slate-700 inconsolata text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-white sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="inconsolata text-base tracking-widest font-medium text-gray-300 capitalize"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 tracking-wide border border-gray-600 bg-slate-700 inconsolata text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-white sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="inconsolata tracking-widest w-full py-2 px-4 bg-teal-700 text-white font-semibold rounded-2xl shadow-md hover:bg-teal-800 hover:scale-105 transition-transform transform"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-400">New to AquaSavvy?</span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-2 text-blue-400 hover:text-blue-500 font-medium"
            >
              Create Account
            </button>
          </div>
          {error && (
            <div className="mt-4 text-red-500 text-center">
              <span>{error.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
