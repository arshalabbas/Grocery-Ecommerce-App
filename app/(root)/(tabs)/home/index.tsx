import { View, Text, RefreshControl, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@/stores/useUserStore";
import Header from "@/components/home/Header";
import { StatusBar } from "expo-status-bar";
import ListHeader from "@/components/home/ListHeader";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getSubCategories } from "@/lib/api/product.api";
import ProductCard from "@/components/ProductCard";
import { fetchLocationfromPin } from "@/lib/api/location.api";
import { FlashList } from "@shopify/flash-list";
import { colors } from "@/constants";
import HomeContentSkeleton from "@/components/skeletons/HomeContentSkeleton";

const Home = () => {
  const userLocation = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);
  const updateDistrict = useUser((state) => state.updateDistrict);

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    title: string;
  }>({ id: "", title: "" });

  const {
    data: postLocation,
    isSuccess: isLocationSuccess,
    isLoading: isPostLocationLoading,
  } = useQuery({
    queryKey: ["location", userLocation.postalCode],
    queryFn: () => fetchLocationfromPin(userLocation.postalCode),
  });

  const {
    data: categories,
    isSuccess: isCategorySuccess,
    isLoading: isCategoriesLoading,
  } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: () => getSubCategories({ district: postLocation?.District }),
    enabled: isLocationSuccess,
  });

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["products", postLocation?.District, activeCategory.title],
    queryFn: () =>
      getProducts({
        district: postLocation?.District,
        category: activeCategory.title,
      }),
    enabled: isCategorySuccess,
  });

  useEffect(() => {
    (async () => {
      if (userLocation.postalCode !== "") return;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        router.push("/(root)/location");
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
        district: "",
      });
    })();
  }, [setLocation, userLocation]);

  useEffect(() => {
    if (
      postLocation?.District &&
      postLocation.District !== userLocation.district
    ) {
      updateDistrict(postLocation.District);
    }
  }, [postLocation?.District, updateDistrict, userLocation.district]);

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
      {isPostLocationLoading || isCategoriesLoading ? (
        <HomeContentSkeleton />
      ) : (
        <FlashList
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
          showsVerticalScrollIndicator={false}
          ListHeaderComponentStyle={{ marginBottom: 20 }}
          contentContainerStyle={{ padding: 12 }}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View className="w-full flex-1 items-center justify-center">
              {isLoading ? (
                <ActivityIndicator
                  color={colors.primary.DEFAULT}
                  size={"large"}
                />
              ) : (
                <Text className="font-pbold text-secondary-muted">
                  No Products Found!
                </Text>
              )}
            </View>
          )}
          data={data}
          numColumns={2}
          estimatedItemSize={250}
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
        />
      )}
      {/* <Loading isVisible={isLoading} /> */}
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;
