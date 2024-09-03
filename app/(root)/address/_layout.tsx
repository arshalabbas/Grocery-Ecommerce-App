import React from "react";
import { Stack } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";

const AddressLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="new-address"
        options={{
          header: () => <ScreenHeader title="New Address" />,
        }}
      />
    </Stack>
  );
};

export default AddressLayout;
