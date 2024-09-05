import CartButton from "@/components/cart/CartButton";
import FloatingCart from "@/components/cart/FloatingCart";
import ProductCard from "@/components/ProductCard";
import ScreenHeader from "@/components/ScreenHeader";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import ActionButton from "@/components/ui/ActionButton";
import { icons } from "@/constants";
import { getProduct, getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

const ProductScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { district } = useUser((state) => state.location);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
  });

  const { data: products } = useQuery({
    queryKey: ["products", district, data?.sub_category],
    queryFn: () =>
      getProducts({ district: district, category: data?.sub_category.title }),
    enabled: isSuccess,
  });

  if (isLoading) return <ProductSkeleton />;

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <ScreenHeader
              rightIcon={icons.search}
              onRightPress={() => router.push("/(root)/search")}
            />
          ),
        }}
      />

      <FlashList
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
                      1 {data?.unit}
                    </Text>
                    <Text className="font-pbold text-lg text-secondary">
                      ₹ {data?.price}
                    </Text>
                  </View>
                  {/* <ActionButton iconLeft={icons.plus} title="Add" /> */}
                  <CartButton
                    id={id}
                    title={data?.title!}
                    image={data?.image as string}
                    price={data?.price!}
                    unit={data?.unit!}
                  />
                </View>
              </View>
            </View>
            <Text className="mb-1 mt-5 font-pbold text-lg">
              You may also like
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 5 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Empty List</Text>}
        data={products?.filter((product) => product.id !== id)}
        numColumns={2}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            image={item.image}
            unit={item.unit}
            price={item.price}
            badgeText={Math.random() > 0.5 ? "30% Off" : undefined}
            hasWishlisted={item.in_wishlist}
          />
        )}
        ListFooterComponent={() => (
          <View className="my-10">
            <Text className="text-center font-psemibold text-secondary-muted">
              You're at the end!
            </Text>
          </View>
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
      <FloatingCart className="absolute bottom-0 mb-5" />
    </View>
  );
};

export default ProductScreen;
