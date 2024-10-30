import { View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";
import Button from "@/components/ui/Button";
import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/form/InputFeld";
import onBoadingSchema, {
  OnboardingSchema,
} from "@/lib/validation/onboardin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/stores/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/user.api";
import Loading from "@/components/misc/Loading";

const EditProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser((state) => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingSchema>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: zodResolver(onBoadingSchema),
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
  });

  const onSubmit = (values: OnboardingSchema) => {
    updateUserMutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.back();
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <View className="flex-1 bg-background p-5">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader title="Edit Profile" />,
        }}
      />
      {/* Name Field */}
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
            error={errors.name && errors.name.message}
          />
        )}
      />
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            containerStyle="mt-5"
            error={errors.email && errors.email.message}
          />
        )}
      />
      <Button
        title="Save"
        containerStyles={{ marginTop: 20 }}
        onPress={handleSubmit(onSubmit)}
        disabled={updateUserMutation.isPending}
      />
      <Loading isVisible={updateUserMutation.isPending} />
    </View>
  );
};

export default EditProfile;
