import {
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props
  extends PressableProps,
    VariantProps<typeof buttonContainerStyles> {
  title: string;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
}

const Button = ({ title, variant, containerStyles, ...props }: Props) => {
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
      <Text className={cn(buttonTextStyles({ variant }))}>{title}</Text>
    </AnimatedPressable>
  );
};

export default Button;

const buttonContainerStyles = cva(
  "w-full items-center justify-center rounded-xl p-3 shadow-md shadow-neutral-400/70", // Base styles
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
        "solid-primary": "text-secondary",
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
