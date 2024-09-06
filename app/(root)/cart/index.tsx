import CartItemCard from "@/components/cart/CartItemCard";
import CountText from "@/components/misc/CountText";
import ListItem from "@/components/misc/ListItem";
import Loading from "@/components/misc/Loading";
import ScreenHeader from "@/components/ScreenHeader";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { colors, icons } from "@/constants";
import { getAddress, isServicable } from "@/lib/api/location.api";
import { placeOrder } from "@/lib/api/orders.api";
import { useCartStore } from "@/stores/useCartStore";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

const Cart = () => {
  const queryClient = useQueryClient();
  const addressId = useUser((state) => state.location.id);
  const router = useRouter();
  const location = useUser((state) => state.location);
  const products = useCartStore((state) => state.products).filter(
    (item) => item.district === location.district,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["address", addressId],
    queryFn: () => getAddress({ id: addressId! }),
    enabled: addressId !== undefined,
  });

  // TODO: Fix this
  const { data: servicableData } = useQuery({
    queryKey: ["servicable", location.district, location.postalCode],
    queryFn: () =>
      isServicable({
        district: location.district,
        pincode: location.postalCode,
      }),
  });

  console.log(servicableData);

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
  });

  const onPressPlaceOrder = () => {
    const items = products.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    placeOrderMutation.mutate(
      { addressId: addressId!, items },
      {
        onSuccess: (data) => {
          clearCart();
          queryClient.invalidateQueries({ queryKey: ["order"] });
          console.log(data);
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          header: () => (
            <ScreenHeader
              title="Your Cart"
              rightIcon={products.length > 0 && icons.trash}
              rightIconColor={colors.danger}
              onRightPress={clearCart}
            />
          ),

          headerShown: true,
        }}
      />
      <FlashList
        data={products}
        ListHeaderComponent={
          <View className="my-4 w-full rounded-lg border-[.5px] border-secondary-muted/50 bg-white p-2">
            <View className="flex-row items-center space-x-1">
              <Image
                source={icons.info}
                className="aspect-square w-5"
                contentFit="contain"
                tintColor={colors.primary.DEFAULT}
              />
              <Text
                className="font-psemibold text-secondary"
                style={{
                  includeFontPadding: false,
                  textAlignVertical: "center",
                }}
              >
                Notes
              </Text>
            </View>
            <ListItem bullet="-">
              Please note that our product deliveries are scheduled after 5:00
              PM.
            </ListItem>
            <ListItem bullet="-">
              Only COD available. Pay by cash or UPI at delivery.
            </ListItem>
          </View>
        }
        renderItem={({ item }) => <CartItemCard id={item.id} />}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ListEmptyComponent={() => (
          <View className="mt-10 flex-1 items-center">
            <Text className="font-psemibold text-xl text-secondary-muted">
              Nothing in the cart!
            </Text>
            <Button
              title="Browse Products"
              variant={"outline-secondary"}
              size={"md"}
              width={"no-width"}
              containerStyles={{ marginTop: 20 }}
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        )}
      />

      <View className="rounded-t-3xl bg-white p-5">
        <Text className="mb-1 font-pmedium text-xs text-secondary-muted">
          Delivery Address
        </Text>
        {isLoading ? (
          <ActivityIndicator color={colors.primary.DEFAULT} size={"small"} />
        ) : (
          addressId && (
            <View className="w-full">
              <Text className="font-pbold text-secondary">{data?.name}</Text>
              <Text className="font-psemibold text-xs text-secondary-muted">
                {data?.phone}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                {data?.landmark}
              </Text>
              <Text className="font-pregular text-xs text-secondary-muted">
                {data?.pin} • {data?.city_or_town} • {data?.district}
              </Text>
            </View>
          )
        )}
        <Button
          title={addressId ? "Change Address" : "Select Address"}
          size={"md"}
          variant={"solid-white"}
          containerStyles={{ marginTop: 10 }}
          onPress={() => router.push("/(root)/(modals)/select-address")}
        />
        <Divider />
        <View className="mb-2 w-full flex-row items-center justify-between">
          <View>
            <CountText
              className="font-pbold text-xl text-secondary"
              prefix={"₹"}
              count={totalPrice}
            />
            <CountText
              className="font-pmedium text-lg text-secondary-muted"
              count={products.length}
              suffix={"Items"}
            />
          </View>
          <Button
            title="Place Order"
            width={"no-width"}
            rounded={"xl"}
            variant={
              products.length <= 0 || !addressId
                ? "solid-disabled"
                : "solid-primary"
            }
            onPress={onPressPlaceOrder}
            disabled={products.length <= 0 || !addressId}
          />
        </View>
      </View>
      <Loading isVisible={placeOrderMutation.isPending} />
    </View>
  );
};

export default Cart;
