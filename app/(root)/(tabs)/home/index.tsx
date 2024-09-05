import { View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@/stores/useUserStore";
import Header from "@/components/home/Header";
import { StatusBar } from "expo-status-bar";
import ListHeader from "@/components/home/ListHeader";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getSubCategories } from "@/lib/api/product.api";
import { fetchLocationfromPin } from "@/lib/api/location.api";
import HomeContentSkeleton from "@/components/skeletons/HomeContentSkeleton";
import FloatingCart from "@/components/cart/FloatingCart";
import ProductList from "@/components/product/ProductList";

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
    queryKey: ["sub-categories", postLocation?.District],
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
        <ProductList
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
          ListHeaderComponentStyle={{ marginBottom: 10 }}
          data={data}
          isLoading={isLoading}
        />
      )}
      {/* <Loading isVisible={isLoading} /> */}
      <FloatingCart className="absolute bottom-0 mb-2" />
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;
