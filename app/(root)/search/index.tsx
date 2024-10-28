import FloatingCart from "@/components/cart/FloatingCart";
import SearchInput from "@/components/form/SearchInput";
import SearchItemCard from "@/components/search/SearchItemCard";
import { getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { district } = useUser((state) => state.location);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["product", district, searchQuery],
    queryFn: () => getProducts({ district: district, search: searchQuery }),
    enabled: searchQuery !== "",
  });

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQuery(term);
  }, 500);

  return (
    <SafeAreaView className="w-full flex-1 px-5">
      <SearchInput
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
        onPressBack={() => router.back()}
        onPressClear={() => setSearchQuery("")}
        autoFocus
      />
      {/* Product list */}
      <FlashList
        showsVerticalScrollIndicator={false}
        data={data?.results}
        renderItem={({ item }) => <SearchItemCard {...item} />}
        estimatedItemSize={100}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-10">
            <Text className="font-semibold text-secondary-muted">
              Search Items!
            </Text>
          </View>
        }
      />
      <FloatingCart className="mb-5 px-0" />
    </SafeAreaView>
  );
};

export default SearchScreen;
