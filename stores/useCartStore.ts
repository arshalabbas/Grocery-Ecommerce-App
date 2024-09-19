import { create } from "zustand";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  unit: string;
  quantity: number;
  district: string;
  fixedQuantity: number;
  allowedLimit: number;
  stock: number;
}

interface CartState {
  products: Product[];
  addProduct: (product: Product) => void;
  incrementQuantity: (productId: string, rePosition?: boolean) => void;
  decrementQuantity: (productId: string, rePosition?: boolean) => void;
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
  incrementQuantity: (productId, rePosition = true) => {
    let incrementedProduct: Product;
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          incrementedProduct = {
            ...product,
            quantity: Math.min(
              product.quantity + 1,
              Math.min(product.stock, product.allowedLimit),
            ),
          };
          return incrementedProduct;
        } else {
          return product;
        }
      });

      if (rePosition)
        return {
          products: [
            ...updatedProducts.filter((product) => product.id !== productId),
            incrementedProduct,
          ],
        };
      else return { products: updatedProducts };
    });
  },
  decrementQuantity: (productId, rePosition = true) => {
    set((state) => {
      let decrementedProduct: Product | undefined;

      const updatedProducts = state.products
        .map((product) => {
          if (product.id === productId) {
            const decremented = product.quantity - 1;
            if (decremented <= 0) return undefined; // Return undefined to remove the product
            decrementedProduct = { ...product, quantity: decremented };
            return decrementedProduct;
          }
          return product;
        })
        .filter((product) => product !== undefined) as Product[];

      // If a product was decremented, move it to the end of the array
      if (decrementedProduct) {
        if (rePosition)
          return {
            products: [
              ...updatedProducts.filter((product) => product.id !== productId),
              decrementedProduct,
            ],
          };
        else return { products: updatedProducts };
      }

      return { products: updatedProducts };
    });
  },

  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
  clearCart: () => set({ products: [] }),
}));
