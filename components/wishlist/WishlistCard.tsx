import { icons } from "@/constants";
import { WishListItem } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";
import WishlistItemCard from "./WishlistItemCard";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import clsx from "clsx";
import { useRouter } from "expo-router";
import Button from "../ui/Button";
import { useWishlistStore } from "@/stores/useWishlistStore";
import ActionButton from "../ui/ActionButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateManyWishlistItems } from "@/lib/api/wishlist.api";
import Loading from "../misc/Loading";

interface Props {
  id: string;
  title: string;
  itemsLength: number;
  items: WishListItem[];
  totalPrice: number;
}

const WishlistCard = ({ id, title, itemsLength, items, totalPrice }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const hasChanged = useWishlistStore((state) => state.hasChanged);
  const setHasChanged = useWishlistStore((state) => state.setHasChanged);
  const getAllProducts = useWishlistStore((state) => state.getAllProducts);

  const updateAllMutation = useMutation({
    mutationFn: updateManyWishlistItems,
  });

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

  useEffect(() => {
    height.value = itemsLength > 3 ? 300 : itemsLength * 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsLength]);

  const saveHandler = () => {
    updateAllMutation.mutate(
      { id, products: getAllProducts(id) },
      {
        onSuccess: () => {
          setHasChanged(false);
          queryClient.invalidateQueries({ queryKey: ["wishlists"] });
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <View className="mb-4 w-full rounded-xl bg-white">
      {/* Wishlist Header */}
      <View className="w-full flex-row justify-between p-5">
        <View className="flex-1 flex-row space-x-2">
          <View className="rounded-xl bg-primary-200 p-4">
            <Image
              source={icons.wishlist.active}
              className="aspect-square w-6"
              contentFit="contain"
            />
          </View>
          <View className="flex-1">
            <Text
              className="font-psemibold text-lg text-secondary"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="font-pmedium text-secondary-muted">
              {itemsLength} Item{itemsLength > 1 && "s"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="p-1"
          onPress={() =>
            router.push({
              pathname: "/(root)/(modals)/edit-wishlist",
              params: { id },
            })
          }
        >
          <Image
            source={icons.edit}
            className="aspect-square w-4"
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>
      {/* Wishlist Items */}
      <Animated.View className="overflow-hidden" style={animatedStyle}>
        {itemsLength > 0 && (
          <FlashList
            scrollEnabled={false}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <WishlistItemCard
                id={item.product.id}
                wishlistId={id}
                image={item.product.image}
                title={item.product.title}
                quantity={item.quantity}
                totalPrice={item.total_price}
                unit={item.product.unit}
              />
            )}
            estimatedItemSize={100}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
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
        {itemsLength > 0 && (
          <View>
            {hasChanged ? (
              <ActionButton
                title="Save changes"
                iconLeft={icons.save}
                onPress={saveHandler}
              />
            ) : (
              <Button
                title="Order"
                size={"md"}
                width={"no-width"}
                rounded={"xl"}
              />
            )}
          </View>
        )}
      </View>
      <Loading isVisible={updateAllMutation.isPending} />
    </View>
  );
};

export default WishlistCard;
