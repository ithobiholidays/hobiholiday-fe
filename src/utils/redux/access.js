import { create } from "zustand";

export const accessStore = create((set) => ({
  message: "",
  addMessage: (message) => set({ message }),
  removeMessage: () => set({ message: "" }),
}));
