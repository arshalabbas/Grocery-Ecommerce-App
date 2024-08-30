import { Image, ImageSource } from "expo-image";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  title: string;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  iconLeft?: ImageSource;
  iconRight?: ImageSource;
}

const ActionButton = ({
  title,
  containerStyles,
  iconLeft,
  iconRight,
  ...props
}: Props) => {
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
      className="flex-row items-center justify-center rounded-full bg-secondary px-3 py-2"
      {...props}
      style={[animatedStyles, containerStyles]}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          className="mr-1 aspect-square w-4"
          contentFit="contain"
        />
      )}
      <Text
        className="font-pregular text-white"
        style={{ includeFontPadding: false }}
      >
        {title}
      </Text>
      {iconRight && (
        <Image
          source={iconRight}
          className="ml-1 aspect-square w-4"
          contentFit="contain"
        />
      )}
    </AnimatedPressable>
  );
};

export default ActionButton;
