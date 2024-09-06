import { View, Text, TextProps } from "react-native";

interface Props extends TextProps {
  bullet?: string;
}

const ListItem = ({ bullet = "-", children, ...props }: Props) => {
  return (
    <View className="my-1 w-full flex-row items-start space-x-1">
      <Text
        className="text-secondary-muted"
        style={{ includeFontPadding: false, textAlignVertical: "center" }}
      >
        {bullet}
      </Text>
      <Text
        className={"font-pmedium text-secondary-muted"}
        style={{ includeFontPadding: false, textAlignVertical: "center" }}
        {...props}
      >
        {children}
      </Text>
    </View>
  );
};

export default ListItem;
