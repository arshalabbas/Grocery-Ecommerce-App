import { View, ScrollView } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  addressSchema,
  AddressSchema,
} from "@/lib/validation/address.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/stores/useUserStore";
import InputField from "@/components/form/InputFeld";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewAddress } from "@/lib/api/location.api";
import { Address } from "@/types";
import { useRouter } from "expo-router";
import Loading from "@/components/misc/Loading";

const NewAddress = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser((state) => state.user);
  const location = useUser((state) => state.location);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      city: location.city,
      district: location.district,
      pincode: location.postalCode,
      landmark: "",
    },
    resolver: zodResolver(addressSchema),
  });

  const addAddressMutation = useMutation({
    mutationFn: addNewAddress,
  });

  const onSubmit = (values: AddressSchema) => {
    const addressData: Omit<Address, "id"> = {
      name: values.name,
      phone: values.phone,
      alt_phone: values.altPhone || "",
      city_or_town: values.city,
      pin: values.pincode,
      district: values.district,
      landmark: values.landmark,
    };
    addAddressMutation.mutate(addressData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["address"] });
        router.back();
      },
      onError: (error) => {
        console.log("Error adding new address:", error.message);
      },
    });
  };

  return (
    <View className="w-full flex-1">
      <ScrollView
        className="flex-1 p-5"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        {/* Full Name Field */}
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Full Name*"
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              containerStyle="mb-4"
              error={errors.name && errors.name.message}
            />
          )}
        />
        {/* Phone Field */}
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Phone*"
              placeholder="Enter your phone"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone && errors.phone.message}
              containerStyle="mb-4"
            />
          )}
        />
        {/* Alt phone field */}
        <Controller
          control={control}
          name="altPhone"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Alternative Phone"
              placeholder="Enter your phone"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.altPhone && errors.altPhone.message}
            />
          )}
        />
        <Divider />
        <View className="mb-4 w-full flex-row">
          {/* City Field */}
          <Controller
            control={control}
            name="city"
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="City/Town*"
                placeholder="Enter your city"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                containerStyle="flex-[1.5] mr-2"
                error={errors.city && errors.city.message}
              />
            )}
          />
          {/* Pincode Field */}
          <Controller
            control={control}
            name="pincode"
            render={({ field: { value, onChange, onBlur } }) => (
              <InputField
                label="Pin Code*"
                placeholder="0000"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                containerStyle="flex-1 ml-2"
                error={errors.pincode && errors.pincode.message}
              />
            )}
          />
        </View>
        {/* District Field */}
        <Controller
          control={control}
          name="district"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="District*"
              placeholder="Enter your district"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              containerStyle="mb-4"
              error={errors.district && errors.district.message}
            />
          )}
        />
        {/* Landmark Field */}
        <Controller
          control={control}
          name="landmark"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Landmark*"
              placeholder="Eg.: Near apollo hospital"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              containerStyle="mb-4"
              error={errors.landmark && errors.landmark.message}
            />
          )}
        />
        <View className="h-5" />
      </ScrollView>
      <View className="p-5">
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
      <Loading isVisible={addAddressMutation.isPending} />
    </View>
  );
};

export default NewAddress;
