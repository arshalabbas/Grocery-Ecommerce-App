import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ProductData } from "@/types";
import CartButton from "../cart/CartButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SearchItemCard = ({
  id,
  title,
  image,
  price,
  fixed_quantity,
  unit,
  stock,
  allowed_limit,
}: ProductData) => {
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
        className="mb-4 w-full flex-row items-center justify-between rounded-lg bg-white px-3 py-5"
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
                ₹{price} • {fixed_quantity}
                {unit}
              </Text>
            </View>
          </View>
        </View>
        <CartButton
          id={id}
          title={title}
          image={image as string}
          price={price}
          unit={unit}
          fixedQuantity={fixed_quantity}
          stock={stock}
          allowedLimit={allowed_limit}
        />
      </AnimatedPressable>
    </Link>
  );
};

export default SearchItemCard;
