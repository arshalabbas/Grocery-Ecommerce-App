import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "./Skeleton";

const HomeSkeleton = () => {
  return (
    <SafeAreaView className="flex-1">
      <Skeleton className="h-20 w-full" order={1} />
      <View className="space-y-5 p-5">
        <Skeleton
          className="w-full rounded-xl"
          order={2}
          style={{ aspectRatio: 2.5 / 1 }}
        />
        <Skeleton className="h-16 w-full rounded-full" order={3} />

        <Skeleton className="m-1 h-[220px] w-full rounded-lg" order={4} />
        <Skeleton className="m-1 h-[220px] w-full rounded-lg" order={5} />
      </View>
      <Skeleton className="absolute bottom-0 h-20 w-full" order={6} />
    </SafeAreaView>
  );
};

export default HomeSkeleton;
