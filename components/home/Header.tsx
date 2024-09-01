import { icons } from "@/constants";
import { useUser } from "@/stores/useUserStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";

const Header = () => {
  const location = useUser((state) => state.location);
  const user = useUser((state) => state.user);
  const router = useRouter();
  return (
    <View
      className="w-full border-b-[.5px] border-secondary-muted/50 bg-white"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="w-full flex-row items-center justify-between p-3">
        <TouchableOpacity
          className="w-1/2 flex-row items-center"
          activeOpacity={0.7}
          onPress={() => router.push("/(root)/location")}
        >
          <Image
            source={icons.location}
            className="ml-1 aspect-square h-8"
            contentFit="contain"
          />
          <View className="ml-1">
            <View className="flex-row items-center">
              <Text
                className="mr-1 font-psemibold text-lg text-secondary"
                numberOfLines={1}
              >
                {location.place}
              </Text>
              <Image
                source={icons.angleDown}
                className="aspect-square w-3"
                contentFit="contain"
              />
            </View>
            <Text
              className="-mt-1 font-pregular text-secondary-muted"
              numberOfLines={1}
            >
              {location.city}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="aspect-square w-10 overflow-hidden rounded-full border border-primary"
          onPress={() => router.push("/(root)/profile")}
        >
          <Image
            className="h-full w-full"
            source={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.name.toLowerCase().replace(" ", "-")}&backgroundColor=transparent&shapeColor=f88c49`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
