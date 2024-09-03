import { Wishlist } from "@/types";
import api from "./axios";

// get all wishlist
export const getWishlists = ({ district }: { district?: string }) => {
  return new Promise<Wishlist[]>((resolve, reject) => {
    api
      .get("/wishlist/?district=" + district)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Get wishlist
export const getWishlist = ({ id }: { id: string }) => {
  return new Promise<Wishlist>((resolve, reject) => {
    api
      .get(`/wishlist/${id}`)
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

// Delete wishlist
export const deleteWishlist = ({ id }: { id: string }) => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/wishlist/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Edit Wishlist
export const editWishlist = ({ id, title }: { id: string; title: string }) => {
  return new Promise<Wishlist>((resolve, reject) => {
    api
      .patch(`/wishlist/${id}`, { title })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Edit the wishlist items
export const editWishlistItems = ({
  id,
  items,
}: {
  id: string;
  items: { id: string; quantity: number }[];
}) => {
  return new Promise<{ message: string }>((resolve, reject) => {
    api
      .post(`/wishlist/item`, {
        wishlist_id: id,
        items,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
