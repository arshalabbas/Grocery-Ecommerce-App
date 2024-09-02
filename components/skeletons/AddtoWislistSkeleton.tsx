import { View } from "react-native";
import Skeleton from "./Skeleton";

const AddtoWislistSkeleton = () => {
  return (
    <View className="space-y-2">
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </View>
  );
};

export default AddtoWislistSkeleton;
