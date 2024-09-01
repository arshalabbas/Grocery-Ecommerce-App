import { colors, icons } from "@/constants";
import { Image, ImageSource } from "expo-image";
import { Tabs, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

interface TabBarIconProps {
  label: string;
  focused: boolean;
  color: string;
  icon: {
    active: ImageSource;
    inactive: ImageSource;
  };
}

const TabBarIcon = ({ label, focused, color, icon }: TabBarIconProps) => {
  return (
    <View className="items-center">
      <View className="aspect-square w-6">
        <Image
          className="h-full w-full"
          contentFit="contain"
          source={focused ? icon.active : icon.inactive}
        />
      </View>
      <Text className="mt-1 font-pmedium text-[10px]" style={{ color }}>
        {label}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const segments = useSegments();

  const hiddenTabsScreens = ["location", "profile"];

  // useEffect(() => {
  //   console.log(segments[2]);
  // }, [segments]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor: colors.secondary.DEFAULT,
        tabBarStyle: {
          display: segments[2] && segments[2] === "profile" ? "none" : "flex",
          height: 75,
          elevation: 0,
          borderTopWidth: 0.5,
        },
        headerStyle: {
          borderBottomWidth: 0.5,
          elevation: 0,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: colors.secondary.DEFAULT,
          fontFamily: "Poppins-SemiBold",
          fontSize: 22,
          includeFontPadding: false,
          textAlignVertical: "center",
        },
        headerTitleContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              label="Home"
              icon={icons.home}
              focused={focused}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      {/* Wishlist Tab */}
      <Tabs.Screen
        name="wishlist/index"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              label="Wishlist"
              icon={icons.wishlist}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      {/* Orders Tab */}
      <Tabs.Screen
        name="orders/index"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              label="Orders"
              icon={icons.orders}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
