import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="search/index" />
      <Stack.Screen name="address" />
      <Stack.Screen
        name="location"
        options={{ animation: "slide_from_bottom", presentation: "modal" }}
      />
    </Stack>
  );
};

export default RootLayout;
