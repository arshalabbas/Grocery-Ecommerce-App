// import { useAuth } from "@/stores/useAuthStore";
// import { Redirect } from "expo-router";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
// import { ActivityIndicator, View } from "react-native";

const Root = () => {
  // const token = useAuth((state) => state.token);

  // if (token) return <Redirect href={"/(tabs)/home"} />;

  // return (
  //   <View className="flex-1 items-center justify-center">
  //     <ActivityIndicator size={"large"} color={"orange"} />
  //   </View>
  // );

  return <HomeSkeleton />;
};

export default Root;
