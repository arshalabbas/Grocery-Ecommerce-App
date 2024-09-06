import { PlaceOrder, StatusFilter, FewerOrder } from "@/types";
import api from "./axios";

// place an order
export const placeOrder = ({ addressId, items }: PlaceOrder) => {
  return new Promise<{ message: string }>((resolve, reject) => {
    api
      .post("/order/create-order/", { address_id: addressId, items })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// get all orders
export const getAllOrders = ({ status }: { status?: StatusFilter }) => {
  return new Promise<FewerOrder[]>((resolve, reject) => {
    api
      .get("/order/", { params: { status } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
