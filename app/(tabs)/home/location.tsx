import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { icons } from "@/constants";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";
import InputField from "@/components/form/InputFeld";
import Divider from "@/components/ui/Divider";
import { useUser } from "@/stores/useUserStore";
import * as Location from "expo-location";
import { useMutation } from "@tanstack/react-query";
import { fetchLocationfromPin } from "@/lib/api/location.api";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/misc/Loading";

const LocationScreen = () => {
  const { postalCode } = useUser((state) => state.location);
  const setLocation = useUser((state) => state.setLocation);

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

    setLocation({
      postalCode: address[0].postalCode || "",
      place: address[0].district || "",
      city: address[0].city || "",
    });

    router.back();
  };

  const onSubmit = ({ pincode }: { pincode: string }) => {
    locationFromPinMutation.mutate(pincode, {
      onSuccess: (data) => {
        setLocation({
          postalCode: pincode,
          place: data.District,
          city: data.Block,
        });

        router.back();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      if (postalCode !== "") {
        navigation.dispatch(e.data.action);
      }
      return;
    });
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
      <View className="flex-1 items-center p-5">
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
          variant={"solid-secondary"}
          onPress={handleSubmit(onSubmit)}
          containerStyles={{ marginVertical: 20 }}
        />
        <Divider />
        <View className="w-full">
          <Text className="font-pbold text-lg">Saved Addresses</Text>
        </View>
      </View>
      <Loading isVisible={locationFromPinMutation.isPending} />
      <StatusBar style="dark" backgroundColor="white" />
    </SafeAreaView>
  );
};

export default LocationScreen;
