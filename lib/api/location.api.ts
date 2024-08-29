import { PostOfficeData } from "@/types";
import axios from "axios";

export const fetchLocationfromPin = (pinCode: string) => {
  console.log(pinCode);
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
