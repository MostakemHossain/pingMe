import React, { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import toast from "react-hot-toast";

const allMessages = [
  "Say hello 👋",
  "How are you? 🤔",
  "Make an appointment 📅",
  "Good morning 🌞",
  "Let's catch up ☕",
  "Check this out 🔗",
  "Are you free today? 🕒",
  "Happy birthday 🎉",
  "Congrats on your achievement 🏆",
];

const NoConversationHistory = ({ name }) => {
  const { selectedUser, sendMessage } = useChatStore();
  const { authUser } = useAuthState();
  const [message, setMessage] = useState("");

  const defaultMessages = useMemo(() => {
    if (!selectedUser) return [];

    const shuffled = [...allMessages].sort(() => 0.5 - Math.random());

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    return shuffled.slice(0, isMobile ? 1 : 2);
  }, [selectedUser]);

  const handleMessageClick = async (msg) => {
    setMessage(msg);
    await handleSend();
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    if (!selectedUser?._id) return;

    try {
      await sendMessage({
        text: message.trim(),
        image: "",
        senderId: authUser.user._id,
        receiverId: selectedUser._id,
        createdAt: new Date().toISOString(),
      });
      setMessage("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message. Try again!");
    }
  };

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center text-center px-4 py-4
                    dark:bg-[#0b141a] transition-all duration-300"
    >
      <div className="flex flex-col items-center gap-6 animate-fadeIn max-w-lg w-full px-2">
        <div
          className="flex items-center justify-center rounded-full 
                        bg-green-400/20 shadow-md animate-bounce-slow
                        h-20 w-20 sm:h-24 sm:w-24"
        >
          <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 drop-shadow-md" />
        </div>

        <h2
          className="text-xl sm:text-2xl font-bold 
                       text-gray-800 dark:text-gray-200 leading-snug"
        >
          {name ? `No conversation with ${name} yet` : "No conversation yet"}
        </h2>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2 animate-fadeUp max-w-md">
          Once you send a message, your conversation will appear here. 🌟
        </p>

        <div className="flex gap-3 mt-4 overflow-x-auto py-2 scrollbar-none w-full justify-center sm:justify-center">
          {defaultMessages.map((msg, index) => (
            <button
              key={index}
              onClick={() => handleMessageClick(msg)}
              className="flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-white font-medium shadow-md
                         bg-gradient-to-r from-green-400 via-blue-400 to-purple-500
                         hover:from-green-500 hover:via-blue-500 hover:to-purple-600
                         text-xs sm:text-sm md:text-base
                         transition-all duration-300"
            >
              {msg}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 1.4s ease-in-out;
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoConversationHistory;
