import { icons } from "@/constants";
import { Image } from "expo-image";
import { Platform } from "react-native";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardAvoidingView,
} from "react-native";
import { twMerge } from "tailwind-merge";

interface Props extends TextInputProps {
  label: string;
  containerStyle?: string;
  error?: string;
}

const PhoneInput = ({ label, containerStyle, error, ...props }: Props) => {
  return (
    <KeyboardAvoidingView
      className={twMerge("w-full", containerStyle)}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="font-pmedium text-lg">{label}</Text>
      <View className="w-full flex-row items-center rounded-xl border-[.5px] border-secondary-muted/50 bg-white px-4">
        <Image
          source={icons.india}
          className="mr-2 h-7 w-7"
          contentFit="contain"
        />
        <TextInput
          className="h-full w-full py-4 font-pregular text-lg"
          style={{ includeFontPadding: false }}
          keyboardType="number-pad"
          maxLength={10}
          textAlignVertical="center"
          {...props}
        />
      </View>
      {error && (
        <Text className="mt-1 font-pmedium text-sm text-danger">{error}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default PhoneInput;
