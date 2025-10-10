import React, { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import { Send, Smile, Image } from "lucide-react";
import Picker from "emoji-picker-react";
import useKeyboardSound from "../hooks/useKeyboardSound.js";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sending, setSending] = useState(false);

  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);

  const { selectedUser, sendMessage, isSoundEnabled } = useChatStore();
  const { authUser } = useAuthState();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = async () => {
    if ((!message.trim() && !imagePreview) || sending) return;
    if (!selectedUser?._id) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    try {
      setSending(true);
      await sendMessage({
        text: message.trim(),
        image: imagePreview,
        senderId: authUser.user._id,
        receiverId: selectedUser._id,
        createdAt: new Date().toISOString(),
      });
      setMessage("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.log(err);
      toast.error("Failed to send message. Try again!");
    } finally {
      setSending(false);
    }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative flex flex-col gap-2 p-3 bg-[#f0f0f0] border-t border-gray-300">
      {imagePreview && !sending && (
        <div className="relative w-24 h-24 mb-1">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-full object-cover rounded-md"
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <textarea
          className="flex-1 resize-none rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
          rows={1}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={sending}
        />

        <div className="relative" ref={emojiRef}>
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            disabled={sending}
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
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          disabled={sending}
        >
          <Image size={20} />
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          disabled={sending}
        />

        <button
          onClick={handleSend}
          className={`flex items-center justify-center p-2 rounded-full transition `}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
