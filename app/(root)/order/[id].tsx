import ScreenHeader from "@/components/ScreenHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const OrderScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Stack.Screen
        options={{ headerShown: true, header: () => <ScreenHeader /> }}
      />
      <Text>${id}</Text>
    </View>
  );
};

export default OrderScreen;
