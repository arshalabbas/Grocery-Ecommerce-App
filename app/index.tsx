import { useAuth } from "@/stores/useAuthStore";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Redirect } from "expo-router";

const Root = () => {
  const token = useAuth((state) => state.token);
  if (token) return <Redirect href={"/(tabs)/home"} />;

  return <HomeSkeleton />;
};

export default Root;
