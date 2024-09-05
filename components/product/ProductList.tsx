import ProductCard from "@/components/product/ProductCard";
import { colors } from "@/constants";
import { ProductData } from "@/types";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";

interface Props extends Omit<FlashListProps<ProductData>, "renderItem"> {
  isLoading?: boolean;
}

const ProductList = ({ isLoading, ...props }: Props) => {
  return (
    <FlashList
      className="w-full"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 5 }}
      keyExtractor={(item) => item.id}
      numColumns={2}
      estimatedItemSize={260}
      renderItem={({ item }) => (
        <ProductCard
          id={item.id}
          title={item.title}
          image={item.image}
          unit={item.unit}
          mrp={item.mrp}
          fixedQuantity={item.fixed_quantity}
          price={item.price}
          badgeText={item.discount >= 20 ? `${item.discount}% Off` : undefined}
          hasWishlisted={item.in_wishlist}
        />
      )}
      ListEmptyComponent={
        <View className="w-full flex-1 items-center justify-center">
          {isLoading ? (
            <ActivityIndicator color={colors.primary.DEFAULT} size={"small"} />
          ) : (
            <Text className="font-pbold text-secondary-muted">
              No Products Found!
            </Text>
          )}
        </View>
      }
      ListFooterComponent={
        <View className="my-10">
          <Text className="text-center font-psemibold text-secondary-muted">
            You're at the end!
          </Text>
        </View>
      }
      {...props}
    />
  );
};

export default ProductList;
