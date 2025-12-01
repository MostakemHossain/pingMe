import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeChat, setActiveTab } = useChatStore();

  return (
    <div className="w-full flex justify-center py-2 px-2 sm:px-4">
      <Tabs
        value={activeChat}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-3 rounded-xl bg-gray-100 p-1 shadow-md">
          <TabsTrigger
            value="chats"
            className="w-full rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:via-blue-400 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-700 hover:bg-gray-200 transition-colors animate-gradient-tab"
          >
            Chats
          </TabsTrigger>

          <TabsTrigger
            value="contacts"
            className="w-full rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:via-pink-400 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-700 hover:bg-gray-200 transition-colors animate-gradient-tab"
          >
            Contacts
          </TabsTrigger>

          <TabsTrigger
            value="groups"
            className="w-full rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:via-orange-400 data-[state=active]:to-red-500 data-[state=active]:text-white text-gray-700 hover:bg-gray-200 transition-colors animate-gradient-tab"
          >
            Groups
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-tab[data-state="active"] {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ActiveTabSwitch;
