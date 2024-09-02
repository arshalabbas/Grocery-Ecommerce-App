import Loading from "@/components/misc/Loading";
import ActionButton from "@/components/ui/ActionButton";
import IconRadioButton from "@/components/ui/IconRadioButton";
import { icons } from "@/constants";
import { addToWishlist, getWishlists } from "@/lib/api/wishlist.api";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import AddtoWislistSkeleton from "@/components/skeletons/AddtoWislistSkeleton";

const AddWishListItem = () => {
  const queryClient = useQueryClient();
  const { id, title, image } = useLocalSearchParams<{
    id: string;
    title: string;
    image: string;
  }>();
  const { district } = useUser((state) => state.location);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlists", district],
    queryFn: () => getWishlists({ district }),
  });

  const addItemMutation = useMutation({
    mutationFn: addToWishlist,
  });

  const onPressWishListCard = (wishlistId: string, hasWishlistd: boolean) => {
    Haptics.selectionAsync();
    addItemMutation.mutate(
      { id: wishlistId, productId: id, quantity: hasWishlistd ? 0 : 1 },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });
          queryClient.invalidateQueries({
            queryKey: ["wishlists"],
          });
        },
      },
    );
  };

  return (
    <View className="flex-1 justify-end bg-black/20">
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
      <View className="h-2/3 w-full rounded-t-3xl bg-background p-5">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <Image
              source={image}
              className="aspect-square w-16 rounded-lg"
              contentFit="contain"
            />
            <View>
              <Text className="font-pbold text-lg text-secondary">{title}</Text>
              <Text className="font-pmedium text-xs text-secondary-muted">
                Save to wishlist
              </Text>
            </View>
          </View>
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Image
              source={icons.xmark}
              className="aspect-square w-6"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Wishlists */}
        <FlashList
          data={data}
          renderItem={({ item }) => {
            const hasWishlisted = item.items.find(
              (item) => item.product.id === id,
            )
              ? true
              : false;
            return (
              <TouchableOpacity
                className="my-2 w-full flex-row items-center justify-between"
                onPress={() => onPressWishListCard(item.id, hasWishlisted)}
              >
                <View className="flex-row items-center space-x-4">
                  <View className="rounded-xl bg-primary-200 p-3">
                    <Image
                      source={icons.wishlist.active}
                      className="aspect-square w-5"
                      contentFit="contain"
                    />
                  </View>
                  <Text className="flex-1 font-psemibold text-secondary">
                    {item.title}
                  </Text>
                </View>
                <View className="absolute right-0 flex-row items-center space-x-2">
                  <Text className="font-pmedium text-secondary-muted">
                    {item.number_of_items} items
                  </Text>
                  <IconRadioButton
                    icon={icons.heart}
                    active={hasWishlisted}
                    disabled
                  />
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            if (isLoading) return <AddtoWislistSkeleton />;
            return (
              <View className="mt-5 w-full flex-1 items-center">
                <Text className="mb-5 font-pmedium text-secondary">
                  You haven't created a wishlist.
                </Text>
              </View>
            );
          }}
          ListFooterComponent={() => (
            <View className="mt-5 w-full flex-row justify-center">
              <ActionButton
                title="Create wishlist"
                iconLeft={icons.plus}
                onPress={() => router.push("/(root)/(modals)/new-wishlist")}
              />
            </View>
          )}
          estimatedItemSize={70}
        />
      </View>
      <View className="w-full flex-row items-center justify-center space-x-2 bg-background py-2">
        <Image
          className="aspect-square w-6"
          source={icons.info}
          contentFit="contain"
        />
        <Text className="font-pmedium text-sm text-secondary-muted">
          Wishlists are saved per district.
        </Text>
      </View>
      <Loading isVisible={addItemMutation.isPending} />
    </View>
  );
};

export default AddWishListItem;
