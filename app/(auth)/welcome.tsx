// import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <View className="flex w-full items-end justify-end">
        <TouchableOpacity
          className="p-5"
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text className="font-pbold text-black">Skip</Text>
        </TouchableOpacity>
      </View>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-secondary-muted/30" />
        }
        activeDot={
          <View className="mx-1 h-[4px] w-[32px] rounded-full bg-primary" />
        }
        onIndexChanged={setActiveIndex}
      >
        {onboarding.map((item) => (
          <View
            className="flex w-full items-center justify-center"
            key={item.id}
          >
            <Image
              source={item.image}
              className="aspect-square w-full"
              contentFit="contain"
            />
            <View className="mt-10 flex w-full items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">
                {item.title}
              </Text>
              <Text className="font-JakartaSemiBold mx-10 mt-3 text-center text-secondary-muted">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className="w-full px-5">
        <Button
          title={isLastSlide ? "Get Started" : "Next"}
          onPress={() =>
            isLastSlide
              ? router.push("/(auth)/login")
              : swiperRef.current?.scrollBy(1)
          }
          containerStyles={{ marginBottom: 30 }}
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Welcome;
