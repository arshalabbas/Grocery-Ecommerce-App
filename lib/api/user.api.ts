import { User } from "@/types";
import api from "./axios";
import { OnboardingSchema } from "../validation/onboardin.validation";
import { getStoreItem } from "../secureStore";

export const getUser = () => {
  return new Promise<User>((resolve, reject) => {
    api
      .get("/customer/user")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const updateUser = ({ name, email }: OnboardingSchema) => {
  let user: { name: string; email?: string } = { name };
  if (email !== "") user.email = email;
  return new Promise<User>((resolve, reject) => {
    api
      .put("/customer/user", user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const logoutUser = async () => {
  const refreshToken = await getStoreItem("refresh");
  return new Promise<User>((resolve, reject) => {
    api
      .post("/customer/logout", { refresh: refreshToken })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
