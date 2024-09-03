import { View } from "react-native";
import Skeleton from "./Skeleton";

const WishlistSkeleton = () => {
  return (
    <View className="flex-1 space-y-20 p-4">
      <Skeleton className="w-full flex-1 space-y-4 rounded-xl bg-primary-50/80 p-4">
        <View className="flex-row space-x-3">
          <Skeleton className="aspect-square w-16 rounded-lg" order={1} />
          <View className="flex-1 space-y-2">
            <Skeleton className="h-7 w-4/5" order={1} />
            <Skeleton className="h-5 w-1/2" order={1} />
          </View>
        </View>
        <View className="space-y-3">
          <Skeleton className="h-16 w-full rounded-lg" order={2} />
          <Skeleton className="h-16 w-full rounded-lg" order={3} />
          <Skeleton className="h-16 w-full rounded-lg" order={4} />
        </View>
      </Skeleton>
      <Skeleton className="w-full flex-1 space-y-4 rounded-xl bg-primary-50/80 p-4">
        <View className="flex-row space-x-3">
          <Skeleton className="aspect-square w-16 rounded-lg" order={5} />
          <View className="flex-1 space-y-2">
            <Skeleton className="h-7 w-3/5" order={5} />
            <Skeleton className="h-5 w-1/2" order={5} />
          </View>
        </View>
        <View className="space-y-3">
          <Skeleton className="h-16 w-full rounded-lg" order={6} />
          <Skeleton className="h-16 w-full rounded-lg" order={7} />
        </View>
      </Skeleton>
    </View>
  );
};

export default WishlistSkeleton;
