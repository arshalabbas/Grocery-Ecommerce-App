import { ImageSource } from "expo-image";
import icons from "./icons";
import { Href } from "expo-router";

interface ProfileOption {
  title: string;
  icon?: ImageSource;
  route: Href;
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
    route: "/(root)/cart/",
  },
  {
    title: "Addresses",
    icon: icons.locationOutline,
    route: "/addresses",
  },
  {
    title: "Order History",
    icon: icons.orders.inactive,
    route: "/(root)/(tabs)/orders",
  },
  {
    title: "Customer Support",
    icon: icons.support,
    route: "/customer-support",
  },
  {
    title: "Terms and Conditions",
    route: "https://example.com/terms-and-conditions",
  },
  {
    title: "Privacy Policy",
    route: "https://example.com/privacy-policy",
  },
  {
    title: "Open Source License",
    route: "https://example.com/open-source-license",
  },
];

export { profileOptions };
