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
      <View className="flex-row">
        <Image source={image} className="aspect-square w-10 rounded-lg" />
        <View>
          <Text className="font-pmedium text-secondary">{title}</Text>
          <Text className="font-pregular text-xs text-secondary-muted">
            {quantity} {unit}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WishlistItemCard;
