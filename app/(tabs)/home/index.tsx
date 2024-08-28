import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { icons } from "@/constants";
import ActionButton from "@/components/ui/ActionButton";

const Home = () => {
  return (
    <View>
      <Tabs.Screen
        options={{
          headerTitle: "",
          headerStyle: {
            borderBottomWidth: 0.5,
            elevation: 0,
            height: 120,
          },
          headerLeft: () => (
            <View>
              <Text className="font-psemibold">Delivery Address</Text>
              <View className="flex-row items-center">
                <Text
                  className="font-pregular text-secondary-muted"
                  style={{
                    includeFontPadding: false,
                    textAlignVertical: "center",
                  }}
                >
                  Sulthan Bathery
                </Text>
                <Image
                  source={icons.location}
                  className="ml-1 aspect-square h-4"
                  contentFit="contain"
                />
              </View>
            </View>
          ),
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          headerRight: () => <ActionButton iconLeft={icons.cart} title="20" />,
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
      />
      <Text>Home</Text>
    </View>
  );
};

export default Home;
