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
const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ phone: string }>({
    resolver: zodResolver(
      z.object({
        phone: z.string().length(10, "Enter valid phone number."),
      }),
    ),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = ({ phone }: { phone: string }) => {
    // TODO: Request OTP
    router.push({ pathname: "/(auth)/verification", params: { phone } });
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
                containerStyle="mt-5"
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
      <StatusBar style="dark" />
    </ScrollView>
  );
};

export default Login;
