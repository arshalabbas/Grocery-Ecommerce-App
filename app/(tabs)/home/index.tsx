import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs, router } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@/stores/useUserStore";
import Header from "@/components/home/Header";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const userLocation = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);

  useEffect(() => {
    (async () => {
      if (userLocation.postalCode !== "") return;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // alert("Access denied");
        router.push("/location");
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
    <View>
      <Tabs.Screen
        options={{
          header: () => <Header />,
        }}
      />
      <Text>Home</Text>
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;
