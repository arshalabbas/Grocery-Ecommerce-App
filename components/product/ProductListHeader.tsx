import { View, Text } from "react-native";
import CartButton from "../cart/CartButton";
import { Image, ImageSource } from "expo-image";
import { Link } from "expo-router";
import Button from "../ui/Button";
import Animated, { LightSpeedInLeft } from "react-native-reanimated";

interface Props {
  id: string;
  title: string;
  image: ImageSource;
  price: number;
  unit: string;
  mrp: number;
  fixedQuantity: number;
  discount: number;
}

const ProductListHeader = ({
  id,
  title,
  image,
  price,
  unit,
  mrp,
  fixedQuantity,
  discount,
}: Props) => {
  return (
    <View>
      <View className="w-full overflow-hidden rounded-xl bg-white">
        {/* Product Image - START */}
        <View className="aspect-square w-full p-5">
          <Image
            source={image}
            className="h-full w-full"
            contentFit="contain"
          />
          <Animated.View
            className="absolute left-0 top-0 rounded-br-xl bg-primary p-2"
            entering={LightSpeedInLeft.duration(200).delay(300)}
          >
            <Text className="font-pbold text-lg text-white">
              {discount}% Off
            </Text>
          </Animated.View>
        </View>
        {/* Product Image - END */}
        {/* Disclaimer - START */}
        <Text className="mt-2 w-full text-center font-pmedium text-xs text-secondary-muted">
          Images are for representation purposes only.{"\n"}
          <Link href={"https://wwww.google.com"}>
            <Text className="text-primary underline">Learn more.</Text>
          </Link>
        </Text>
        {/* Disclaimer - END */}
        {/* Card Body - START */}
        <View className="w-full rounded-lg p-3">
          {/* Title and quantity - START */}
          <View className="w-full">
            <Text className="font-psemibold text-xl text-secondary">
              {title}
            </Text>
            <Text className="font-pregular text-secondary-muted">
              {fixedQuantity} {unit}
            </Text>
          </View>
          {/* Title and quantity - END */}
          <View className="mt-2 w-full flex-row items-end justify-between">
            {/* Price set - START */}
            <View className="flex-row items-center space-x-2">
              <Text
                className="font-pbold text-xl text-secondary"
                style={{
                  includeFontPadding: false,
                  textAlignVertical: "bottom",
                }}
              >
                ₹ {price}
              </Text>
              <Text
                className="font-pmedium text-secondary-muted line-through"
                style={{
                  includeFontPadding: false,
                  textAlignVertical: "bottom",
                }}
              >
                ₹{mrp}
              </Text>
            </View>
            {/* Price set - END */}
            <CartButton
              id={id}
              title={title}
              image={image as string}
              price={price}
              unit={unit}
            />
          </View>
        </View>
        <Button
          title="⚡ Instant Buy"
          variant={"outline-primary"}
          width={"no-width"}
          rounded={"xl"}
          containerStyles={{ margin: 10 }}
        />
        {/* Card Body - END */}
      </View>
      <Text className="mb-1 mt-5 font-pbold text-lg">You may also like</Text>
    </View>
  );
};

export default ProductListHeader;
