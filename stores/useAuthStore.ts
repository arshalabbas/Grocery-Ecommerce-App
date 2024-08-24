import { create } from "zustand";
import { setStoreItem, deleteStoreItem } from "@/lib/secureStore";

interface Token {
  access: string;
  refresh: string;
}

interface AuthStore {
  token: Token | null;
  isLoading: boolean;
  signIn: (token: Token) => void;
  signOut: () => void;
  setToken: (token: Token | null) => void;
  setIsLoading: (loadingState: boolean) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  token: null, // Start with null for unauthenticated state
  isLoading: true,

  signIn: async (token: Token) => {
    try {
      await Promise.all([
        setStoreItem("access", token.access),
        setStoreItem("refresh", token.refresh),
      ]);

      set({ token, isLoading: false });
    } catch (error) {
      console.error("Error saving token:", error);
    }
  },

  signOut: async () => {
    try {
      await Promise.all([
        deleteStoreItem("access"),
        deleteStoreItem("refresh"),
      ]);

      set({ token: null });
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  },

  setToken: (token: Token | null) => {
    set({ token });
  },

  setIsLoading: (loadingState: boolean) => {
    set({ isLoading: loadingState });
  },
}));
