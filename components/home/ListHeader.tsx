import { Image } from "expo-image";
import { View } from "react-native";
import InputField from "../form/InputFeld";
import dummy from "@/constants/dummy";

const ListHeader = () => {
  return (
    <View>
      <Image
        className="w-full rounded-xl"
        style={{ aspectRatio: 2.5 / 1 }}
        source={dummy.banner}
        contentFit="cover"
      />
      <InputField label="" placeholder="search" />
    </View>
  );
};

export default ListHeader;
