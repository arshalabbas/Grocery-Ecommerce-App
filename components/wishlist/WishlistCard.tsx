import { icons } from "@/constants";
import { WishListItem } from "@/types";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import WishlistItemCard from "./WishlistItemCard";

interface Props {
  title: string;
  itemsLength: number;
  items: WishListItem[];
}

const WishlistCard = ({ title, itemsLength, items }: Props) => {
  return (
    <View className="w-full rounded-xl bg-white">
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
      <FlashList
        data={items}
        renderItem={({ item }) => (
          <WishlistItemCard
            image={item.image}
            title={item.product.title}
            quantity={item.quantity}
            unit={item.product.unit}
          />
        )}
        estimatedItemSize={100}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default WishlistCard;
