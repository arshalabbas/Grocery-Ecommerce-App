import React from "react";
import { Stack } from "expo-router";

const CartLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="order-success" />
    </Stack>
  );
};

export default CartLayout;
