import { Wishlist } from "@/types";
import api from "./axios";

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
