import { icons } from "@/constants";
import { Image } from "expo-image";
import { View, TouchableOpacity } from "react-native";
import ActionButton from "./ActionButton";
import CountText from "../misc/CountText";

interface Props {
  count: number;
  onIncrementCount?: () => void;
  onDecrementCount?: () => void;
}

const CountButton = ({ count, onIncrementCount, onDecrementCount }: Props) => {
  if (count <= 0) {
    return (
      <ActionButton
        title="Add"
        iconLeft={icons.add}
        onPress={onIncrementCount}
      />
    );
  }

  return (
    <View className="flex-row items-center space-x-2">
      <TouchableOpacity
        className="aspect-square rounded-full border-[.5px] border-secondary-muted/50 bg-white p-3"
        onPress={onDecrementCount}
      >
        <Image
          source={icons.sub}
          className="aspect-square w-3"
          contentFit="contain"
        />
      </TouchableOpacity>
      <CountText
        className="font-pregular text-secondary"
        count={count}
        duration={80}
      />
      <TouchableOpacity>
        <TouchableOpacity
          className="aspect-square rounded-full border-[.5px] border-secondary-muted/50 bg-white p-3"
          onPress={onIncrementCount}
        >
          <Image
            source={icons.add}
            className="aspect-square w-3"
            contentFit="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default CountButton;
