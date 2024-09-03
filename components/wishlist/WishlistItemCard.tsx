import { Image, ImageSource } from "expo-image";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CountButton from "../ui/CountButton";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useEffect } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
  wishlistId: string;
  image: ImageSource;
  title: string;
  quantity: number;
  totalPrice: number;
  unit: string;
}

const WishlistItemCard = ({
  id,
  wishlistId,
  image,
  title,
  quantity,
  totalPrice,
  unit,
}: Props) => {
  // states
  const incrementQuantity = useWishlistStore(
    (state) => state.incrementQuantity,
  );
  const decrementQuantity = useWishlistStore(
    (state) => state.decrementQuantity,
  );
  const quantityCount = useWishlistStore(
    (state) => state.quantities[wishlistId]?.[id] || 0,
  );

  const setQuantity = useWishlistStore((state) => state.setQuantity);
  const clearWishlistProducts = useWishlistStore(
    (state) => state.clearWishlistProducts,
  );

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

  useEffect(() => {
    clearWishlistProducts(wishlistId);
    setQuantity(wishlistId, id, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const incrementCount = () => {
    incrementQuantity(wishlistId, id);
  };

  const decrementCount = () => {
    decrementQuantity(wishlistId, id);
  };

  return (
    <Link href={`/(root)/product/${id}`} asChild>
      <AnimatedPressable
        className="mb-4 w-full flex-row items-center justify-between rounded-lg bg-background px-3 py-5"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="flex-1 flex-row space-x-5">
          <Image
            source={image}
            className="aspect-square w-10 rounded-lg"
            contentFit="contain"
          />
          <View className="flex-1 pr-2">
            <View className="flex-1">
              <Text className="font-pmedium text-secondary" numberOfLines={1}>
                {title}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                ₹{totalPrice} • {quantity} {unit}
              </Text>
            </View>
          </View>
        </View>
        <CountButton
          count={quantityCount}
          onIncrementCount={incrementCount}
          onDecrementCount={decrementCount}
        />
      </AnimatedPressable>
    </Link>
  );
};

export default WishlistItemCard;
