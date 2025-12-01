import { useEffect } from "react";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import GroupList from "../components/GroupList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import { X } from "lucide-react";
import GroupContainer from "../components/GroupContainer";

const chatBg = "https://i.ibb.co/1R0w2Rh/whatsapp-bg.png";

const ChatPage = () => {
  const { activeChat, selectedUser, setSelectedUser } = useChatStore();
  const { authUser, checkAuth } = useAuthState();

  useEffect(() => {
    if (!authUser) checkAuth();
  }, [authUser, checkAuth]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600">

      <div className="w-full max-w-6xl h-[100dvh] md:h-[800px] shadow-2xl rounded-lg overflow-hidden">

        <BorderAnimatedContainer className="flex h-full">

          {/* Desktop Sidebar */}
          <aside className="hidden md:flex w-80 flex-col border-r border-gray-300 bg-[#f0f2f5]">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeChat === "chats" && <ChatList />}
              {activeChat === "contacts" && <ContactList />}
              {activeChat === "groups" && <GroupList />}
            </div>
          </aside>

          {/* Mobile sidebar */}
          {!selectedUser && (
            <aside className="md:hidden w-full flex flex-col bg-[#f0f2f5]">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat === "chats" && <ChatList />}
                {activeChat === "contacts" && <ContactList />}
                {activeChat === "groups" && <GroupList />}
              </div>
            </aside>
          )}

          {/* Chat container */}
          {selectedUser && (
            <main
              className="flex-1 flex flex-col relative"
              style={{
             
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
        
              <div className="md:hidden w-full bg-teal-600 text-white flex items-center px-4 py-3 shadow">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="active:scale-95"
                >
                  <X size={26} />
                </button>
                <h2 className="ml-3 text-lg font-semibold truncate">
                  {selectedUser?.name || selectedUser?.fullName}
                </h2>
              </div>

              {selectedUser?.members ? (
      <GroupContainer group={selectedUser} />
    ) : (
      <ChatContainer />
    )}
            </main>
          )}

        
          {!selectedUser && (
            <main
              className="hidden md:flex flex-1 items-center justify-center bg-white"
              style={{
                backgroundImage: `url(${chatBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <NoConversationPlaceholder />
            </main>
          )}
        </BorderAnimatedContainer>
      </div>

    </div>
  );
};

export default ChatPage;
