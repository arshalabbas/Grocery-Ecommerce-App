import { QuickShake } from "@/lib/animations";
import { useEffect } from "react";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const ShakyError = ({ children }: { children: string }) => {
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  return (
    <Animated.Text
      entering={QuickShake}
      // exiting={BounceOut}
      className="mt-5 font-pmedium text-danger"
    >
      {children}
    </Animated.Text>
  );
};

export default ShakyError;
