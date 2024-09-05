import CartItemCard from "@/components/cart/CartItemCard";
import CountText from "@/components/misc/CountText";
import ScreenHeader from "@/components/ScreenHeader";
import ActionButton from "@/components/ui/ActionButton";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { colors, icons } from "@/constants";
import { useCartStore } from "@/stores/useCartStore";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";

const Cart = () => {
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
        ListHeaderComponent={() => (
          <View className="mb-5 w-full flex-row justify-end">
            <ActionButton
              title="Clear cart"
              iconLeft={icons.xmark}
              containerStyles={{ backgroundColor: colors.danger }}
              onPress={clearCart}
            />
          </View>
        )}
        renderItem={({ item }) => <CartItemCard id={item.id} />}
        estimatedItemSize={100}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center">
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
        {/* TODO: Address select */}
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
