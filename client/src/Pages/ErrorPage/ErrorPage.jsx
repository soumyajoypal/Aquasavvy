import React from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
      {/* Lottie Animation */}
      <div className="w-full max-w-md">
        <DotLottieReact
          src="https://lottie.host/dc7df072-959f-4cf5-9a55-b4bbbb4c3cbd/HPgtwfya4M.lottie"
          loop
          autoplay
        />
      </div>

      {/* Text Section */}
      <h1 className="text-7xl font-extrabold text-red-500 mt-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 text-center max-w-sm">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
