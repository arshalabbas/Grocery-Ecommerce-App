import { View } from "react-native";
import Skeleton from "./Skeleton";

const ProductSkeleton = () => {
  return (
    <View className="flex-1 space-y-4 p-5">
      <Skeleton className="aspect-square w-full rounded-lg" order={1} />
      <View className="w-full flex-row items-center justify-between">
        <View className="flex-1 space-y-2">
          <Skeleton className="h-7 w-3/5" order={2} />
          <Skeleton className="h-5 w-1/2" order={2} />
          <Skeleton className="h-5 w-1/2" order={2} />
        </View>
        <Skeleton className="h-7 w-20 rounded-full" order={2} />
      </View>
      <Skeleton className="h-7 w-4/5" order={3} />
      <View className="flex-1 flex-row justify-between">
        <Skeleton className="mr-2 h-60 flex-1 rounded-xl" order={4} />
        <Skeleton className="ml-2 h-60 flex-1 rounded-xl" order={4} />
      </View>
    </View>
  );
};

export default ProductSkeleton;
