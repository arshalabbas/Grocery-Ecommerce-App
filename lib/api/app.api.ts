import { Banner, TimeData } from "@/types";
import api from "./axios";
import axios from "axios";

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

// curremt time
export const getTimeData = () => {
  return new Promise<TimeData>((resolve, reject) => {
    axios
      .get(
        "https://www.timeapi.io/api/time/current/zone?timeZone=Asia%2FKolkata",
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
