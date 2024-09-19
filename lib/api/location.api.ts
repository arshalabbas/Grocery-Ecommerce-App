import { Address, PostOfficeData } from "@/types";
import axios from "axios";
import api from "./axios";

export const fetchLocationfromPin = (pinCode: string) => {
  return new Promise<PostOfficeData>((resolve, reject) => {
    axios
      .get(`https://api.postalpincode.in/pincode/${pinCode}`)
      .then((response) => {
        if (response.data[0].Status === "Success") {
          resolve(response.data[0].PostOffice[0]);
        } else {
          reject(response.data.Message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get all addresses
export const getAllAddresses = ({ district }: { district?: string }) => {
  return new Promise<Address[]>((resolve, reject) => {
    api
      .get("/customer/address", { params: { district } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Add a new Address
export const addNewAddress = (address: Omit<Address, "id">) => {
  return new Promise<{ message: string }>((resolve, reject) => {
    api
      .post("/customer/add-address", address)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Get a address
export const getAddress = ({ id }: { id: string }) => {
  return new Promise<Address>((resolve, reject) => {
    api
      .get(`/customer/address/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

// Check the address is servicable
export const isServicable = ({
  district,
  pincode,
}: {
  district: string;
  pincode: string;
}) => {
  return new Promise<{ message: { is_blocked: boolean; reason: string } }>(
    (resolve, reject) => {
      api
        .get("/block-area/", { params: { district, pincode } })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response.data);
        });
    },
  );
};
