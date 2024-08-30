import { Image, ImageSource } from "expo-image";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props {
  icon: {
    active: ImageSource;
    inactive: ImageSource;
  };
  value: boolean;
}

const IconRadioButton = ({ icon, value }: Props) => {
  const [active, setActive] = useState(false);

  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 }),
    ),
    4,
  );

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }),
    [active],
  );

  const onPress = () => {
    setActive((prev) => !prev);
    Haptics.selectionAsync();
  };

  return (
    <TouchableOpacity className="aspect-square w-6" onPress={onPress}>
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
