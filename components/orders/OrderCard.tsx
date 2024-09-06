import { Text, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ImageStack from "../misc/ImageStack";
import { Image, ImageSource } from "expo-image";
import { formatDate } from "@/lib/utils";
import { colors, icons } from "@/constants";
import { StatusFilter } from "@/types";
import { Link } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  id: string;
  orderId: string;
  images: string[];
  date: Date;
  price: number;
  status: StatusFilter;
  quantity: number;
}

const OrderCard = ({
  id,
  orderId,
  images,
  date,
  price,
  status,
  quantity,
}: Props) => {
  const scale = useSharedValue<number>(1);

  const onPressIn = () => {
    scale.value = 0.975;
  };

  const onPressOut = () => {
    scale.value = 1;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value) }],
  }));

  return (
    <Link href={`/(root)/order/${id}`} asChild>
      <AnimatedPressable
        className="mb-4 w-full rounded-xl bg-white p-4"
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={animatedStyles}
      >
        <View className="mb-4 flex-1 flex-row items-center justify-between">
          <Text className="font-pregular text-xs text-secondary-muted">
            {orderId}
          </Text>
          <Image
            source={icons.angleDown}
            className="aspect-square w-3 -rotate-90 opacity-60"
            contentFit="contain"
          />
        </View>
        {/* <Divider /> */}
        <View className="w-full flex-row items-center justify-between">
          <View className="flex-row items-center space-x-4">
            <ImageStack
              data={images.map((item, index) => ({
                image: item as ImageSource,
                key: index.toString(),
              }))}
            />
            <View>
              <Text className="font-pbold text-lg">₹{price * quantity}</Text>
              <Text className="font-psemibold text-gray-600">
                {quantity} item{quantity > 1 && "s"}
              </Text>
            </View>
          </View>
          <Text
            className="font-pbold capitalize"
            style={{ color: colors.status[status] }}
          >
            {status}
          </Text>
        </View>
        <Text className="mt-2 w-full text-right font-pregular text-xs text-secondary-muted">
          {formatDate(date)}
        </Text>
      </AnimatedPressable>
    </Link>
  );
};

export default OrderCard;
