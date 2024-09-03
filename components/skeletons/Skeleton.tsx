import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";

interface Props extends ViewProps {
  order?: number;
}

const Skeleton = ({ style, children, order = 0, ...props }: Props) => {
  const opacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withDelay(
      order * 200,
      withRepeat(
        withTiming(1, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      ),
    );
  }, [opacity, order]);

  return (
    <Animated.View
      className="bg-primary-200"
      style={[animatedStyle, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default Skeleton;
