import { create } from "zustand";

export const checkboxStore = create((set) => ({
  checked: false,
  checkState: "password",

  setChecked: () =>
    set((state) => ({
      checked: !state.checked,
      checkState: state.checked ? "password" : "text",
    })),
}));
