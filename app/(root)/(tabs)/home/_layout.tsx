import React from "react";
import { Stack } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="location"
        options={{
          animation: "slide_from_bottom",
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          header: () => <ScreenHeader title="Profile" />,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
