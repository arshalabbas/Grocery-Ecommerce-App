import ActionButton from "@/components/ui/ActionButton";
import WishlistCard from "@/components/wishlist/WishlistCard";
import { icons } from "@/constants";
import { getWishlist } from "@/lib/api/wishlist.api";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { View } from "react-native";

const WishList = () => {
  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  return (
    <View className="flex-1 p-5">
      <Tabs.Screen
        options={{
          headerRight: () => (
            <ActionButton title="New List" iconLeft={icons.plus} />
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
      />
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <WishlistCard
            title={item.title}
            itemsLength={item.number_of_items}
            items={item.items}
          />
        )}
        estimatedItemSize={250}
      />
    </View>
  );
};

export default WishList;
