import CartItemCard from "@/components/cart/CartItemCard";
import CountText from "@/components/misc/CountText";
import ScreenHeader from "@/components/ScreenHeader";
import ActionButton from "@/components/ui/ActionButton";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { colors, icons } from "@/constants";
import { getAddress } from "@/lib/api/location.api";
import { useCartStore } from "@/stores/useCartStore";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

const Cart = () => {
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

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          header: () => <ScreenHeader title="Your Cart" />,
          headerShown: true,
        }}
      />
      <FlashList
        data={products}
        ListHeaderComponent={() =>
          products.length > 0 && (
            <View className="my-2 w-full flex-row justify-end">
              <ActionButton
                title="Clear cart"
                iconLeft={icons.xmark}
                containerStyles={{ backgroundColor: colors.danger }}
                onPress={clearCart}
              />
            </View>
          )
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
            <View>
              <Text className="font-pbold text-lg text-secondary">
                {data?.name}
              </Text>
              <Text className="font-psemibold text-xs text-secondary-muted">
                {data?.phone}
              </Text>
              <Text className="font-pmedium text-xs text-secondary-muted">
                {data?.pin} • {data?.district}
              </Text>
            </View>
          )
        )}
        <Button
          title={addressId ? "Change Address" : "Select Address"}
          size={"md"}
          variant={"solid-white"}
          containerStyles={{ marginTop: 10 }}
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
          <Button title="Checkout" width={"no-width"} rounded={"xl"} />
        </View>
      </View>
    </View>
  );
};

export default Cart;
