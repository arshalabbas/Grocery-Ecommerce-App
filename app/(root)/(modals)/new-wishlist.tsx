import InputField from "@/components/form/InputFeld";
import Loading from "@/components/misc/Loading";
import Button from "@/components/ui/Button";
import { icons } from "@/constants";
import { createWishlist } from "@/lib/api/wishlist.api";
import { useUser } from "@/stores/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";
import { z } from "zod";

const NewWishlist = () => {
  const queryClient = useQueryClient();
  const { district } = useUser((state) => state.location);
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: createWishlist,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: "" },
    resolver: zodResolver(
      z.object({
        title: z
          .string()
          .min(3, "Title should be at least 3 characters long.")
          .max(20, "Title should not be more than 20 characters long."),
      }),
    ),
  });

  const onSubmit = ({ title }: { title: string }) => {
    createMutation.mutate(
      { title, district },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["wishlists"] });
          router.back();
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <View className="flex-1 justify-end bg-black/20">
      <Stack.Screen
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      />
      <View className="w-full rounded-t-3xl bg-background p-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-pbold text-xl text-secondary">
            New Wishlist
          </Text>
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Image
              source={icons.xmark}
              className="aspect-square w-6"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Title"
              placeholder="Enter the name"
              containerStyle="my-5"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.title && errors.title.message}
            />
          )}
        />

        <Button title="Create" onPress={handleSubmit(onSubmit)} />
      </View>
      <Loading isVisible={createMutation.isPending} />
    </View>
  );
};

export default NewWishlist;
