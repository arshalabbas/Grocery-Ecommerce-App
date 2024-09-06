import ActionButton from "@/components/ui/ActionButton";
import { icons } from "@/constants";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import AddtoWislistSkeleton from "@/components/skeletons/AddtoWislistSkeleton";
import { getAllAddresses } from "@/lib/api/location.api";

const SelectAddress = () => {
  const { district } = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["address", district],
    queryFn: () => getAllAddresses({ district }),
  });

  const onPressSavedAddress = (address: {
    id: string;
    postalCode: string;
    place: string;
    city: string;
    district: string;
  }) => {
    Haptics.selectionAsync();
    setLocation({
      id: address.id,
      postalCode: address.postalCode,
      place: address.district,
      city: address.city,
      district: address.district,
    });

    router.back();
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
        <View className="flex-row items-center justify-between">
          <Text className="font-pbold text-xl text-secondary">
            Saved Addresses
          </Text>
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
          data={data?.toReversed()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-4 w-full flex-row items-center space-x-2 rounded-xl bg-white p-4"
              activeOpacity={0.7}
              onPress={() =>
                onPressSavedAddress({
                  id: item.id,
                  postalCode: item.pin,
                  city: item.city_or_town,
                  district: item.district,
                  place: item.city_or_town,
                })
              }
            >
              <Image
                source={icons.location}
                className="aspect-square w-6"
                contentFit="contain"
              />
              <View>
                <Text className="font-pbold text-lg text-secondary">
                  {item.name}
                </Text>
                <Text className="font-psemibold text-xs text-secondary-muted">
                  {item.phone}
                </Text>
                <Text className="font-pmedium text-xs text-secondary-muted">
                  {item.pin} • {item.district}
                </Text>
              </View>
            </TouchableOpacity>
          )}
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
                title="New Address"
                iconLeft={icons.plus}
                onPress={() => router.push("/(root)/address/new-address")}
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
          Addresses are based on the current district.
        </Text>
      </View>
    </View>
  );
};

export default SelectAddress;
