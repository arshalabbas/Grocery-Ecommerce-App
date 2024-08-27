import { logoutUser } from "@/lib/api/user.api";
import { useAuth } from "@/stores/useAuthStore";
import { useUser } from "@/stores/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
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
    <View className="flex-1 items-center justify-center">
      <Text className="m-3 p-4 font-pblack text-xl">
        {user.name} - {user.phone}
      </Text>
      <TouchableOpacity onPress={() => logoutMutation.mutate()}>
        <Text className="font-pmedium text-lg text-danger">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
