import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InputField from "@/components/form/InputFeld";
import { Image } from "expo-image";
import { images } from "@/constants";
import Button from "@/components/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import { formatTime } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { validateCode } from "@/lib/api/login.api";
import { useAuth } from "@/stores/useAuthStore";

const Verification = () => {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [timer, setTimer] = useState(30 * 1000);
  const signIn = useAuth((state) => state.signIn);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1000);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(
      z.object({
        code: z.string().min(4, "Code should be 4 digits"),
        // TODO: Regex validation
      }),
    ),
  });

  const validateCodeMutation = useMutation({
    mutationFn: validateCode,
  });

  const onSubmit = ({ code }: { code: string }) => {
    // FIX IT: Verify OTP and navigate to onboarding
    validateCodeMutation.mutate(
      { phone, code },
      {
        onSuccess: (data) => {
          console.log(data);
          if (data.token) {
            signIn(data.token);
          }
          // TODO: Navigate to onboarding screen
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
    console.log("CODE", code, "PHONE", phone);
  };

  const resendCode = () => {
    // TODO: Request new OTP
    console.log("Resend code");
    setTimer(30 * 1000);
  };

  return (
    <View className="flex-1 items-center justify-center bg-black/40 p-5">
      <View className="w-full overflow-hidden rounded-xl bg-background">
        <Image
          transition={300}
          source={images.verificationBanner}
          className="aspect-[16/8] w-full"
          contentFit="cover"
        />
        <View className="items-center p-5">
          <Text className="font-pbold text-2xl">OTP Verfication</Text>
          <Controller
            control={control}
            name="code"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputField
                label="Code"
                containerStyle="mt-4"
                placeholder="0000"
                keyboardType="number-pad"
                maxLength={4}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.code && errors.code.message}
              />
            )}
          />

          {timer > 0 ? (
            <View className="p-2">
              <Animated.Text entering={BounceIn} className="font-pmedium">
                {formatTime(timer)}
              </Animated.Text>
            </View>
          ) : (
            <TouchableOpacity className="p-2" onPress={resendCode}>
              <Animated.Text
                entering={BounceIn}
                className="font-pmedium"
                exiting={BounceOut}
              >
                Resend OTP
              </Animated.Text>
            </TouchableOpacity>
          )}
          <Button
            variant={"solid-secondary"}
            title="Verify"
            containerStyles={{ marginTop: 20 }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default Verification;
