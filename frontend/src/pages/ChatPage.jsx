import { useEffect } from "react";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";

const ChatPage = () => {
  const { activeChat, selectedUser } = useChatStore();
  const {  authUser,checkAuth } = useAuthState();
  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600">
      <div className="w-full max-w-6xl h-[800px] shadow-2xl rounded-lg overflow-hidden">
        <BorderAnimatedContainer>
         
          <aside className="w-80 flex flex-col border-r border-gray-300 bg-[#f0f2f5]">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              {activeChat === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </aside>

          {/* Chat area (WhatsApp-style right) */}
          <main className="flex-1 flex flex-col bg-white relative">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <NoConversationPlaceholder />
            )}
          </main>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default ChatPage;
