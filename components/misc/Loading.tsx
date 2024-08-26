import { View, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Loading = ({ isVisible }: { isVisible: boolean }) => {
  // if (!isVisible) return null;

  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
      visible={isVisible}
    >
      <View className="flex-1 items-center justify-center">
        <View className="rounded-xl bg-white p-10">
          <ActivityIndicator color={"orange"} size={"large"} />
        </View>
      </View>
      <StatusBar backgroundColor="transparent" />
    </Modal>
  );
};

export default Loading;
