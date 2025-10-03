import React from "react";
import { MessageCircle } from "lucide-react";

const NoChatFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
        <MessageCircle className="w-10 h-10" />
      </div>

      <h2 className="text-xl font-semibold text-gray-800">
        No Chats Yet
      </h2>

      <p className="text-gray-500 text-sm mt-2 max-w-sm">
        Start a conversation by selecting a contact or creating a new chat. 
      </p>
    </div>
  );
};

export default NoChatFound;
