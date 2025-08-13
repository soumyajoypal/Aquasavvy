import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { clearError, registerUser } from "../../lib/Slices/userSlice.jsx";
import background from "../../assets/BackGround/registerpagebackground.png";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { status, error, otpVerification } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (otpVerification === false) {
      navigate("/verify-otp", {
        state: { email: form.email, username: form.username },
      });
    }
  }, [otpVerification, navigate, form.email, form.username]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <section
      className="flex flex-col justify-center items-center p-6 bg-green-900 min-h-screen bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 h-full bg-black/70 z-10"></div>
      <h1 className="inconsolata text-5xl font-bold mb-6 text-center text-white z-20">
        Register
      </h1>
      <form
        className="z-20 flex flex-col w-full max-w-md bg-slate-900 p-12 shadow-lg rounded-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4 mb-4">
          {["name", "username", "email", "password"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="inconsolata text-base tracking-widest font-medium text-gray-300 capitalize"
              >
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "password"
                    ? "password"
                    : "text"
                }
                name={field}
                id={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 tracking-wide border border-gray-600 bg-slate-700 inconsolata text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-white sm:text-sm"
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="inconsolata tracking-widest py-2 px-4 bg-teal-700 text-white font-semibold rounded-2xl shadow-md hover:bg-teal-800 hover:scale-105 transition-transform transform"
        >
          Register
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center w-full max-w-md z-20 inconsolata">
        <div className="flex justify-between w-full">
          <h4 className="text-sm font-medium text-white">
            <Link to="/login" className="hover:underline text-lg">
              <FontAwesomeIcon
                icon={faArrowCircleLeft}
                className="pr-2"
              ></FontAwesomeIcon>
              Back to Login
            </Link>
          </h4>
          <button
            onClick={() => navigate("/")}
            className="text-blue-300 hover:text-blue-500 font-extrabold text-lg"
          >
            Go back
          </button>
        </div>
        {status === "loading" && (
          <span className="text-blue-400">Loading...</span>
        )}
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    </section>
  );
};

export default RegisterPage;
