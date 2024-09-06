import { StatusFilter } from "@/types";

const colors: {
  primary: Record<string | number, string>;
  secondary: Record<string | number, string>;
  background: string;
  danger: string;
  success: string;
  status: Record<StatusFilter, string>;
} = {
  primary: {
    DEFAULT: "#FFA400",
    50: "#FFF6E6",
    100: "#FFF1D9",
    200: "#FFE3B0",
  },
  secondary: {
    DEFAULT: "#1F1F1F",
    muted: "#979797",
  },
  background: "#F7F7F7",
  danger: "#FF5652",
  success: "#33AD75",
  status: {
    processing: "",
    packed: "",
    delivered: "",
    cancelled: "",
    all: "",
  },
};

const status: Record<StatusFilter, string> = {
  processing: colors.primary.DEFAULT,
  packed: colors.primary.DEFAULT,
  delivered: colors.success,
  cancelled: colors.danger,
  all: colors.secondary.muted,
};

colors.status = status;

export default colors;
