import FloatingCart from "@/components/cart/FloatingCart";
import ProductList from "@/components/product/ProductList";
import ProductListHeader from "@/components/product/ProductListHeader";
import ScreenHeader from "@/components/ScreenHeader";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { icons } from "@/constants";
import { getProduct, getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
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

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["product", district, data?.sub_category],
    queryFn: () =>
      getProducts({ district: district, category: data?.sub_category.title }),
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
            data={products?.filter((item) => item.id !== id)}
            isLoading={isProductsLoading}
          />
          <FloatingCart className="absolute bottom-0 mb-5" />
        </>
      )}
    </View>
  );
};

export default ProductScreen;
