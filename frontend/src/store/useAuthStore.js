import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";

export const useAuthState = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
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
  signUp: async(userData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", userData);
      set({ authUser: res.data });
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response?.data || "Sign up failed" };
    }
    
  }

}));
