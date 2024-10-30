import React from "react";
import { Stack } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";

const AddressLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <ScreenHeader title="Addresses" />,
        }}
      />
      <Stack.Screen
        name="new-address"
        options={{
          header: () => <ScreenHeader title="New Address" />,
        }}
      />
      <Stack.Screen
        name="edit-address"
        options={{
          header: () => <ScreenHeader title="Edit Address" />,
        }}
      />
    </Stack>
  );
};

export default AddressLayout;
