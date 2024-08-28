import { colors, icons } from "@/constants";
import { Image, ImageSource } from "expo-image";
import { Tabs } from "expo-router";
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
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor: colors.secondary.DEFAULT,
        tabBarStyle: {
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
        name="home/index"
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
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              label="Profile"
              icon={icons.profile}
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
