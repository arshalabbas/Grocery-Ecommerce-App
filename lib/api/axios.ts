import axios from "axios";
import { getStoreItem } from "../secureStore";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getStoreItem("access");
    config.headers.Authorization = token ? `token ${token}` : null;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
