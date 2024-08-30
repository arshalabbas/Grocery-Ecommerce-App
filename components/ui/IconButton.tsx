import { Image, ImageSource } from "expo-image";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  containerStyles?: StyleProp<ViewStyle>;
  icon: ImageSource;
}

const IconButton = ({ containerStyles, icon, ...props }: Props) => {
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
      className="aspect-square flex-row items-center justify-center rounded-full bg-primary p-3"
      {...props}
      style={[animatedStyles, containerStyles]}
    >
      <Image source={icon} className="aspect-square w-5" contentFit="contain" />
    </AnimatedPressable>
  );
};

export default IconButton;
