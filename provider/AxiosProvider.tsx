import api from "@/lib/api/axios";
import { getStoreItem, setStoreItem } from "@/lib/secureStore";
import { useAuth } from "@/stores/useAuthStore";
import { useUser } from "@/stores/useUserStore";
import { useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const setToken = useAuth((state) => state.setToken);
  const signOut = useAuth((state) => state.signOut);
  const clearUser = useUser((state) => state.clearUser);

  useEffect(() => {
    api.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;

        console.log(error.config.url);

        if (typeof error.response === "undefined") {
          // TODO: Handle network error
          alert(
            "A server/network error occurred. " +
              "Looks like CORS might be the problem. " +
              "Sorry about this - we will get it fixed shortly.",
          );
          return Promise.reject(error);
        }

        if (
          error.response.status === 401 &&
          originalRequest.url ===
            process.env.EXPO_PUBLIC_API_ENDPOINT + "/token/refresh/"
        ) {
          router.replace("/(auth)/welcome");
          return Promise.reject(error);
        }

        if (
          error.response.data.code === "token_not_valid" &&
          error.response.status === 401
        ) {
          const refreshToken = await getStoreItem("refresh");

          if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

            // exp date in token is expressed in seconds, while now() returns milliseconds:
            const now = Math.ceil(Date.now() / 1000);

            if (tokenParts.exp > now) {
              console.log("EXPIRED ACCESS");
              return api
                .post("/customer/token/refresh", { refresh: refreshToken })
                .then(async (response) => {
                  await setStoreItem("access", response.data.access);
                  // await setStoreItem("refresh", response.data.refresh);

                  setToken({
                    access: response.data.access,
                    refresh: refreshToken,
                  });

                  api.defaults.headers["Authorization"] =
                    "token " + response.data.access;
                  originalRequest.headers["Authorization"] =
                    "token " + response.data.access;

                  return api(originalRequest);
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("Refresh token is expired", tokenParts.exp, now);
              clearUser();
              signOut();
            }
          } else {
            console.log("Refresh token not available.");
            clearUser();
            signOut();
          }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
      },
    );
  });

  return <>{children}</>;
};

export default AxiosProvider;
