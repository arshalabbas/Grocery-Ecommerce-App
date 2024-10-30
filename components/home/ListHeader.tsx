import { Image } from "expo-image";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MockSearchButton from "../misc/MockSearchButton";
import { Banner, SubCategory } from "@/types";
import clsx from "clsx";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import { useRef } from "react";
import { colors } from "@/constants";

interface Props {
  banners: Banner[];
  subCategories: SubCategory[];
  activeCategory: { id: string; title: string };
  setActiveCategory: (category: { id: string; title: string }) => void;
}

const ListHeader = ({
  banners,
  subCategories,
  activeCategory,
  setActiveCategory,
}: Props) => {
  const swiperRef = useRef<Swiper>(null);
  const router = useRouter();

  return (
    <View>
      <Swiper
        ref={swiperRef}
        autoplay
        activeDotColor={colors.primary.DEFAULT}
        containerStyle={{
          width: "100%",
          aspectRatio: 16 / 6,
        }}
      >
        {banners.map((item) => (
          <View
            className="h-full w-full overflow-hidden rounded-lg p-2"
            key={item.id}
          >
            <Image
              source={item.image}
              className="h-full w-full rounded-lg"
              contentFit="cover"
            />
          </View>
        ))}
      </Swiper>
      <MockSearchButton onPress={() => router.push("/(root)/search")} />
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
              title={`${item.emoji} ${item.title}`}
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
