import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthState = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
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
}));
