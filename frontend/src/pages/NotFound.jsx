import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 p-4">
      {/* Animated 404 */}
      <div className="relative flex items-center justify-center mb-6">
        <span className="text-white text-6xl font-bold animate-bounce">4</span>
        <span className="text-white text-6xl font-bold mx-2 animate-pulse">0</span>
        <span className="text-white text-6xl font-bold animate-bounce">4</span>
      </div>

      {/* Message */}
      <p className="text-white/90 text-center text-lg md:text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Go Home Button */}
      <a
        href="/"
        className="inline-block bg-white text-teal-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-transform transform hover:-translate-y-1 hover:scale-105"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
