import Loading from "@/components/misc/Loading";
import ProductCard from "@/components/ProductCard";
import ScreenHeader from "@/components/ScreenHeader";
import ActionButton from "@/components/ui/ActionButton";
import { icons } from "@/constants";
import { getProduct, getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

const ProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { postalCode } = useUser((state) => state.location);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
  });

  const { data: products } = useQuery({
    queryKey: ["products", postalCode, data?.sub_category],
    queryFn: () =>
      getProducts({ pincode: postalCode, category: data?.sub_category.title }),
    enabled: isSuccess,
  });
  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader rightIcon={icons.cart} />,
        }}
      />

      <FlatList
        className="w-full flex-1"
        ListHeaderComponent={() => (
          <View>
            <View className="w-full rounded-xl bg-white">
              <View className="aspect-square w-full p-5">
                <Image
                  source={data?.image}
                  className="h-full w-full"
                  contentFit="contain"
                />
              </View>
              <View className="w-full rounded-lg p-3">
                <Text className="font-psemibold text-xl text-secondary">
                  {data?.title}
                </Text>
                <View className="mt-2 flex-row items-center justify-between">
                  <View>
                    <Text className="font-pregular text-secondary-muted">
                      1{data?.unit}
                    </Text>
                    <Text className="font-pbold text-lg text-secondary">
                      ₹{data?.price}
                    </Text>
                  </View>
                  <ActionButton iconLeft={icons.plus} title="Add" />
                </View>
              </View>
            </View>
            <Text className="mb-1 mt-5 font-pbold text-lg">
              You may also like
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 5 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Empty List</Text>}
        ListFooterComponent={<View className="mb-20" />}
        data={products?.filter((product) => product.id !== id)}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            image={item.image}
            unit={item.unit}
            price={item.price}
            badgeText={Math.random() > 0.5 ? "30% Off" : undefined}
          />
        )}
      />
      <ActionButton
        title="Instant Buy"
        iconLeft={icons.info}
        containerStyles={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      />
      <Loading isVisible={isLoading} />
    </View>
  );
};

export default ProductScreen;
