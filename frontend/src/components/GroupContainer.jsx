import React, { useEffect, useRef, useState } from "react";
import GroupMessageInput from "./GroupMessageInput";
import { useGroupStore } from "../store/useGroupStore";
import { useAuthState } from "../store/useAuthStore";

const GroupContainer = ({ group }) => {
  const { messages, getMessagesByGroupId } = useGroupStore();
  const { authUser } = useAuthState();
  const [replyingMessage, setReplyingMessage] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch messages when group changes
  useEffect(() => {
    if (!group?._id) return;
    getMessagesByGroupId(group._id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group?._id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!group) return null;

  return (
    <div className="flex-1 flex flex-col relative bg-gray-50">
      {/* Group Header */}
      <div className="flex items-center p-4 bg-white shadow-sm border-b">
        <img
          src={
            group.profilePic?.trim()
              ? group.profilePic
              : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
          }
          alt={group.name}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{group.name}</h2>
          <p className="text-sm text-gray-500">{group.members?.length} members</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e5ddd5]">
        {(messages || [])
          .filter((m) => m.groupId === group._id)
          .map((msg) => {
            const isCurrentUser = msg.senderId._id === authUser.user._id;

            return (
              <div
                key={msg._id}
                className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}
              >
                {/* Sender name for other users */}
                {!isCurrentUser && (
                  <span className="text-xs text-gray-500 mb-1 ml-10">
                    {msg.senderId.fullName}
                  </span>
                )}

                <div className="flex items-end">
                  {/* Show profile pic only for other users */}
                  {!isCurrentUser && (
                    <img
                      src={
                        msg.senderId.profilePic?.trim()
                          ? msg.senderId.profilePic
                          : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                      }
                      alt={msg.senderId.fullName || "User"}
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  )}

                  {/* Message bubble */}
                  <div
                    className={`p-2 rounded-lg max-w-xs break-words ${
                      isCurrentUser ? "bg-green-100 text-black" : "bg-white"
                    }`}
                  >
                    {/* Reply Preview */}
                    {msg.replyTo && (
                      <div className="text-xs text-gray-500 border-l-2 border-gray-300 pl-2 mb-1">
                        Replying to: {msg.replyTo.text || "Image"}
                      </div>
                    )}

                    {/* Deleted message */}
                    {msg.deleted ? (
                      <span className="italic text-red-500">This message was deleted</span>
                    ) : (
                      <>
                        {msg.text}
                        {msg.edited && (
                          <span className="text-xs text-gray-400 ml-1">(edited)</span>
                        )}
                      </>
                    )}

                    {/* Reactions */}
                    {msg.reactions?.length > 0 && (
                      <div className="mt-1 flex gap-1">
                        {msg.reactions.map((r, idx) => (
                          <span key={idx} className="text-sm">
                            {r.emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-400 ml-2 mt-auto">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t bg-white">
        <GroupMessageInput
          replyingMessage={replyingMessage}
          setReplyingMessage={setReplyingMessage}
          groupId={group?._id}
        />
      </div>
    </div>
  );
};

export default GroupContainer;
