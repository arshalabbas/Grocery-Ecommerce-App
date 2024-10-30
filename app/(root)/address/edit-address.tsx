import InputField from "@/components/form/InputFeld";
import Loading from "@/components/misc/Loading";
import ActionButton from "@/components/ui/ActionButton";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import IconButton from "@/components/ui/IconButton";
import { colors, icons } from "@/constants";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/lib/api/location.api";
import {
  addressSchema,
  AddressSchema,
} from "@/lib/validation/address.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, ScrollView } from "react-native";

const EditAddress = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["address", id],
    queryFn: () => getAddress({ id: id! }),
    enabled: id !== undefined,
  });

  // Update address mutation
  const updateAddressMutation = useMutation({
    mutationFn: updateAddress,
  });

  // Delete address mutation
  const deleteAddressMutation = useMutation({
    mutationFn: deleteAddress,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressSchema>({
    defaultValues: {
      name: "",
      phone: "",
      altPhone: "",
      city: "",
      district: "",
      pincode: "",
      landmark: "",
    },
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("name", data?.name);
      setValue("phone", data?.phone);
      setValue("altPhone", data?.alt_phone);
      setValue("city", data?.city_or_town);
      setValue("district", data?.district);
      setValue("pincode", data?.pin);
      setValue("landmark", data?.landmark);
    }
  }, [isSuccess, data, setValue]);

  const onSubmit = (values: AddressSchema) => {
    updateAddressMutation.mutate(
      { id, values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["address"],
          });

          router.back();
        },
      },
    );
  };

  const onDelete = () => {
    deleteAddressMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["address"] });
          router.back();
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-background">
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
      <View className="flex-row items-center justify-between space-x-2 p-5">
        <View className="flex-1">
          <Button
            title="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || updateAddressMutation.isPending}
          />
        </View>
        <View>
          <IconButton
            icon={icons.trash}
            containerStyles={{ backgroundColor: colors.danger }}
            onPress={onDelete}
          />
        </View>
      </View>
      <Loading
        isVisible={
          isLoading ||
          updateAddressMutation.isPending ||
          deleteAddressMutation.isPending
        }
      />
    </View>
  );
};

export default EditAddress;
