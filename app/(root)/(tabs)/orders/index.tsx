import { icons } from "@/constants";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

const Orders = () => {
  return (
    <View>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity className="p-[20px]">
              <Image
                source={icons.search}
                className="aspect-square w-5"
                contentFit="contain"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text>Orders</Text>
    </View>
  );
};

export default Orders;
