import InputField from "@/components/form/InputFeld";
import Loading from "@/components/misc/Loading";
import ActionButton from "@/components/ui/ActionButton";
import Button from "@/components/ui/Button";
import { colors, icons } from "@/constants";
import {
  deleteWishlist,
  editWishlist,
  getWishlist,
} from "@/lib/api/wishlist.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";
import z from "zod";

const EditWishlist = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isSuccess } = useQuery({
    queryKey: ["wishlist", id],
    queryFn: () => getWishlist({ id }),
  });

  const editWishlistMutation = useMutation({
    mutationFn: editWishlist,
  });

  const deleteWishlistMutation = useMutation({
    mutationFn: deleteWishlist,
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: data?.title },
    resolver: zodResolver(
      z.object({
        title: z
          .string()
          .min(3, "Title should be at least 3 characters long.")
          .max(20, "Title should not be more than 20 characters long."),
      }),
    ),
  });

  useEffect(() => {
    if (isSuccess) setValue("title", data.title);
  }, [data, isSuccess, setValue]);

  const onSubmit = ({ title }: { title: string }) => {
    editWishlistMutation.mutate(
      { id, title },
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

  const deleteWishlisthandler = () => {
    deleteWishlistMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["wishlists"] });
          router.back();
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
            Edit Wishlist
          </Text>
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Image
              source={icons.xmark}
              className="aspect-square w-6"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="mt-2 w-full flex-row">
          <ActionButton
            title="Delete"
            containerStyles={{ backgroundColor: colors.danger }}
            iconLeft={icons.trash}
            onPress={deleteWishlisthandler}
          />
        </View>
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onChange, onBlur } }) => (
            <InputField
              label="Title"
              placeholder="Enter the title"
              containerStyle="my-5"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.title && errors.title.message}
            />
          )}
        />

        <Button title="Update" onPress={handleSubmit(onSubmit)} />
      </View>
      <Loading
        isVisible={
          editWishlistMutation.isPending || deleteWishlistMutation.isPending
        }
      />
    </View>
  );
};

export default EditWishlist;
