import { Banner } from "@/types";
import api from "./axios";

// banners
export const getBanners = () => {
  return new Promise<Banner[]>((resolve, reject) => {
    api
      .get("/manager/banner")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
