import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "./Skeleton";

const HomeSkeleton = () => {
  return (
    <SafeAreaView className="flex-1">
      <Skeleton className="h-20 w-full" />
      <View className="space-y-5 p-5">
        <Skeleton
          className="w-full rounded-xl"
          style={{ aspectRatio: 2.5 / 1 }}
        />
        <Skeleton className="h-16 w-full rounded-full" />

        <Skeleton className="m-1 h-[220px] w-full rounded-lg" />
        <Skeleton className="m-1 h-[220px] w-full rounded-lg" />
      </View>
      <Skeleton className="absolute bottom-0 h-20 w-full" />
    </SafeAreaView>
  );
};

export default HomeSkeleton;
