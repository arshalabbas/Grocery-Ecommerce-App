import { icons } from "@/constants";
import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  onPressBack?: () => void;
  onPressClear?: () => void;
}

const SearchInput = ({
  containerStyles,
  onPressBack,
  onPressClear,
  ...props
}: Props) => {
  return (
    <KeyboardAvoidingView
      className="mt-5 flex-row items-center overflow-hidden rounded-full border-[.5px] border-secondary-muted/50 bg-white"
      style={[containerStyles]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity className="rounded-full p-4" onPress={onPressBack}>
        <Image
          source={icons.arrowLeft}
          className="aspect-square w-5"
          contentFit="contain"
        />
      </TouchableOpacity>
      <TextInput
        className="flex-1 py-3"
        placeholder="Search products..."
        {...props}
      />
      <TouchableOpacity className="rounded-full p-4" onPress={onPressClear}>
        <Image
          source={icons.xmark}
          className="aspect-square w-5"
          contentFit="contain"
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SearchInput;
