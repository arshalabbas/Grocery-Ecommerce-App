import api from "./axios";

export const requestVerificationCode = ({ phone }: { phone: string }) => {
  return new Promise<{
    otp: string; // REVIEW: This must be removed in the future
    time?: number;
    created_time?: number;
    message: string;
  }>((resolve, reject) => {
    api
      .post("/customer/verification-code", {
        phone,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const validateCode = async ({
  phone,
  code,
}: {
  phone: string;
  code: string;
}) => {
  return new Promise<{
    token: {
      access: string;
      refresh: string;
    };
  }>((resolve, reject) => {
    api
      .post("/customer/validate-verification-code", {
        phone,
        otp: code,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
