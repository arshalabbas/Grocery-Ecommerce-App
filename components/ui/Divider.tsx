import { View, Text } from "react-native";

const Divider = ({ children }: { children?: string }) => {
  return (
    <View className="my-4 w-full flex-row items-center">
      <View className="h-[.5px] flex-1 bg-secondary-muted/30" />
      {children && (
        <>
          <Text
            className="mx-4 font-psemibold"
            style={{ includeFontPadding: false, textAlignVertical: "center" }}
          >
            {children}
          </Text>
          <View className="h-[.5px] flex-1 bg-secondary-muted/50" />
        </>
      )}
    </View>
  );
};

export default Divider;
