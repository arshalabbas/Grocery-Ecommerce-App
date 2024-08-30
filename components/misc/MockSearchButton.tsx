import { icons } from "@/constants";
import { Image } from "expo-image";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  containerStyles?: StyleProp<ViewStyle>;
}

const phrases = ['"milk"', '"biscuit"', '"tomato"'];

const useSlidingAnimation = (phrases: string[], interval: number = 2000) => {
  const [index, setIndex] = useState(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const slideTimeout = setTimeout(() => {
      translateY.value = withTiming(
        -40,
        {
          duration: 200,
          easing: Easing.ease,
        },
        () => {
          runOnJS(setIndex)((index + 1) % phrases.length);
          translateY.value = 40;
          translateY.value = withTiming(0, {
            duration: 200,
            easing: Easing.ease,
          });
        },
      );
    }, interval);

    return () => clearTimeout(slideTimeout);
  }, [index, phrases.length, translateY, interval]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return { currentText: phrases[index], animatedStyles };
};

const MockSearchButton = ({ containerStyles, ...props }: Props) => {
  const scale = useSharedValue<number>(1);
  const { currentText, animatedStyles } = useSlidingAnimation(phrases);

  const onPressIn = () => {
    scale.value = 0.95;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const animatedButtonStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      className="mt-5 flex-row items-center overflow-hidden rounded-full border-[.5px] border-secondary-muted/50 bg-white px-3 py-4"
      {...props}
      style={[animatedButtonStyles, containerStyles]}
    >
      <Image
        source={icons.search}
        className="aspect-square w-5"
        contentFit="contain"
      />
      <View className="flex-row items-center">
        <Text
          className="ml-2 font-pregular text-secondary-muted"
          style={{ includeFontPadding: false, textAlignVertical: "center" }}
        >
          Search for{" "}
        </Text>
        <Animated.Text
          className="font-pmedium text-secondary"
          style={[
            { includeFontPadding: false, textAlignVertical: "center" },
            animatedStyles,
          ]}
        >
          {currentText}
        </Animated.Text>
      </View>
    </AnimatedPressable>
  );
};

export default MockSearchButton;
