import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearError, resendOtp, verifyOtp } from "../../lib/Slices/userSlice";
import "./OtpPage.css"

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(600000);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username } = location.state || {};
  const { error, otpVerification, otpExpiration } = useSelector(
    (state) => state.user
  );
  const inputRefs = useRef([]);

  useEffect(() => {
    if (otpExpiration) {
      const expirationTime = new Date(otpExpiration).getTime();
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const difference = expirationTime - currentTime;
        setTimer(difference > 0 ? difference : 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [otpExpiration]);

  const formatTime = (milliseconds) => {
    const totalSec = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^[0-9]{1,6}$/.test(pastedData)) {
      const newOtp = pastedData
        .split("")
        .concat(new Array(6 - pastedData.length).fill(""));
      setOtp(newOtp);
      if (pastedData.length < 6) {
        inputRefs.current[pastedData.length].focus();
      } else {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const verify = () => {
    const val = otp.join("");
    const credentials = {
      email,
      username,
      otp: val,
    };
    dispatch(clearError());
    setIsVerifying(true);
    dispatch(verifyOtp(credentials)).finally(() => {
      setIsVerifying(false);
    });
  };

  const handleClick = (resend = false) => {
    if (resend) {
      setTimer(600000);
      setIsResending(true);
      dispatch(resendOtp({ email })).finally(() => {
        setIsResending(false);
      });
    } else {
      verify();
    }
  };

  useEffect(() => {
    if (otpVerification) {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 500);
    }
  }, [otpVerification, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 
    bg-gradient-to-b from-slate-950 via-slate-800 to-slate-700 text-white"
    >
     
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide montserrat drop-shadow-md">
        Verify Your OTP
      </h1>

     
      <div className="flex gap-3 mb-6" onPaste={handlePaste}>
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="inconsolata w-14 h-14 text-center text-2xl font-semibold 
          border border-slate-500 rounded-lg 
          bg-slate-900 text-slate-100 
          focus:outline-none focus:ring-4 focus:ring-sky-500/60 
          shadow-inner transition-all duration-200"
          />
        ))}
      </div>

      <div className="mb-6 text-center">
        <h4 className="inconsolata text-lg mb-3 text-gray-300">
          Didn’t receive OTP?{" "}
          <button
            onClick={() => handleClick(true)}
            disabled={isResending}
            className="text-sky-400 font-medium hover:text-sky-300 disabled:opacity-50 transition-colors"
          >
            {isResending ? "Resending OTP..." : "Resend OTP"}
          </button>
        </h4>
        <p className="inconsolata text-sm text-gray-400">
          {timer > 0 ? (
            <>
              ⏳ Expires in{" "}
              <span className="text-sky-400">{formatTime(timer)}</span>
            </>
          ) : (
            <span className="text-red-400">OTP expired!</span>
          )}
        </p>
      </div>

     
      <button
        onClick={() => handleClick(timer > 0 ? false : true)}
        className="inconsolata font-bold text-lg px-8 py-3 rounded-lg 
      bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 
      hover:from-sky-500 hover:to-indigo-700 
      active:scale-95 transition-all duration-300 shadow-lg"
      >
        {timer > 0 ? "Submit OTP" : "Resend OTP"}
      </button>

      {isVerifying && (
        <h4 className="mt-6 text-gray-300 animate-pulse">Verifying OTP...</h4>
      )}
      {!isVerifying && !isResending && otpVerification && (
        <h4 className="mt-6 text-green-400 font-semibold">✅ OTP Verified!</h4>
      )}
      {error && (
        <h1 className="mt-6 text-red-400 font-semibold">❌ {error.msg}</h1>
      )}
    </div>
  );
};

export default OtpPage;
