import { ImageSource } from "expo-image";
import icons from "./icons";

interface ProfileOption {
  title: string;
  icon?: ImageSource;
  route: string;
}

const profileOptions: ProfileOption[] = [
  {
    title: "Edit Profile",
    icon: icons.edit,
    route: "/edit-profile",
  },
  {
    title: "Cart",
    icon: icons.bag,
    route: "/cart",
  },
  {
    title: "Addresses",
    icon: icons.locationOutline,
    route: "/addresses",
  },
  {
    title: "Order History",
    icon: icons.orders.inactive,
    route: "/orders",
  },
  {
    title: "Customer Support",
    icon: icons.support,
    route: "/customer-support",
  },
  {
    title: "Terms and Conditions",
    route: "",
  },
  {
    title: "Privacy Policy",
    route: "",
  },
  {
    title: "Open Source License",
    route: "",
  },
];

export { profileOptions };
