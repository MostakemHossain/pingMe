import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoConversationHistory from "./NoConversationHistory";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { getMessagesByUserId, selectedUser, messages } = useChatStore();
  const { authUser } = useAuthState();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diffTime = now - msgDate;
    const diffMinutes = Math.floor(diffTime / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return msgDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatClock = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#e5ddd5]">
        Select a user to start chatting 💬
      </div>
    );
  }

  let lastMessageDate = null;

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5]">
      <ChatHeader />

      <div className="flex-1 px-4 md:px-6 py-4 overflow-y-auto">
        {messages?.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => {
              const isSender = msg?.senderId === authUser?.user?._id;
              const msgDate = new Date(msg.createdAt);
              const displayDate = formatTime(msg.createdAt);

              const showDateSeparator =
                !lastMessageDate ||
                msgDate.toDateString() !== lastMessageDate.toDateString();
              lastMessageDate = msgDate;

              return (
                <React.Fragment key={index}>
                  {showDateSeparator && (
                    <div className="flex justify-center my-2">
                      <span className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full shadow-sm">
                        {displayDate}
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex w-full items-end ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Receiver Avatar */}
                    {!isSender && (
                      <img
                        src={selectedUser?.profilePic || "/default-avatar.png"}
                        alt="receiver"
                        className="w-8 h-8 rounded-full mr-2 object-cover shadow-sm"
                      />
                    )}

                    <div
                      className={`relative max-w-[80%] md:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm shadow-md transition-all duration-300 ${
                        isSender
                          ? "bg-[#dcf8c6] text-gray-900 rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none"
                      }`}
                      style={{
                        borderTopLeftRadius: isSender ? "1rem" : "0.5rem",
                        borderTopRightRadius: isSender ? "0.5rem" : "1rem",
                      }}
                    >
                      <p className="whitespace-pre-wrap break-words leading-relaxed">
                        {msg.text}
                      </p>
                      <span
                        className={`text-[10px] opacity-70 block mt-1 text-right ${
                          isSender ? "text-gray-600" : "text-gray-500"
                        }`}
                      >
                        {formatClock(msg?.createdAt)}
                      </span>
                    </div>

                    {isSender && (
                      <img
                        src={
                          authUser?.user?.profilePic || "/default-avatar.png"
                        }
                        alt="sender"
                        className="w-8 h-8 rounded-full ml-2 object-cover shadow-sm"
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        ) : (
          <NoConversationHistory name={selectedUser?.fullName} />
        )}
      </div>
      <MessageInput/>
    </div>
  );
};

export default ChatContainer;
