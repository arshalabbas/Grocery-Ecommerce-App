import ActionButton from "@/components/ui/ActionButton";
import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

const WishList = () => {
  return (
    <View>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <ActionButton title="New List" iconLeft={icons.plus} />
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
      />
      <Text>WishList</Text>
    </View>
  );
};

export default WishList;
