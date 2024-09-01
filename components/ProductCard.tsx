import { Image, ImageSource } from "expo-image";
import { View, Text, Pressable } from "react-native";
import { icons } from "@/constants";
import IconButton from "./ui/IconButton";
import IconRadioButton from "./ui/IconRadioButton";
import Animated, {
  LightSpeedInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Link, useRouter } from "expo-router";
import { memo } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
  image: ImageSource;
  title: string;
  unit: string;
  price: number;
  badgeText?: string;
  hasWishlisted: boolean;
}

const ProductCard = ({
  id,
  image,
  title,
  unit,
  price,
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
        className="m-1 min-h-[230px] flex-1 items-center justify-between overflow-hidden rounded-lg bg-white p-2"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="w-full items-end">
          <IconRadioButton
            icon={icons.heart}
            active={hasWishlisted}
            onPress={() =>
              router.push({
                pathname: "/(root)/(modals)/add-wishlist-item",
                params: { id, title, image: image as string },
              })
            }
          />
        </View>
        <Image
          source={image}
          contentFit="contain"
          className="aspect-square w-[100px]"
        />
        <View className="w-full flex-row justify-between">
          <View className="flex-1 pr-3">
            <Text
              className="font-pregular text-sm"
              numberOfLines={1}
              style={{ includeFontPadding: false, textAlignVertical: "bottom" }}
            >
              {title}
            </Text>
            <Text className="font-pmedium">
              ₹{price}/{unit}
            </Text>
          </View>
          <IconButton icon={icons.bag} />
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
