import clsx from "clsx";
import { Image, ImageSource } from "expo-image";
import { View } from "react-native";
import Animated, { ZoomInLeft, ZoomOutLeft } from "react-native-reanimated";

interface Props {
  data: {
    image: ImageSource;
    key: string;
  }[];
}

const ImageStack = ({ data }: Props) => {
  return (
    <View className="flex-row justify-center overflow-hidden">
      {data &&
        data
          .slice(0, 3)
          .toReversed()
          .map((item, index) => (
            <Animated.View
              entering={ZoomInLeft}
              exiting={ZoomOutLeft}
              key={item.key}
              className={clsx(
                "aspect-square w-14 overflow-hidden rounded-lg border-[.5px] border-secondary-muted bg-white",
                { "-ml-12": index > 0 },
              )}
            >
              <Image
                transition={300}
                source={item.image}
                className="h-full w-full"
                contentFit="contain"
              />
            </Animated.View>
          ))}
    </View>
  );
};

export default ImageStack;
