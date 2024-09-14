import { ProductCursor, ProductData, SubCategory } from "@/types";
import api from "./axios";

export const getProducts = ({
  pincode,
  category,
  district,
  search,
  cursor,
}: {
  pincode?: string;
  category?: string;
  district?: string;
  search?: string;
  cursor?: string;
}) => {
  return new Promise<ProductCursor>((resolve, reject) => {
    api
      .get(`/product/`, {
        params: { pincode, district, category, search, cursor },
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

export const getSubCategories = ({ district }: { district?: string }) => {
  return new Promise<SubCategory[]>((resolve, reject) => {
    api
      .get(`/product/sub-category/`, { params: { district } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
