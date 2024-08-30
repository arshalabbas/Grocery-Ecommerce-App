import { ProductData } from "@/types";
import api from "./axios";

export const getProducts = ({
  query,
  value,
}: {
  query?: "pincode" | "district" | "category";
  value?: string;
}) => {
  return new Promise<ProductData[]>((resolve, reject) => {
    api
      .get(`/product/?pincode=${value}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
