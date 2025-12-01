import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkleton";
import NoChatFound from "./NoChatFound";
import { useAuthState } from "../store/useAuthStore";

const ChatList = () => {
  const { getMyChats, chats, isUserLoading, setSelectedUser,  } =
    useChatStore();
  
    const {onlineUsers }= useAuthState();
  

  useEffect(() => {
    getMyChats();
  }, [getMyChats]);

  if (isUserLoading) {
    return <UserLoadingSkeleton />;
  }

  if (!chats || chats?.length === 0) {
    return <NoChatFound />;
  }

  return (
    <div className="flex flex-col gap-2">
      {chats.map((chat) => {
      

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-300
              ${
                onlineUsers.includes(chat._id)
                  ? "bg-teal-600 text-white border-teal-400 shadow-md"
                  : "bg-teal-600 text-white border-teal-400 shadow-md "
              }`}
          >
            <div className="relative">
              <img
                src={
                  chat.profilePic ||
                  `https://ui-avatars.com/api/?name=${chat.fullName}&background=random&size=64`
                }
                alt={chat?.fullName}
                className="w-12 h-12 rounded-full object-cover border border-slate-600"
              />
              {onlineUsers.includes(chat?._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
              )}
            </div>

            <h4 className="font-medium truncate">{chat.fullName}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
