import InputField from "@/components/form/InputFeld";
import Button from "@/components/ui/Button";
import { updateUser } from "@/lib/api/user.api";
import onBoadingSchema, {
  OnboardingSchema,
} from "@/lib/validation/onboardin.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingSchema>({
    defaultValues: {
      name: "",
      email: "",
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
        router.replace("/(tabs)/home");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="font-pbold text-2xl text-secondary">Onboarding</Text>
      <Text className="font-pmedium text-secondary-muted">
        One last step to use the app!
      </Text>
      <View className="flex-1 justify-between">
        <View className="mt-5">
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
        </View>
        <Button
          title="Finish"
          containerStyles={{ marginBottom: 20 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Onboarding;
