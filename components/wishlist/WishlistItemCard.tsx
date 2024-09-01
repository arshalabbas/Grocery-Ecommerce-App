import { Image, ImageSource } from "expo-image";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
  image: ImageSource;
  title: string;
  quantity: number;
  unit: string;
}

const WishlistItemCard = ({ id, image, title, quantity, unit }: Props) => {
  const scale = useSharedValue<number>(1);

  const onPressIn = () => {
    scale.value = 0.975;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));

  return (
    <Link href={`/(root)/product/${id}`} asChild>
      <AnimatedPressable
        className="mb-4 w-full rounded-lg bg-background px-3 py-5"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="flex-row space-x-5">
          <Image
            source={image}
            className="aspect-square w-10 rounded-lg"
            contentFit="contain"
          />
          <View>
            <View className="flex-1">
              <Text className="font-pmedium text-secondary" numberOfLines={1}>
                {title}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                {quantity} {unit}
              </Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    </Link>
  );
};

export default WishlistItemCard;
