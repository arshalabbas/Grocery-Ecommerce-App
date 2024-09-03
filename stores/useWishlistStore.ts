import { create } from "zustand";

interface WishlistState {
  quantities: {
    [wishlistId: string]: {
      [productId: string]: number;
    };
  };
  hasChanged: { [wishlistId: string]: boolean };
  incrementQuantity: (wishlistId: string, productId: string) => void;
  decrementQuantity: (wishlistId: string, productId: string) => void;
  setQuantity: (
    wishlistId: string,
    productId: string,
    quantity: number,
  ) => void;
  getAllProducts: (wishlistId: string) => { id: string; quantity: number }[];
  setHasChanged: (wishlistId: string, changed: boolean) => void;
  clearWishlistProducts: (wishlistId: string) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  quantities: {},
  hasChanged: {},

  incrementQuantity: (wishlistId, productId) => {
    set((state) => ({
      quantities: {
        ...state.quantities,
        [wishlistId]: {
          ...state.quantities[wishlistId], // preserve other products
          [productId]: Math.min(
            (state.quantities[wishlistId]?.[productId] || 0) + 1,
            10,
          ),
        },
      },
      hasChanged: {
        ...state.hasChanged,
        [wishlistId]: true,
      },
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
      hasChanged: {
        ...state.hasChanged,
        [wishlistId]: true,
      },
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
      hasChanged: {
        ...state.hasChanged,
        [wishlistId]: false,
      },
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
  setHasChanged: (wishlistId, changed) => {
    set((state) => ({
      ...state,
      hasChanged: { ...state.hasChanged, [wishlistId]: changed },
    }));
  },
  clearWishlistProducts: (wishlistId) => {
    set((state) => {
      const updatedWishlist = { ...state.quantities[wishlistId] };

      for (const productId in updatedWishlist) {
        if (updatedWishlist[productId] === 0) {
          delete updatedWishlist[productId];
        }
      }

      return {
        quantities: {
          ...state.quantities,
          [wishlistId]: updatedWishlist,
        },
        hasChanged: { ...state.hasChanged, [wishlistId]: false },
      };
    });
  },
}));
