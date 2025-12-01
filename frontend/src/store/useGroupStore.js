/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useGroupStore = create((set, get) => ({
  groups: [],
  messages: [],
  isGroupLoading: false,
  isCreating: false,

  fetchAllGroups: async () => {
    set({ isGroupLoading: true });
    try {
      const res = await axiosInstance.get("/group/get");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isGroupLoading: false });
    }
  },

  createGroup: async (payload) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/group/create", { payload });
      set({ groups: [res.data, ...get().groups] });
      toast.success("Group created successfully");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return false;
    } finally {
      set({ isCreating: false });
    }
  },

  getMessagesByGroupId: async (groupId) => {
    try {
      const res = await axiosInstance.get(`/group/message-get/${groupId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    }
  },

  sendGroupMessage: async (messageData) => {
   
    try {
      const res = await axiosInstance.post("/group/message-sent", messageData);

      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
}));
