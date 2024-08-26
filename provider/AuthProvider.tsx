import { useAuth } from "@/stores/useAuthStore";
import { useRootNavigationState, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { getStoreItem } from "@/lib/secureStore";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, isLoading, setIsLoading, setToken } = useAuth();
  const rootNavigationState = useRootNavigationState();
  const router = useRouter();

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

    if (!token) {
      router.replace("/(auth)/welcome");
    } else {
      router.replace("/(tabs)/home");
    }
  }, [token, isLoading, router, rootNavigationState?.key]);

  if (isLoading) return null;

  return <>{children}</>;
};

export default AuthProvider;
