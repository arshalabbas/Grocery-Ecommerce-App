import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CountButton from "../ui/CountButton";
import { useCartStore } from "@/stores/useCartStore";
import * as Haptics from "expo-haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
}

const CartItemCard = ({ id }: Props) => {
  const cartProduct = useCartStore((state) => state.products).find(
    (item) => item.id === id,
  );
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

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

  const incrementCount = () => {
    Haptics.selectionAsync();
    incrementQuantity(id, false);
  };

  const decrementCount = () => {
    Haptics.selectionAsync();
    decrementQuantity(id, false);
  };

  return (
    <Link href={`/(root)/product/${id}`} asChild>
      <AnimatedPressable
        className="mb-4 w-full flex-row items-center justify-between rounded-lg bg-white px-3 py-5"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="flex-1 flex-row space-x-5">
          <Image
            source={cartProduct?.image}
            className="aspect-square w-10 rounded-lg"
            contentFit="contain"
          />
          <View className="flex-1 pr-2">
            <View className="flex-1">
              <Text className="font-pmedium text-secondary" numberOfLines={1}>
                {cartProduct?.title}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                ₹{cartProduct?.quantity! * cartProduct?.price!} •{" "}
                {cartProduct?.quantity} {cartProduct?.unit}
              </Text>
            </View>
          </View>
        </View>
        <CountButton
          count={cartProduct?.quantity || 0}
          onIncrementCount={incrementCount}
          onDecrementCount={decrementCount}
        />
      </AnimatedPressable>
    </Link>
  );
};

export default CartItemCard;
