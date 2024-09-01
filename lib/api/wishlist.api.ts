import { Wishlist } from "@/types";
import api from "./axios";

// get all wishlist
export const getWishlist = () => {
  return new Promise<Wishlist[]>((resolve, reject) => {
    api
      .get("/wishlist")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// create wishlist
export const createWishlist = ({
  title,
  district,
}: {
  title: string;
  district: string;
}) => {
  return new Promise<Wishlist>((resolve, reject) => {
    api
      .post("/wishlist/add", { title, district })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Add item to wishlist
export const addToWishlist = ({
  id,
  productId,
  quantity,
}: {
  id: string;
  productId: string;
  quantity: number;
}) => {
  return new Promise<Wishlist>((resolve, reject) => {
    api
      .post(`/wishlist/item`, {
        wishlist_id: id,
        product_id: productId,
        quantity,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Delete item from wishlist
export const deleteFromWishlist = ({
  id,
  wishlistItemId,
}: {
  id: string;
  wishlistItemId: string;
}) => {
  return new Promise<Wishlist>((resolve, reject) => {
    api
      .delete(`/wishlist/item/${id}/${wishlistItemId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
