import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@/stores/useUserStore";
import Header from "@/components/home/Header";
import { StatusBar } from "expo-status-bar";
import ListHeader from "@/components/home/ListHeader";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getSubCategories } from "@/lib/api/product.api";
import Loading from "@/components/misc/Loading";
import ProductCard from "@/components/ProductCard";
import { fetchLocationfromPin } from "@/lib/api/location.api";

const Home = () => {
  const userLocation = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });

  const { data: location, isSuccess: isLocationSuccess } = useQuery({
    queryKey: ["location", userLocation.postalCode],
    queryFn: () => fetchLocationfromPin(userLocation.postalCode),
  });

  const { data: categories, isSuccess: isCategorySuccess } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories({ district: location?.District }),
    enabled: isLocationSuccess,
  });

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["products", location?.District, activeCategory.title],
    queryFn: () =>
      getProducts({
        district: location?.District,
        category: activeCategory.title,
      }),
    enabled: isCategorySuccess,
  });

  useEffect(() => {
    (async () => {
      if (userLocation.postalCode !== "") return;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        router.push("/(tabs)/home/location");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLocation({
        postalCode: address[0].postalCode || "",
        place: address[0].district || "",
        city: address[0].city || "",
      });
    })();
  }, [setLocation, userLocation]);

  const onPressCategory = (category: { id: string; title: string }) => {
    setActiveCategory(category);
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <FlatList
        className="w-full flex-1"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <ListHeader
            subCategories={categories || []}
            setActiveCategory={onPressCategory}
            activeCategory={activeCategory}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        contentContainerStyle={{ padding: 12 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Empty List</Text>}
        data={data}
        numColumns={2}
        renderItem={({ index, item }) => (
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
      <Loading isVisible={isLoading} />
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;
