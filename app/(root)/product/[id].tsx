import FloatingCart from "@/components/cart/FloatingCart";
import ProductList from "@/components/product/ProductList";
import ProductListHeader from "@/components/product/ProductListHeader";
import ScreenHeader from "@/components/ScreenHeader";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { icons } from "@/constants";
import { getProduct, getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ImageSource } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

const ProductScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { district } = useUser((state) => state.location);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["product", district, data?.sub_category],
    queryFn: ({ pageParam }) =>
      getProducts({
        district: district,
        category: data?.sub_category.title,
        cursor: pageParam,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      const urlParams = new URLSearchParams(lastPage.next || "");
      return urlParams.get("cursor") || null;
    },
    enabled: isSuccess,
  });

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

      {isLoading && !data ? (
        <ProductSkeleton />
      ) : (
        <>
          <ProductList
            ListHeaderComponent={
              <ProductListHeader
                id={id}
                image={data?.image as ImageSource}
                price={data?.price!}
                title={data?.title!}
                unit={data?.unit!}
                mrp={data?.mrp!}
                fixedQuantity={data?.fixed_quantity!}
                discount={data?.discount!}
                hasWishlisted={data?.in_wishlist!}
              />
            }
            data={products?.pages
              .map((page) => page.results)
              .flat()
              .filter((item) => item.id !== id)}
            isLoading={isProductsLoading || isFetchingNextPage}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.7}
          />
          <FloatingCart className="absolute bottom-0 mb-5" />
        </>
      )}
    </View>
  );
};

export default ProductScreen;
