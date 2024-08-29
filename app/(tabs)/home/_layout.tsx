import React from "react";
import { Stack } from "expo-router";

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
    </Stack>
  );
};

export default HomeLayout;
