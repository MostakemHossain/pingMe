/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthState } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  messages: [],
  chats: [],
  activeChat: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeChat: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMyChats: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthState.getState();
    const tempId = `pingMe-${Date.now()}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser.user._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      replyTo: messageData.replyTo || null,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      set({ messages });
      toast.error(error?.response?.data?.message);
    }
  },

  deleteMessage: async (messageId) => {
    const { messages } = get();
    const updatedMessages = messages.map((msg) =>
      msg._id === messageId ? { ...msg, text: "This message was deleted", deleted: true, image: null } : msg
    );
    set({ messages: updatedMessages });

    try {
      await axiosInstance.delete(`/messages/delete/${messageId}`);
      toast.success("Message deleted successfully"); 
    } catch (error) {
      set({ messages });
      toast.error(error?.response?.data?.message || "Failed to delete message");
    }
  },
  editMessage: async (messageId, newText) => {
    const { messages } = get();
    const updatedMessagesOptimistic = messages.map((msg) =>
      msg._id === messageId ? { ...msg, text: newText, edited: true } : msg
    );
    set({ messages: updatedMessagesOptimistic });

    try {
      const res = await axiosInstance.put(`/messages/edit/${messageId}`, { text: newText });

      const updatedMessages = messages.map((msg) =>
        msg._id === messageId ? res.data.data : msg
      );
      set({ messages: updatedMessages });
      toast.success("Message edited successfully");
    } catch (error) {
      set({ messages }); 
      toast.error(error?.response?.data?.message || "Failed to edit message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;
    const socket = useAuthState.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isFromSelectedUser) return;
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });
  },
  reactToMessage: async (messageId, emoji) => {
    const { messages, selectedUser } = get();
    const { authUser } = useAuthState.getState();

    // Optimistic update
    const updatedMessagesOptimistic = messages.map((msg) => {
      if (msg._id === messageId) {
        const existingReactionIndex = msg.reactions.findIndex(r => r.userId === authUser.user._id);
        if (existingReactionIndex > -1) {
          msg.reactions[existingReactionIndex].emoji = emoji;
        } else {
          msg.reactions.push({ userId: authUser.user._id, emoji });
        }
      }
      return msg;
    });
    set({ messages: updatedMessagesOptimistic });

    try {
      const res = await axiosInstance.post(`/messages/${messageId}/react`, { emoji });
      const updatedMessages = messages.map((msg) =>
        msg._id === messageId ? res.data.data : msg
      );
      toast.success("Reaction updated successfully");
      set({ messages: updatedMessages });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to react to message");
      set({ messages }); // rollback
    }
  },

  unSubscribeToMessages: () => {
    const socket = useAuthState.getState().socket;
    socket.off("newMessage");
  },
}));
