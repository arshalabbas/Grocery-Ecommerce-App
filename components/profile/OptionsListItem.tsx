import { colors } from "@/constants";
import { Image, ImageSource } from "expo-image";
import { Text, Pressable, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  title: string;
  icon?: ImageSource;
}

const OptionsListItem = ({ title, icon, ...props }: Props) => {
  const scale = useSharedValue<number>(1);

  const onPressIn = () => {
    scale.value = 0.95;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));
  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="flex-row items-center space-x-3 py-2"
      style={animatedStyles}
      {...props}
    >
      {icon && (
        <Image
          source={icon}
          className="aspect-square w-6"
          contentFit="contain"
          tintColor={colors.primary.DEFAULT}
        />
      )}
      <Text
        className="font-pmedium"
        style={{ textAlignVertical: "center", includeFontPadding: false }}
      >
        {title}
      </Text>
    </AnimatedPressable>
  );
};

export default OptionsListItem;
