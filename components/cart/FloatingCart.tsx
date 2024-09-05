import { View, Text, ViewProps } from "react-native";
import Button from "../ui/Button";
import { useCartStore } from "@/stores/useCartStore";
import Animated, { ZoomInDown, ZoomOutDown } from "react-native-reanimated";
import { useUser } from "@/stores/useUserStore";
import ImageStack from "../misc/ImageStack";
import { ImageSource } from "expo-image";
import { twMerge } from "tailwind-merge";

// interface Props extends ViewProps {
// }

const FloatingCart = ({ className, ...props }: ViewProps) => {
  const location = useUser((state) => state.location);
  const products = useCartStore((state) => state.products).filter(
    (product) => product.district === location.district,
  );

  if (products.length <= 0) return null;

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  return (
    <Animated.View
      className={twMerge("w-full overflow-hidden px-4", className)}
      entering={ZoomInDown}
      exiting={ZoomOutDown}
      {...props}
    >
      <View className="flex-row items-center justify-between rounded-xl bg-primary p-4">
        <View className="flex-row items-center space-x-2">
          <ImageStack
            data={products
              .toReversed()
              .slice(0, 3)
              .map((item) => ({
                image: item.image as ImageSource,
                key: item.id,
              }))}
          />
          <View>
            <Text className="font-pbold text-lg text-white">₹{totalPrice}</Text>
            <Text className="font-psemibold text-white">
              {products.length} Item{products.length > 1 && "s"}
            </Text>
          </View>
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

export default FloatingCart;
