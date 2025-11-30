import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthState = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    const token = localStorage.getItem("token");
  if (!token) {
    set({ authUser: null, isCheckingAuth: false });
    return;
  }
    try {
      const res = await axiosInstance.get("/auth/check",{
        headers: { Authorization: `${token}` },
      });
      get().connectSocket(); 
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", userData);
      set({ authUser: res.data });
      if (res?.data?.user?._id) {
        toast.success("Sign up successful");
      }
      get().connectSocket(); 
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      set({ authUser: res.data });
      if (res?.data?.user?._id) {
        toast.success("Logged in successful");
      }
      get().connectSocket(); 
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Failed to log out");
      console.log(error);
    }
  },
  updateProfile: async (profileData) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", profileData);
      set((state) => ({
        authUser: { ...state.authUser, ...res.data },
      }));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.log(error);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get()?.socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
