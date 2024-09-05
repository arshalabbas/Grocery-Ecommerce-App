import React, { useEffect, useState } from "react";
import { TextProps, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface CountTextProps extends TextProps {
  count: number;
  prefix?: string | number;
  suffix?: string | number;
  duration?: number;
}

const CountText = ({
  count,
  prefix,
  suffix,
  duration = 150,
  ...props
}: CountTextProps) => {
  const [displayedCount, setDisplayedCount] = useState(count);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (count === displayedCount) return;
    if (count > displayedCount) {
      // Animate out the old number upwards (for increasing count)
      translateY.value = withTiming(-50, {
        duration: duration,
        easing: Easing.ease,
      });
    } else {
      // Animate out the old number downwards (for decreasing count)
      translateY.value = withTiming(50, {
        duration: duration,
        easing: Easing.ease,
      });
    }

    const timeout = setTimeout(() => {
      setDisplayedCount(count);
      translateY.value = count > displayedCount ? 50 : -50;
      translateY.value = withTiming(0, {
        duration: duration,
        easing: Easing.ease,
      });
    }, duration);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View className="flex-row items-center overflow-hidden">
      {prefix && <Text style={props.style}>{prefix}</Text>}
      <Animated.Text style={[animatedStyle, props.style]}>
        {displayedCount}
      </Animated.Text>
      {suffix && (
        <Text className="ml-1" style={props.style}>
          {suffix}
        </Text>
      )}
    </View>
  );
};

export default CountText;
