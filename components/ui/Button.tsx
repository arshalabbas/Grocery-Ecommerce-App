import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Animated, {
  BounceIn,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image, ImageSource } from "expo-image";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);

interface Props
  extends PressableProps,
    VariantProps<typeof buttonContainerStyles> {
  title: string;
  icon?: ImageSource;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const Button = ({ title, variant, icon, containerStyles, ...props }: Props) => {
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
      className={cn(buttonContainerStyles({ variant }))}
      {...props}
      style={[animatedStyles, containerStyles]}
    >
      {icon && (
        <View className="overflow-hidden">
          <AnimatedImage
            entering={FadeInRight.delay(500)}
            source={icon}
            className="mr-1 aspect-square w-5"
            contentFit="contain"
          />
        </View>
      )}
      <Animated.Text
        entering={BounceIn}
        className={cn(buttonTextStyles({ variant }))}
        style={{ includeFontPadding: false, textAlignVertical: "center" }}
      >
        {title}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default Button;

const buttonContainerStyles = cva(
  "flex-row w-full items-center justify-center rounded-xl p-3 shadow-md shadow-neutral-400/70", // Base styles
  {
    variants: {
      variant: {
        "solid-primary": "bg-primary",
        "solid-secondary": "bg-secondary",
        "outline-primary": "border border-primary",
        "outline-secondary": "border border-secondary",
        "solid-white": "border-[0.5px] border-secondary-muted/50 bg-white",
      },
      rounded: {
        pill: "rounded-full",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "solid-primary",
      rounded: "pill",
    },
  },
);

const buttonTextStyles = cva(
  "text-lg font-pbold", // Base styles
  {
    variants: {
      variant: {
        "solid-primary": "text-white",
        "solid-secondary": "text-white",
        "outline-primary": "text-primary",
        "outline-secondary": "text-secondary",
        "solid-white": "text-secondary/80 font-psemibold",
      },
    },
    defaultVariants: {
      variant: "solid-primary",
    },
  },
);
