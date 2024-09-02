import { create } from "zustand";

interface WishlistState {
  quantities: {
    [wishlistId: string]: {
      [productId: string]: number;
    };
  };
  hasChanged: boolean;
  incrementQuantity: (wishlistId: string, productId: string) => void;
  decrementQuantity: (wishlistId: string, productId: string) => void;
  setQuantity: (
    wishlistId: string,
    productId: string,
    quantity: number,
  ) => void;
  getAllProducts: (wishlistId: string) => { id: string; quantity: number }[];
  setHasChanged: (changed: boolean) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  quantities: {},
  hasChanged: false,

  incrementQuantity: (wishlistId, productId) => {
    set((state) => ({
      quantities: {
        ...state.quantities,
        [wishlistId]: {
          ...state.quantities[wishlistId], // preserve other products
          [productId]: (state.quantities[wishlistId]?.[productId] || 0) + 1,
        },
      },
      hasChanged: true,
    }));
  },

  decrementQuantity: (wishlistId, productId) => {
    set((state) => ({
      quantities: {
        ...state.quantities,
        [wishlistId]: {
          ...state.quantities[wishlistId],
          [productId]: Math.max(
            (state.quantities[wishlistId]?.[productId] || 0) - 1,
            0,
          ),
        },
      },
      hasChanged: true,
    }));
  },

  setQuantity: (wishlistId, productId, quantity) => {
    set((state) => ({
      quantities: {
        ...state.quantities,
        [wishlistId]: {
          ...state.quantities[wishlistId],
          [productId]: quantity,
        },
      },
      hasChanged: false,
    }));
  },
  getAllProducts: (wishlistId) => {
    const wishlist = get().quantities[wishlistId];
    if (!wishlist) {
      return [];
    }

    return Object.entries(wishlist).map(([productId, quantity]) => ({
      id: productId,
      quantity,
    }));
  },
  setHasChanged: (changed) => {
    set((state) => ({ ...state, hasChanged: changed }));
  },
}));
