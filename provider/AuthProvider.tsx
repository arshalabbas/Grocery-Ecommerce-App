import { useAuth } from "@/stores/useAuthStore";
import { useRootNavigationState, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { getStoreItem } from "@/lib/secureStore";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/user.api";
import { useUser } from "@/stores/useUserStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, isLoading, setIsLoading, setToken } = useAuth();
  const setUser = useUser((state) => state.setUser);
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();

  // get User Query
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: token ? true : false,
  });

  // Initial Logics: Fetches the token from the store
  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true);

      try {
        const accessToken = await getStoreItem("access");
        const refreshToken = await getStoreItem("refresh");

        if (accessToken && refreshToken) {
          setToken({ access: accessToken, refresh: refreshToken });
        } else {
          setToken(null);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [setIsLoading, setToken]);

  // Authentication Logic
  useEffect(() => {
    if (!rootNavigationState?.key || isLoading) return;

    console.log("TOKEN", token);

    if (!token) {
      router.replace("/(auth)/welcome");
    } else {
      if (isSuccess) {
        setUser(data);
        if (!data.on_boarded) {
          router.replace("/onboarding");
        } else {
          router.replace("/(root)/(tabs)/home");
        }
      }
    }
  }, [
    data,
    isSuccess,
    setUser,
    token,
    isLoading,
    router,
    rootNavigationState?.key,
  ]);

  if (isLoading) return null;

  return <>{children}</>;
};

export default AuthProvider;
