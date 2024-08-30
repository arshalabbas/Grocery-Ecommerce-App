import { Image, ImageSource } from "expo-image";
import { View, Text } from "react-native";
import { icons } from "@/constants";
import IconButton from "./ui/IconButton";
import IconRadioButton from "./ui/IconRadioButton";
import Animated, { LightSpeedInLeft } from "react-native-reanimated";

interface Props {
  image: ImageSource;
  title: string;
  unit: string;
  price: number;
  badgeText?: string;
}

const ProductCard = ({ image, title, unit, price, badgeText }: Props) => {
  return (
    <View className="m-1 min-h-[230px] flex-1 items-center justify-between overflow-hidden rounded-lg bg-white p-2">
      <View className="w-full items-end">
        <IconRadioButton icon={icons.heart} value={false} />
      </View>
      <Image
        source={image}
        contentFit="contain"
        className="aspect-square w-[100px]"
      />
      <View className="w-full flex-row justify-between">
        <View className="flex-1 pr-3">
          <Text
            className="font-pregular text-sm"
            numberOfLines={1}
            style={{ includeFontPadding: false, textAlignVertical: "bottom" }}
          >
            {title}
          </Text>
          <Text className="font-pmedium">
            ₹{price}/{unit}
          </Text>
        </View>
        <IconButton icon={icons.bag} />
      </View>
      {badgeText && (
        <Animated.View
          entering={LightSpeedInLeft.duration(200).delay(300)}
          className="absolute left-0 top-0 rounded-br-lg bg-secondary p-2"
        >
          <Text
            className="font-psemibold text-xs text-white"
            style={{ includeFontPadding: false, textAlignVertical: "center" }}
          >
            {badgeText}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

export default ProductCard;
