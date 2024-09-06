import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CategoryItemProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TopbarItem = ({ title, isActive, onPress }: CategoryItemProps) => {
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

export default TopbarItem;
