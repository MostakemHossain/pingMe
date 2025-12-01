import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthState } from "../store/useAuthStore";
import NoConversationHistory from "./NoConversationHistory";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import ChatHeader from "./ChatHeader";

const REACTIONS = ["❤️", "😂", "😮", "😢", "👍"];

const ChatContainer = () => {
  const {
    getMessagesByUserId,
    selectedUser,
    messages,
    isMessageLoading,
    subscribeToMessages,
    unSubscribeToMessages,
    deleteMessage,
    editMessage,
    forwardMessage,
    reactToMessage,
  } = useChatStore();

  const { authUser } = useAuthState();
  const chatEndRef = useRef(null);

  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [replyingMessage, setReplyingMessage] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unSubscribeToMessages();
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (timestamp) => {
    const now = new Date();
    const msgDate = new Date(timestamp);
    const diffDays = Math.floor((now - msgDate) / 1000 / 60 / 60 / 24);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return msgDate.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  const formatClock = (timestamp) =>
    new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  const handleEditSubmit = (msgId) => {
    editMessage(msgId, editedText);
    setEditingMessageId(null);
    setEditedText("");
    setActiveMenuId(null);
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
        {messages?.length > 0 && !isMessageLoading ? (
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => {
              const isSender = msg?.senderId === authUser?.user?._id;
              const msgDate = new Date(msg.createdAt);
              const displayDate = formatTime(msg.createdAt);
              const showDateSeparator =
                !lastMessageDate || msgDate.toDateString() !== lastMessageDate.toDateString();
              lastMessageDate = msgDate;

              // Count reactions by emoji
              const reactionCount = {};
              msg.reactions?.forEach((r) => {
                reactionCount[r.emoji] = (reactionCount[r.emoji] || 0) + 1;
              });

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
                    } relative`}
                    onMouseEnter={() => setHoveredMessageId(msg._id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    {!isSender && (
                      <img
                        src={selectedUser?.profilePic || "/default-avatar.png"}
                        alt="receiver"
                        className="w-8 h-8 rounded-full mr-2 object-cover shadow-sm"
                      />
                    )}

                    <div className="relative max-w-[80%] md:max-w-[65%]">
                      <div
                        className={`relative px-4 py-2.5 rounded-2xl text-sm shadow-md transition-all duration-300 break-words
                        ${isSender ? "bg-[#dcf8c6] rounded-br-none" : "bg-white rounded-bl-none"}`}
                      >
                        {/* Reply snippet */}
                        {msg.replyTo && !msg.deleted && (
                          <div className="mb-1 px-2 py-1 bg-gray-100 rounded-l-md border-l-4 border-blue-500 text-xs text-gray-600">
                            <strong>{msg.replyTo.senderName || "You"}:</strong>{" "}
                            {msg.replyTo.text || "Image"}
                          </div>
                        )}

                        {/* Edit input */}
                        {editingMessageId === msg._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="flex-1 border rounded px-2 py-1"
                            />
                            <button
                              className="text-green-600 font-semibold"
                              onClick={() => handleEditSubmit(msg._id)}
                            >
                              Save
                            </button>
                            <button
                              className="text-red-500 font-semibold"
                              onClick={() => setEditingMessageId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            {msg.deleted ? (
                              <p className="italic text-gray-400 text-sm">This message was deleted</p>
                            ) : (
                              <>
                                {msg.image && (
                                  <img
                                    src={msg.image}
                                    alt="message"
                                    className={`w-full h-64 object-cover rounded-md ${
                                      msg.text ? "mb-1" : ""
                                    }`}
                                  />
                                )}
                                {msg.text && <p>{msg.text} {msg?.edited && <span className="text-[10px] opacity-50 italic ml-1">(edited)</span>}</p>}
                              </>
                            )}
                          </>
                        )}

                        <span className="text-[10px] opacity-70 block mt-1 text-right">
                          {formatClock(msg?.createdAt)}
                        </span>

                        {/* Small right-side reaction modal */}
                        {!isSender && !msg.deleted && hoveredMessageId === msg._id && (
                          <div className="absolute bottom-1 right-[-60px] flex flex-row bg-white border border-gray-200 shadow-lg rounded-full p-1 space-y-1 z-50">
                            {REACTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => reactToMessage(msg._id, emoji)}
                                className="w-8 h-8 flex items-center justify-center text-xl rounded-full hover:bg-gray-100 transition-all duration-150"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Display reactions */}
                        {msg.reactions?.length > 0 && (
                          <div className="flex space-x-1 mt-2">
                            {Object.keys(reactionCount).map((emoji) => (
                              <div
                                key={emoji}
                                className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
                              >
                                <span>{emoji}</span>
                                <span>{reactionCount[emoji]}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Sender menu */}
                        {isSender && !msg?.deleted && editingMessageId !== msg._id && (
                          <div className="absolute top-1 right-1">
                            <button
                              onClick={() =>
                                setActiveMenuId(activeMenuId === msg._id ? null : msg._id)
                              }
                              className="p-1 hover:bg-gray-200 rounded-full"
                            >
                              &#x22EE;
                            </button>
                            {activeMenuId === msg._id && (
                              <div
                                ref={menuRef}
                                className="absolute right-0 top-6 bg-white border rounded-md shadow-md flex flex-col z-50 min-w-[120px]"
                              >
                                <button
                                  className="px-3 py-1 hover:bg-gray-100 text-sm text-blue-500 text-left"
                                  onClick={() => {
                                    setEditingMessageId(msg._id);
                                    setEditedText(msg.text);
                                    setActiveMenuId(null);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="px-3 py-1 hover:bg-gray-100 text-sm text-red-500 text-left"
                                  onClick={() => {
                                    deleteMessage(msg._id);
                                    setActiveMenuId(null);
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="px-3 py-1 hover:bg-gray-100 text-sm text-green-500 text-left"
                                  onClick={() => {
                                    setReplyingMessage(msg);
                                    setActiveMenuId(null);
                                  }}
                                >
                                  Reply
                                </button>
                                <button
                                  className="px-3 py-1 hover:bg-gray-100 text-sm text-purple-500 text-left"
                                  onClick={() => {
                                    forwardMessage(msg);
                                    setActiveMenuId(null);
                                  }}
                                >
                                  Forward
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {isSender && (
                      <img
                        src={authUser?.user?.profilePic || "/default-avatar.png"}
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
        ) : isMessageLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoConversationHistory name={selectedUser?.fullName} />
        )}
      </div>

      <MessageInput replyingMessage={replyingMessage} setReplyingMessage={setReplyingMessage} />
    </div>
  );
};

export default ChatContainer;
