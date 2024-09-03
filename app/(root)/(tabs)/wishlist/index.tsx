import WishlistSkeleton from "@/components/skeletons/WishlistSkeleton";
import ActionButton from "@/components/ui/ActionButton";
import WishlistCard from "@/components/wishlist/WishlistCard";
import { icons } from "@/constants";
import { getWishlists } from "@/lib/api/wishlist.api";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Tabs, useRouter } from "expo-router";
import { Text, View } from "react-native";

const WishList = () => {
  const router = useRouter();
  const { district } = useUser((state) => state.location);

  const { data, isLoading } = useQuery({
    queryKey: ["wishlists", district],
    queryFn: () => getWishlists({ district }),
  });

  if (isLoading) return <WishlistSkeleton />;

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
          data={data?.toReversed()}
          renderItem={({ item }) => (
            <WishlistCard
              id={item.id}
              title={item.title}
              itemsLength={item.number_of_items}
              items={item.items.toReversed()}
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
          ListFooterComponent={() => (
            <View className="mt-4 w-full flex-row items-center justify-center space-x-2">
              <Image
                className="aspect-square w-6"
                source={icons.info}
                contentFit="contain"
              />
              <Text className="font-pmedium text-sm text-secondary-muted">
                Wishlists are saved per district.
              </Text>
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
