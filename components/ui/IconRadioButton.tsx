import { Image, ImageSource } from "expo-image";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props extends TouchableOpacityProps {
  icon: {
    active: ImageSource;
    inactive: ImageSource;
  };
  active: boolean;
}

const IconRadioButton = ({ icon, active, ...props }: Props) => {
  const scale = useSharedValue(1);

  if (active) {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 150 }),
        withTiming(1, { duration: 150 }),
      ),
      2,
    );
  }

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [active],
  );

  return (
    <TouchableOpacity className="aspect-square w-6" {...props}>
      <AnimatedImage
        className="h-full w-full"
        source={active ? icon.active : icon.inactive}
        contentFit="contain"
        style={animatedStyle}
      />
    </TouchableOpacity>
  );
};

export default IconRadioButton;
