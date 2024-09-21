import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import shippedTruck from "@/assets/lottie/test.json";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

const OrderSuccessScreen = () => {
  const router = useRouter();
  const animation = useRef<LottieView>(null);
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [],
  );

  useEffect(() => {
    scale.value = withDelay(1000, withTiming(1, { duration: 700 }));

    /* eslint-disable-next-line */
  }, []);

  return (
    <View className="flex-1 items-center justify-center overflow-hidden bg-primary-50">
      <Animated.View
        className="aspect-square w-[3000px] items-center justify-center rounded-full bg-primary"
        style={[animatedStyle]}
      >
        <View className="aspect-square rounded-full bg-primary-100 p-5">
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={shippedTruck}
          />
        </View>
        <Text className="my-10 font-pbold text-xl text-white">
          Order Successful!
        </Text>
        <Button
          title="Continue Shopping"
          variant={"solid-secondary"}
          width={"no-width"}
          rounded={"xl"}
          onPress={() => router.replace("/(root)/(tabs)/home")}
        />
      </Animated.View>
      <StatusBar style="light" />
    </View>
  );
};

export default OrderSuccessScreen;
