import { ProductData } from "@/types";
import api from "./axios";

export const getProducts = ({
  pincode,
  category,
  district,
}: {
  pincode?: string;
  category?: string;
  district?: string;
}) => {
  return new Promise<ProductData[]>((resolve, reject) => {
    api
      .get(`/product/`, {
        params: { pincode, district, category },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const getProduct = ({ id }: { id: string }) => {
  return new Promise<ProductData>((resolve, reject) => {
    api
      .get(`/product/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
