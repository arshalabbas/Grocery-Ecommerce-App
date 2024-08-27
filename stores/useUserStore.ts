import { create } from "zustand";
import { User } from "@/types";

export interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUser = create<UserStore>((set) => ({
  user: {
    id: "",
    phone: "",
    name: "",
    email: "",
    on_boarded: false,
    created: new Date(),
  },
  setUser: (user: User) => {
    set({ user });
  },
  clearUser: () => {
    set({
      user: {
        id: "",
        phone: "",
        name: "",
        email: "",
        on_boarded: false,
        created: new Date(),
      },
    });
  },
}));
