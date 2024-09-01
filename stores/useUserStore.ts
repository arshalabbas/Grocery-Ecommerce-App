import { create } from "zustand";
import { Location, User } from "@/types";

export interface UserStore {
  user: User;
  location: Location;
  setUser: (user: User) => void;
  setLocation: (location: Location) => void;
  updateDistrict: (district: string) => void;
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
  location: {
    postalCode: "",
    city: "",
    place: "",
    district: "",
  },
  setUser: (user: User) => {
    set({ user });
  },
  setLocation: (location: Location) => {
    set((state) => ({ ...state, location }));
  },
  updateDistrict: (district: string) => {
    set((state) => ({ ...state, location: { ...state.location, district } }));
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
