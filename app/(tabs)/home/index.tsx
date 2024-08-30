import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@/stores/useUserStore";
import Header from "@/components/home/Header";
import { StatusBar } from "expo-status-bar";
import ListHeader from "@/components/home/ListHeader";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/product.api";
import Loading from "@/components/misc/Loading";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  const userLocation = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);

  const { data, isLoading } = useQuery({
    queryKey: ["products", userLocation.postalCode],
    queryFn: () =>
      getProducts({ query: "pincode", value: userLocation.postalCode }),
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

  return (
    <View className="flex-1 items-center bg-background">
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <FlatList
        className="w-full flex-1"
        ListHeaderComponent={<ListHeader />}
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text>Empty List</Text>}
        data={data}
        numColumns={2}
        renderItem={({ index, item }) => (
          <ProductCard
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
