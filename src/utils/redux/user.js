import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";

export const authStore = create((set) => ({
  user: (() => {
    try {
      return JSON.parse(Cookies.get("user") || "{}");
    } catch {
      return {};
    }
  })(),
  token: Cookies.get("token") || "",

  addUser: (user, token) =>
    set(() => {
      Cookies.set("user", JSON.stringify(user), {
        secure: true,
        sameSite: "Strict",
        path: "/",
      });
      Cookies.set("token", token, {
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      return { user, token };
    }),

  removeUser: async (router) => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        console.warn("No token found in cookies");
      }

      await axios.get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Cookies.remove("user", { path: "/" });
      Cookies.remove("token", { path: "/" });

      router.push("/login");

      return { user: {}, token: "" };
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  },

  updateUser: (updatedUser, updatedToken) =>
    set((state) => {
      const newUser = { ...state.user, ...updatedUser };
      const newToken = updatedToken || state.token;

      Cookies.set("user", JSON.stringify(newUser), {
        secure: true,
        sameSite: "Strict",
        path: "/",
      });
      Cookies.set("token", newToken, {
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      return { user: newUser, token: newToken };
    }),
}));
