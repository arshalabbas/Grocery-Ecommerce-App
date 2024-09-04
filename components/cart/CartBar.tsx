import { View, Text } from "react-native";
import Button from "../ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import Animated, { ZoomInDown, ZoomOutDown } from "react-native-reanimated";
import { useSegments } from "expo-router";
import { useUser } from "@/stores/useUserStore";

interface Props {
  hiddenScreens?: string[];
}

const CartBar = ({ hiddenScreens = [] }: Props) => {
  const location = useUser((state) => state.location);
  const products = useCartStore((state) => state.products).filter(
    (product) => product.district === location.district,
  );

  const segments = useSegments();

  if (products.length <= 0 || hiddenScreens.includes(segments[2] || ""))
    return null;

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  return (
    <Animated.View
      className="absolute bottom-[60px] w-full p-5"
      entering={ZoomInDown}
      exiting={ZoomOutDown}
    >
      <View className="flex-row items-center justify-between rounded-xl bg-primary p-4">
        <View>
          <Text className="font-pbold text-lg text-white">₹{totalPrice}</Text>
          <Text className="font-psemibold text-white">
            {products.length} Item{products.length > 1 && "s"}
          </Text>
        </View>
        <Button
          title="View Cart"
          variant={"solid-white"}
          width={"no-width"}
          size={"md"}
          rounded={"xl"}
        />
      </View>
    </Animated.View>
  );
};

export default CartBar;
