import SearchInput from "@/components/form/SearchInput";
import { getProducts } from "@/lib/api/product.api";
import { useUser } from "@/stores/useUserStore";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebouncedCallback } from "use-debounce";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { district } = useUser((state) => state.location);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["product", district, searchQuery],
    queryFn: () => getProducts({ category: searchQuery }),
    enabled: searchQuery !== "",
  });

  const handleSearch = useDebouncedCallback((term) => {
    setSearchQuery(term);
  }, 500);

  return (
    <SafeAreaView className="flex-1 bg-background px-5">
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
        data={data}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        estimatedItemSize={100}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
