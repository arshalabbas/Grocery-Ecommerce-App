import Loading from "@/components/misc/Loading";
import ScreenHeader from "@/components/ScreenHeader";
import ActionButton from "@/components/ui/ActionButton";
import { colors, icons } from "@/constants";
import { getTimeData } from "@/lib/api/app.api";
import { cancelOrder, getOrder } from "@/lib/api/orders.api";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const OrderScreen = () => {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder({ id }),
  });

  const { data: time } = useQuery({
    queryKey: [],
    queryFn: getTimeData,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
  });

  const cancelOrderHandler = () => {
    // TODO: Alert before cancel.
    cancelOrderMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["order"],
          });
        },
      },
    );
  };

  function arrivingMessage() {
    if (!time) return;
    if (time.hour > 16 && time.minute > 30) return "Arriving Tomorrow";
    else return "Arriving Today";
  }

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader title="Order Details" />,
        }}
      />
      <FlashList
        data={data?.items}
        // Header
        ListHeaderComponent={
          <View>
            <View className="w-full rounded-xl bg-white p-4">
              <View className="flex-row items-center justify-between">
                <Text className="font-pregular text-xs text-secondary-muted">
                  {data?.order_id}
                </Text>
                <Text
                  className="font-pbold capitalize"
                  style={{ color: colors.status[data?.status ?? ""] }}
                >
                  {data?.status}
                </Text>
              </View>
              <View className="mt-5 flex-row items-center justify-between">
                <View>
                  <Text className="font-pbold text-xl text-secondary">
                    ₹{data?.buy_price}
                  </Text>
                  <Text className="font-medium text-secondary-muted">
                    {data?.items.length} Items
                  </Text>
                </View>
                {data?.can_cancel && (
                  <ActionButton
                    title="Cancel"
                    iconLeft={icons.xmark}
                    containerStyles={{ backgroundColor: colors.danger }}
                    onPress={cancelOrderHandler}
                  />
                )}
              </View>
              {data?.status !== "cancelled" && data?.status !== "delivered" && (
                <View className="mt-2">
                  <Text className="font-psemibold text-lg text-success">
                    {arrivingMessage()}
                  </Text>
                </View>
              )}
              <View className="mt-2">
                <Text className="font-psemibold text-xs text-secondary-muted">
                  Ordered Address:
                </Text>
                <View className="w-full">
                  <Text className="font-pbold text-secondary">
                    {data?.address.name}
                  </Text>
                  <Text className="font-psemibold text-xs text-secondary-muted">
                    {data?.address.phone}
                  </Text>
                  <Text className="font-pregular text-xs text-secondary-muted">
                    {data?.address.landmark}
                  </Text>
                  <Text className="font-pregular text-xs text-secondary-muted">
                    {data?.address.pin} • {data?.address.city_or_town} •{" "}
                    {data?.address.district}
                  </Text>
                </View>
              </View>
            </View>
            <Text className="mb-1 mt-5 font-psemibold text-lg text-secondary">
              Products you bought!
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="m-1 flex-1 items-center justify-center rounded-xl bg-white p-5">
            <Image
              source={item.product.image}
              className="aspect-square w-28"
              contentFit="contain"
            />
            <View className="w-full">
              <Text className="font-pmedium text-secondary">
                {item.product.title}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                Quantity: {item.quantity}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                Price: ₹{item.buy_total_price}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View className="mt-5 flex-row items-center justify-center">
            <Text className="font-pbold text-lg text-secondary-muted">
              Happy Shopping!
            </Text>
          </View>
        }
        numColumns={2}
        className="flex-1"
        contentContainerStyle={{ padding: 10 }}
        estimatedItemSize={100}
      />
      <Loading isVisible={isLoading || cancelOrderMutation.isPending} />
    </View>
  );
};

export default OrderScreen;
