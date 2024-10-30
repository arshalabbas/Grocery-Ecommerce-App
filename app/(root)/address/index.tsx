import Button from "@/components/ui/Button";
import { colors, icons } from "@/constants";
import { getAllAddresses } from "@/lib/api/location.api";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

const Address = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAllAddresses({}),
  });
  return (
    <View className="flex-1 bg-background px-5">
      <FlashList
        data={data?.toReversed()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-4 w-full flex-row items-center space-x-2 rounded-xl bg-white p-4"
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: "/address/edit-address",
                params: { id: item.id },
              });
            }}
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
        estimatedItemSize={50}
        ListHeaderComponent={() => (
          <Button
            title="New Address"
            variant={"outline-secondary"}
            size={"md"}
            onPress={() => router.push("/address/new-address")}
          />
        )}
        ListHeaderComponentStyle={{ marginVertical: 20 }}
        ListEmptyComponent={() => (
          <View className="w-full items-center">
            {isLoading ? (
              <ActivityIndicator
                color={colors.primary.DEFAULT}
                size={"small"}
              />
            ) : (
              <Text className="font-psemibold text-secondary-muted">
                You haven't added any addresses.
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Address;
