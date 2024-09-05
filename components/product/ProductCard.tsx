import { Image, ImageSource } from "expo-image";
import { View, Text, Pressable } from "react-native";
import { icons } from "@/constants";
import IconRadioButton from "@/components/ui/IconRadioButton";
import Animated, {
  LightSpeedInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Link, useRouter } from "expo-router";
import { memo } from "react";
import * as Haptics from "expo-haptics";
import ProductCartButton from "@/components/cart/ProductCartButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
  image: ImageSource;
  title: string;
  unit: string;
  price: number;
  fixedQuantity: number;
  mrp: number;
  badgeText?: string;
  hasWishlisted: boolean;
}

const ProductCard = ({
  id,
  image,
  title,
  unit,
  price,
  mrp,
  fixedQuantity,
  badgeText,
  hasWishlisted,
}: Props) => {
  const router = useRouter();
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
        className="m-1 min-h-[240px] flex-1 items-center justify-between overflow-hidden rounded-lg bg-white p-2"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="w-full items-end">
          <IconRadioButton
            icon={icons.heart}
            active={hasWishlisted}
            onPress={() => {
              Haptics.selectionAsync();
              router.push({
                pathname: "/(root)/(modals)/add-wishlist-item",
                params: { id, title, image: image as string },
              });
            }}
          />
        </View>
        <Image
          source={image}
          contentFit="contain"
          transition={300}
          className="aspect-square w-[100px]"
        />
        <View className="mt-4 w-full">
          <Text
            className="w-full font-pmedium text-sm"
            numberOfLines={1}
            style={{ includeFontPadding: false, textAlignVertical: "bottom" }}
          >
            {title}
          </Text>
          <Text
            className="w-full font-pmedium text-xs text-secondary-muted"
            style={{ includeFontPadding: false, textAlignVertical: "bottom" }}
          >
            {fixedQuantity} {unit}
          </Text>
        </View>

        <View className="w-full flex-1 flex-row items-end justify-between">
          <View className="mr-1 flex-1 flex-row flex-wrap items-center space-x-1">
            <Text className="font-psemibold text-lg">₹{price}</Text>
            <Text className="font-pmedium text-xs text-secondary-muted line-through">
              ₹{mrp}
            </Text>
          </View>
          <ProductCartButton
            id={id}
            image={image}
            price={price}
            title={title}
            unit={unit}
          />
        </View>
        {badgeText && (
          <Animated.View
            entering={LightSpeedInLeft.duration(200).delay(300)}
            className="absolute left-0 top-0 rounded-br-lg bg-secondary p-2"
          >
            <Text
              className="font-psemibold text-xs text-white"
              style={{ includeFontPadding: false, textAlignVertical: "center" }}
            >
              {badgeText}
            </Text>
          </Animated.View>
        )}
      </AnimatedPressable>
    </Link>
  );
};

export default memo(ProductCard);
