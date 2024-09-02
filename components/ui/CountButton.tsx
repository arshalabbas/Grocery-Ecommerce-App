import { icons } from "@/constants";
import { Image } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";
import { useCountStore } from "@/stores/useCountStore"; // Adjust the import path
import ActionButton from "./ActionButton";

interface Props {
  name: string;
}

const CountButton = ({ name }: Props) => {
  const count = useCountStore((state) => state.counts[name] || 0);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  if (count <= 0) {
    return (
      <ActionButton
        title="Add"
        iconLeft={icons.add}
        onPress={() => increment(name)}
      />
    );
  }

  return (
    <View className="flex-row items-center space-x-2">
      <TouchableOpacity
        className="aspect-square rounded-full border-[.5px] border-secondary-muted/50 bg-white p-3"
        onPress={() => increment(name)}
      >
        <Image
          source={icons.add}
          className="aspect-square w-3"
          contentFit="contain"
        />
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity>
        <TouchableOpacity
          className="aspect-square rounded-full border-[.5px] border-secondary-muted/50 bg-white p-3"
          onPress={() => decrement(name)}
        >
          <Image
            source={icons.sub}
            className="aspect-square w-3"
            contentFit="contain"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default CountButton;
