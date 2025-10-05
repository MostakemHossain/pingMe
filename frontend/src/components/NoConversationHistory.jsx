import React, { useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const allMessages = [
  "Say hello 👋",
  "How are you? 🤔",
  "Make an appointment 📅",
  "Good morning 🌞",
  "Let's catch up ☕",
  "Check this out 🔗",
  "Are you free today? 🕒",
  "Happy birthday 🎉",
  "Congrats on your achievement 🏆"
];

const NoConversationHistory = ({ name }) => {
  const { selectedUser } = useChatStore();

  const defaultMessages = useMemo(() => {
    if (!selectedUser) return [];
    const shuffled = allMessages.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [selectedUser]);

  const handleMessageClick = (msg) => {
    console.log(`Send message to ${selectedUser?.fullName}: ${msg}`);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-400/20 shadow-md animate-bounce-slow">
          <MessageCircle className="h-12 w-12 text-green-600 drop-shadow-md" />
        </div>

        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          {name ? `No conversation with ${name} yet` : "No conversation yet"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mt-4 animate-fadeUp">
          Once you send a message, your conversation will appear here. 🌟
        </p>

        <div className="flex gap-3 mt-2 overflow-x-auto py-2">
          {defaultMessages.map((msg, index) => (
            <button
              key={index}
              onClick={() => handleMessageClick(msg)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-white font-medium shadow-md
                         bg-gradient-to-r from-green-400 via-blue-400 to-purple-500
                         hover:from-green-500 hover:via-blue-500 hover:to-purple-600
                         transition-all duration-300"
            >
              {msg}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 1.5s ease-in-out;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoConversationHistory;
