import { Image, ImageSource } from "expo-image";
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
  active: boolean;
  onPress: () => void;
}

const IconRadioButton = ({ icon, active, onPress }: Props) => {
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

  const onPressHandler = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <TouchableOpacity className="aspect-square w-6" onPress={onPressHandler}>
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
