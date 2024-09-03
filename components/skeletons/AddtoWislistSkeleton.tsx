import { View } from "react-native";
import Skeleton from "./Skeleton";

const AddtoWislistSkeleton = () => {
  return (
    <View className="space-y-2">
      <Skeleton className="h-10 w-full rounded-lg" order={1} />
      <Skeleton className="h-10 w-full rounded-lg" order={2} />
      <Skeleton className="h-10 w-full rounded-lg" order={3} />
      <Skeleton className="h-10 w-full rounded-lg" order={4} />
    </View>
  );
};

export default AddtoWislistSkeleton;
