import { PlaceOrder, StatusFilter, FewerOrder, Order } from "@/types";
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

// get order details
export const getOrder = ({ id }: { id: string }) => {
  return new Promise<Order>((resolve, reject) => {
    api
      .get(`/order/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Cancel order
export const cancelOrder = ({ id }: { id: string }) => {
  return new Promise<{ message: string }>((resolve, reject) => {
    api
      .put(`/order/cancel-order/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
