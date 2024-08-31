import { View } from "react-native";
import React from "react";
import Skeleton from "./Skeleton";

const HomeContentSkeleton = () => {
  return (
    <View className="w-full flex-1 space-y-5 p-5">
      <Skeleton
        className="w-full rounded-xl"
        style={{ aspectRatio: 2.5 / 1 }}
      />
      <Skeleton className="h-16 w-full rounded-full" />

      <Skeleton className="m-1 h-[220px] w-full rounded-lg" />
      <Skeleton className="m-1 h-[220px] w-full rounded-lg" />
    </View>
  );
};

export default HomeContentSkeleton;
