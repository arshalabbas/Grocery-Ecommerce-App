import { icons } from "@/constants";
import { Image, ImageSource } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";

interface Props {
  title?: string;
  hasBack?: boolean;
  rightIcon?: ImageSource;
  onRightPress?: () => void;
}

const ScreenHeader = ({
  title,
  hasBack = true,
  rightIcon,
  onRightPress,
}: Props) => {
  const router = useRouter();
  return (
    <View
      className="w-full border-b-[.5px] border-secondary-muted/50 bg-white"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          {hasBack && (
            <TouchableOpacity
              className="py-[20px] pl-[20px]"
              onPress={() => router.back()}
            >
              <Image
                source={icons.arrowLeft}
                className="mr-2 aspect-square w-4"
                contentFit="contain"
              />
            </TouchableOpacity>
          )}
          <Text
            className={`py-5 font-pbold text-xl text-secondary ${!hasBack && "px-5"}`}
          >
            {title}
          </Text>
        </View>
        {rightIcon && (
          <TouchableOpacity className="p-[20px]">
            <Image
              source={rightIcon}
              className="aspect-square w-5"
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
