import { Stack } from "expo-router";
import { View, Text } from "react-native";

const NetworkError = () => {
  return (
    <View className="flex-1 justify-end bg-black/20">
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
      <View className="w-full rounded-t-3xl bg-background p-5">
        <Text className="font-psemibold text-xl">Network Error</Text>
      </View>
    </View>
  );
};

export default NetworkError;
