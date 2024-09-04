import { create } from "zustand";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  unit: string;
  quantity: number;
  district: string;
}

interface CartState {
  products: Product[];
  addProduct: (product: Product) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  products: [],
  addProduct: (product) => {
    set((state) => {
      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        return {
          products: state.products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + existingProduct.quantity }
              : item,
          ),
        };
      } else return { products: [...state.products, product] };
    });
  },
  incrementQuantity: (productId) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    }));
  },
  decrementQuantity: (productId) => {
    set((state) => ({
      products: state.products
        .map((product) => {
          if (product.id === productId) {
            const decremented = product.quantity - 1;
            if (decremented <= 0) return undefined;
            return { ...product, quantity: decremented };
          } else {
            return product;
          }
        })
        .filter((product) => product !== undefined) as Product[],
    }));
  },

  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
  clearCart: () => set({ products: [] }),
}));
