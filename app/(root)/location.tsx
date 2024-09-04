import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { colors, icons } from "@/constants";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";
import InputField from "@/components/form/InputFeld";
import Divider from "@/components/ui/Divider";
import { useUser } from "@/stores/useUserStore";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchLocationfromPin, getAllAddresses } from "@/lib/api/location.api";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/misc/Loading";
import { FlashList } from "@shopify/flash-list";

const LocationScreen = () => {
  const { postalCode } = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);
  const navigationRef = useRef<() => void>();

  const { data, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAllAddresses({}),
  });

  const router = useRouter();
  const navigation = useNavigation();

  const locationFromPinMutation = useMutation({
    mutationFn: fetchLocationfromPin,
  });

  const { handleSubmit, control } = useForm<{ pincode: string }>({
    defaultValues: {
      pincode: postalCode || "",
    },
    resolver: zodResolver(z.object({ pincode: z.string() })),
  });

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Access denied"); // TODO: Handle the alert
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    locationFromPinMutation.mutate(address[0].postalCode || "", {
      onSuccess: (data) => {
        setLocation({
          postalCode: address[0].postalCode || "",
          place: address[0].district || "",
          city: address[0].city || "",
          district: data.District,
        });

        if (navigationRef.current) navigationRef.current();

        router.back();
      },
    });
  };

  const onPressSavedAddress = (address: {
    postalCode: string;
    place: string;
    city: string;
    district: string;
  }) => {
    setLocation({
      postalCode: address.postalCode,
      place: address.district,
      city: address.city,
      district: address.district,
    });

    if (navigationRef.current) navigationRef.current();

    router.back();
  };

  const onSubmit = ({ pincode }: { pincode: string }) => {
    locationFromPinMutation.mutate(pincode, {
      onSuccess: (data) => {
        setLocation({
          postalCode: pincode,
          place: data.District,
          city: data.Block,
          district: data.District,
        });

        if (navigationRef.current) navigationRef.current();

        router.back();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    navigationRef.current = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      if (postalCode !== "") {
        navigation.dispatch(e.data.action);
      }
      return;
    });

    return () => {
      if (navigationRef.current) {
        navigationRef.current();
      }
    };
  }, [navigation, postalCode]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="w-full border-b-[.5px] border-secondary-muted/50 bg-white p-5">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Image
            source={icons.angleDown}
            className="mr-2 aspect-square w-4"
            contentFit="contain"
          />
          <Text className="font-pbold text-xl text-secondary">
            Select Location
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1 p-5"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Button
          title="Use current location"
          icon={icons.gps}
          variant={"solid-white"}
          onPress={fetchLocation}
        />
        {/* Or Devider */}
        <Divider>OR</Divider>
        <Controller
          control={control}
          name="pincode"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Pin Code"
              keyboardType="number-pad"
              placeholder="000000"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Button
          title="Save"
          variant={"solid-primary"}
          onPress={handleSubmit(onSubmit)}
          containerStyles={{ marginVertical: 20 }}
        />
        <Divider />
        <View className="w-full flex-1">
          <Text className="font-pbold text-lg">Saved Addresses</Text>
          <FlashList
            data={data?.toReversed()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="mb-4 w-full flex-row space-x-2 rounded-xl bg-white p-4"
                activeOpacity={0.7}
                onPress={() =>
                  onPressSavedAddress({
                    postalCode: item.pin,
                    city: item.city_or_town,
                    district: item.district,
                    place: item.city_or_town,
                  })
                }
              >
                <Image
                  source={icons.location}
                  className="aspect-square w-6"
                  contentFit="contain"
                />
                <View>
                  <Text className="font-pbold text-lg text-secondary">
                    {item.name}
                  </Text>
                  <Text className="font-psemibold text-xs text-secondary-muted">
                    {item.phone}
                  </Text>
                  <Text className="font-pmedium text-xs text-secondary-muted">
                    {item.pin} • {item.district}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={50}
            ListHeaderComponent={() => (
              <Button
                title="New Address"
                variant={"outline-primary"}
                size={"md"}
                onPress={() => router.push("/address/new-address")}
              />
            )}
            ListHeaderComponentStyle={{ marginVertical: 20 }}
            ListEmptyComponent={() => (
              <View className="w-full items-center">
                {isLoading ? (
                  <ActivityIndicator
                    color={colors.primary.DEFAULT}
                    size={"small"}
                  />
                ) : (
                  <Text className="font-psemibold text-secondary-muted">
                    You haven't added any addresses.
                  </Text>
                )}
              </View>
            )}
            ListFooterComponent={<View className="my-4" />}
          />
        </View>
      </ScrollView>
      <Loading isVisible={locationFromPinMutation.isPending} />
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

export default LocationScreen;
