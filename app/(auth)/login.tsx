import PhoneInput from "@/components/form/PhoneInput";
import Button from "@/components/ui/Button";
import { images } from "@/constants";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { requestVerificationCode } from "@/lib/api/login.api";
import Loading from "@/components/misc/Loading";
import { useState } from "react";
import { formatTimeInWords } from "@/lib/utils";
import ShakyError from "@/components/misc/ShakyError";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ phone: string }>({
    resolver: zodResolver(
      z.object({
        phone: z.string().length(10, "Enter valid phone number."),
        // TODO: Regex validation
      }),
    ),
    defaultValues: {
      phone: "",
    },
  });

  const requestCodeMutation = useMutation({
    mutationFn: requestVerificationCode,
  });

  const onSubmit = ({ phone }: { phone: string }) => {
    setError("");
    requestCodeMutation.mutate(
      { phone },
      {
        onSuccess: (data) => {
          console.log(data); // REVIEW: Dont remove this
          const otpCreatedTime = data.created_time!;
          const now = Date.now();

          if (now - otpCreatedTime > 600000) {
            setError(
              "Your OTP limit exceeded. Try again after " +
                formatTimeInWords(data.time!),
            );
            return;
          }

          router.push({
            pathname: "/(auth)/verification",
            params: { phone, time: data.time },
          });
        },
        onError: (error) => {
          console.log(error);
          if (error.status === 400) {
            setError(error.data.message);
          }
        },
      },
    );
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <Image
        contentFit="cover"
        source={images.loginBanner}
        className="aspect-square w-full rotate-180"
      />
      <View className="w-full flex-1 justify-between p-5">
        {/* Login Form */}
        <Text className="w-4/5 font-pbold text-2xl">
          Get your Groceries with us!
        </Text>
        {error !== "" && <ShakyError>{error}</ShakyError>}
        <View className="w-full items-center">
          <Controller
            control={control}
            name="phone"
            render={({ field: { onBlur, onChange, value } }) => (
              <PhoneInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Phone"
                placeholder="Enter your phone"
                containerStyle="mt-2"
                error={errors.phone && errors.phone.message}
              />
            )}
          />
          <Text className="mt-2 w-full font-pregular text-[12px] text-secondary-muted">
            By continuing, you agree to our{" "}
            <Link
              href={"https://google.com"}
              className="text-primary underline"
            >
              Terms of use
            </Link>{" "}
            and{" "}
            <Link
              href={"https://google.com"}
              className="text-primary underline"
            >
              Privacy policy
            </Link>
            .
          </Text>
        </View>
        <Button
          onPress={handleSubmit(onSubmit)}
          title={"Send OTP"}
          containerStyles={{ marginTop: 70 }}
        />
      </View>
      <Loading isVisible={requestCodeMutation.isPending} />
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default Login;
