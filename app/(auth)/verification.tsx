import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InputField from "@/components/form/InputFeld";
import { Image } from "expo-image";
import { images } from "@/constants";
import Button from "@/components/ui/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const Verification = () => {
  const { phone } = useLocalSearchParams();

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
      }),
    ),
  });

  const onSubmit = ({ code }: { code: string }) => {
    // TODO: Verify OTP and navigate to dashboard
    console.log("CODE", code, "PHONE", phone);
  };

  const resendCode = () => {
    // TODO: Request new OTP
    console.log("Resend code");
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

          <TouchableOpacity className="p-2" onPress={resendCode}>
            <Text>Resend OTP</Text>
          </TouchableOpacity>
          <Button
            variant={"solid-secondary"}
            title="Verify"
            containerStyles={{ marginTop: 20 }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

export default Verification;
