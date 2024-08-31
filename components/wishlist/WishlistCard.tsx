import { icons } from "@/constants";
import { WishListItem } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";
import WishlistItemCard from "./WishlistItemCard";
import { useState } from "react";
import ActionButton from "../ui/ActionButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import clsx from "clsx";

interface Props {
  title: string;
  itemsLength: number;
  items: WishListItem[];
  totalPrice: number;
}

const WishlistCard = ({ title, itemsLength, items, totalPrice }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const initialHeight = itemsLength > 3 ? 300 : itemsLength * 100;

  const height = useSharedValue(initialHeight);

  const maxHeight = itemsLength * 100;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 300 }),
    };
  });

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    height.value = expanded ? 300 : maxHeight;
  };

  return (
    <View className="mb-4 w-full rounded-xl bg-white">
      {/* Wishlist Header */}
      <View className="w-full flex-row space-x-4 p-5">
        <View className="rounded-xl bg-primary-200 p-4">
          <Image
            source={icons.wishlist.active}
            className="aspect-square w-6"
            contentFit="contain"
          />
        </View>
        <View>
          <Text className="font-psemibold text-xl text-secondary">{title}</Text>
          <Text className="font-pmedium text-secondary-muted">
            {itemsLength} Item{itemsLength > 1 && "s"}
          </Text>
        </View>
      </View>
      {/* Wishlist Items */}
      <Animated.View className="overflow-hidden" style={animatedStyle}>
        <FlashList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WishlistItemCard
              image={item.product.image}
              title={item.product.title}
              quantity={item.quantity}
              unit={item.product.unit}
            />
          )}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </Animated.View>

      {items.length > 3 && (
        <TouchableOpacity
          className="w-full items-center pb-4"
          onPress={toggleExpand}
        >
          <Image
            source={icons.angleDown}
            className={clsx("aspect-square w-6", { "rotate-180": expanded })}
            contentFit="contain"
          />
        </TouchableOpacity>
      )}
      <View className="w-full flex-row items-center justify-between px-5 pb-5">
        <Text className="font-pbold text-2xl">₹{totalPrice}</Text>
        <ActionButton title="Order" />
      </View>
    </View>
  );
};

export default WishlistCard;
