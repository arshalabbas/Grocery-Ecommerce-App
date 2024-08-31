import { Image, ImageSource } from "expo-image";
import { View, Text } from "react-native";

interface Props {
  image: ImageSource;
  title: string;
  quantity: number;
  unit: string;
}

const WishlistItemCard = ({ image, title, quantity, unit }: Props) => {
  return (
    <View className="mb-4 w-full rounded-lg bg-background px-3 py-5">
      <View className="flex-row space-x-5">
        <Image
          source={image}
          className="aspect-square w-10 rounded-lg"
          contentFit="contain"
        />
        <View>
          <View className="flex-1">
            <Text className="font-pmedium text-secondary" numberOfLines={1}>
              {title}
            </Text>
            <Text className="font-pregular text-xs text-secondary-muted">
              {quantity} {unit}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WishlistItemCard;
