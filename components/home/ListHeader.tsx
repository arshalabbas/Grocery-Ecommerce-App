import { Image } from "expo-image";
import { View } from "react-native";
import InputField from "../form/InputFeld";
import dummy from "@/constants/dummy";
import MockSearchButton from "../misc/MockSearchButton";

const ListHeader = () => {
  return (
    <View>
      <Image
        className="w-full rounded-xl"
        style={{ aspectRatio: 2.5 / 1 }}
        source={dummy.banner}
        contentFit="cover"
      />
      <MockSearchButton />
    </View>
  );
};

export default ListHeader;
