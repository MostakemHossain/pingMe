import React from "react";
import { MessageCircle } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

const NoConversationPlaceholder = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden text-center px-4 sm:px-6">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 animate-gradient"></div>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center animate-fadeIn">
        {/* Icon */}
        <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-green-400/20 backdrop-blur-sm shadow-md animate-bounce-slow">
          <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 drop-shadow-md" />
        </div>

        {/* Animated Heading */}
        <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          <Typewriter
            words={[
              "Welcome to PingMe 👋",
              "Start chatting instantly 💬",
              "Stay connected always 🚀",
              "Have fun messaging 😄",
            ]}
            loop={0}          
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h2>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-xs sm:max-w-md animate-fadeUp">
          Select a conversation from the left or start a new one to begin chatting.  
          Stay connected wherever you are 🌟
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 10s ease infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 2s ease-in-out;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoConversationPlaceholder;
