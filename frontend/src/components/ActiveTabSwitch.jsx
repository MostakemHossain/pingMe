import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeChat, setActiveTab } = useChatStore();

  return (
    <div className="w-full flex justify-center py-2">
      <Tabs
        value={activeChat}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2 rounded-xl bg-gray-100 p-1 shadow-md">
          <TabsTrigger
            value="chats"
            className="w-full rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-gray-700 hover:bg-emerald-100 transition-colors"
          >
            Chats
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="w-full rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700 hover:bg-green-100 transition-colors"
          >
            Contacts
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ActiveTabSwitch;
