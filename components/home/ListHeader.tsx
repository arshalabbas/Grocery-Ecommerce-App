import { Image } from "expo-image";
import { ScrollView, TouchableOpacity, View } from "react-native";
import dummy from "@/constants/dummy";
import MockSearchButton from "../misc/MockSearchButton";
import { SubCategory } from "@/types";
import clsx from "clsx";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

interface Props {
  subCategories: SubCategory[];
  activeCategory: { id: string; title: string };
  setActiveCategory: (category: { id: string; title: string }) => void;
}

const ListHeader = ({
  subCategories,
  activeCategory,
  setActiveCategory,
}: Props) => {
  const router = useRouter();
  return (
    <View>
      <Image
        className="w-full rounded-xl"
        style={{ aspectRatio: 2.5 / 1 }}
        source={dummy.banner}
        contentFit="cover"
      />
      <MockSearchButton onPress={() => router.push("/search")} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={100}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <View className="flex-row items-center">
          <CategoryItem
            title="All"
            isActive={activeCategory.id === ""}
            onPress={() => setActiveCategory({ id: "", title: "" })}
          />
          {subCategories.map((item, index) => (
            <CategoryItem
              key={item.id}
              title={`${index % 2 === 0 ? "🍅" : "🥩"} ${item.title}`}
              isActive={item.id === activeCategory.id}
              onPress={() =>
                setActiveCategory({ id: item.id, title: item.title })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

interface CategoryItemProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const CategoryItem = ({ title, isActive, onPress }: CategoryItemProps) => {
  const scale = useSharedValue(1);
  const marginHorizontal = useSharedValue(0);
  const width = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(scale.value, { duration: 100 }) }],
    marginHorizontal: withTiming(marginHorizontal.value, { duration: 100 }),
  }));

  const animatedBarStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value, { duration: 300 }),
  }));

  if (isActive) {
    scale.value = 1.1;
    marginHorizontal.value = 12;
    width.value = 20;
  } else {
    scale.value = 1;
    marginHorizontal.value = 0;
    width.value = 0;
  }

  return (
    <TouchableOpacity
      className="items-center px-2 pt-5"
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isActive}
    >
      <Animated.Text
        style={animatedStyle}
        className={clsx("font-psemibold text-secondary-muted", {
          "text-secondary": isActive,
        })}
      >
        {title}
      </Animated.Text>
      {isActive && (
        <Animated.View
          className="h-[3px] rounded-full bg-secondary"
          style={animatedBarStyle}
        />
      )}
    </TouchableOpacity>
  );
};

export default ListHeader;
