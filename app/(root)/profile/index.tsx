import Loading from "@/components/misc/Loading";
import OptionsListItem from "@/components/profile/OptionsListItem";
import ScreenHeader from "@/components/ScreenHeader";
import ActionButton from "@/components/ui/ActionButton";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { colors } from "@/constants";
import { profileOptions } from "@/constants/profile";
import { logoutUser } from "@/lib/api/user.api";
import { useAuth } from "@/stores/useAuthStore";
import { useUser } from "@/stores/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";

const Profile = () => {
  const { user, clearUser } = useUser();
  const signOut = useAuth((state) => state.signOut);

  // Logout Mock
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      console.log(data);
      clearUser();
      signOut();
    },
    onError: (error) => {
      console.log(error.data);
    },
  });

  return (
    <View className="w-full flex-1 items-center justify-center bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <ScreenHeader title="Profile" />,
        }}
      />
      <FlatList
        data={profileOptions}
        keyExtractor={(item) => item.title}
        className="w-full"
        ListHeaderComponent={
          <View className="my-5 w-full flex-row items-center space-x-4 rounded-lg bg-white px-2 py-5">
            <View className="aspect-square w-16 overflow-hidden rounded-full border border-primary">
              <Image
                className="h-full w-full"
                source={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.name.toLowerCase().replace(" ", "-")}&backgroundColor=transparent&shapeColor=f88c49`}
              />
            </View>
            <View>
              <Text className="font-psemibold text-xl text-secondary">
                {user.name}
              </Text>
              <Text className="font-medium text-secondary-muted">
                {user.phone}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <OptionsListItem title={item.title} icon={item.icon} />
        )}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={
          <View className="mb-5 mt-10">
            <ActionButton
              title="Logout"
              containerStyles={{ backgroundColor: colors.danger }}
              disabled={logoutMutation.isPending}
              onPress={() => logoutMutation.mutate()}
            />
          </View>
        }
      />
      <Loading isVisible={logoutMutation.isPending} />
      <StatusBar style="dark" />
    </View>
  );
};

export default Profile;
