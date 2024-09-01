import ActionButton from "@/components/ui/ActionButton";
import WishlistCard from "@/components/wishlist/WishlistCard";
import { icons } from "@/constants";
import { getWishlist } from "@/lib/api/wishlist.api";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
import { Text, View } from "react-native";

const WishList = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  return (
    <View className="flex-1">
      <Tabs.Screen
        options={{
          headerRight: () => (
            <ActionButton
              title="New List"
              iconLeft={icons.plus}
              onPress={() => router.push("/(root)/(modals)/new-wishlist")}
            />
          ),
          headerRightContainerStyle: {
            marginRight: 20,
          },
        }}
      />
      <View className="flex-1">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <WishlistCard
              title={item.title}
              itemsLength={item.number_of_items}
              items={item.items}
              totalPrice={item.total_price}
            />
          )}
          ListEmptyComponent={() => (
            <View className="mt-5 w-full flex-1 items-center">
              <Text className="mb-5 font-pmedium text-secondary">
                You haven't created a wishlist.
              </Text>
              <ActionButton
                title="Create wishlist"
                iconLeft={icons.plus}
                onPress={() => router.push("/(root)/(modals)/new-wishlist")}
              />
            </View>
          )}
          estimatedItemSize={250}
          contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 8 }}
        />
      </View>
    </View>
  );
};

export default WishList;
