import { ActivityIndicator, View } from "react-native";

const Root = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={"large"} color={"orange"} />
    </View>
  );
};

export default Root;
