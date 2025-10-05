import React, { useEffect } from "react";
import { Search, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && selectedUser) {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedUser, setSelectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={
            selectedUser.profilePic ||
            `https://ui-avatars.com/api/?name=${selectedUser.fullName}&background=random&size=64`
          }
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
        <div className="flex flex-col">
          <h4 className="text-sm sm:text-base font-medium truncate">
            {selectedUser.fullName}
          </h4>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        <Search
          onClick={() => console.log("Search clicked")}
          className="w-5 h-5 cursor-pointer hover:text-gray-800 transition-colors"
        />
        <X
          onClick={() => setSelectedUser(null)}
          className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default ChatHeader;
