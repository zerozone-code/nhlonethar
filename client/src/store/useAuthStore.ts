import { create } from "zustand";
import type { Admin } from "../types/admin";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/getErrorMessage";

interface AuthState {
  admin: Admin | null;
  isCheckingAuth: boolean;
  isLoggingIn: boolean;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isCheckingAuth: true,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await api.get<Admin>("/auth/me");
      set({ admin: res.data });
    } catch (error) {
      set({ admin: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  login: async (email, password) => {
    set({ isLoggingIn: true });
    try {
      const res = await api.post<Admin>("/auth/login", { email, password });
      set({ admin: res.data });
      toast.success("Login ဝင်ပြီးပါပြီ");

      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, "Login ဝင်လို့မရပါ"));
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      set({ admin: null });
      toast.success("Logout လုပ်ပြီးပါပြီ");
    }
  },
  clearAdmin: () => {
    set({ admin: null });
  },
}));
