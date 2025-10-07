import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import { Send, Smile, Plus } from "lucide-react";
import Picker from "emoji-picker-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [showActions, setShowActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const actionRef = useRef(null);
  const emojiRef = useRef(null);

  const { selectedUser, sendMessage } = useChatStore();
  const { authUser } = useAuthState();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target)
      ) {
        setShowActions(false);
      }
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (!message.trim() || !selectedUser?._id) return;

    sendMessage({
      text: message.trim(),
      senderId: authUser.user._id,
      receiverId: selectedUser._id,
      createdAt: new Date().toISOString(),
    });

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center gap-3 p-3 bg-[#f0f0f0] border-t border-gray-300">
      {/* Left + Button */}
      <div className="relative" ref={actionRef}>
        <button
          onClick={() => setShowActions((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <Plus size={20} />
        </button>

        {showActions && (
          <div className="absolute bottom-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg w-40 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">📎 File</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">📸 Photo</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">👤 Contact</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">📊 Poll</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">📅 Event</button>
          </div>
        )}
      </div>

      <textarea
        className="flex-1 resize-none rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
        rows={1}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <div className="relative" ref={emojiRef}>
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <Smile size={20} />
        </button>

        {showEmojiPicker && (
          <div className="absolute bottom-12 right-0 z-50">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded-full flex items-center justify-center"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default MessageInput;
