import { Keyframe } from "react-native-reanimated";

export const QuickShake = new Keyframe({
  0: {
    transform: [{ translateX: 0 }],
  },
  10: {
    transform: [{ translateX: -10 }],
  },
  20: {
    transform: [{ translateX: 10 }],
  },
  30: {
    transform: [{ translateX: -10 }],
  },
  40: {
    transform: [{ translateX: 10 }],
  },
  50: {
    transform: [{ translateX: -10 }],
  },
  60: {
    transform: [{ translateX: 10 }],
  },
  70: {
    transform: [{ translateX: -10 }],
  },
  80: {
    transform: [{ translateX: 10 }],
  },
  90: {
    transform: [{ translateX: -10 }],
  },
  100: {
    transform: [{ translateX: 0 }],
  },
});
