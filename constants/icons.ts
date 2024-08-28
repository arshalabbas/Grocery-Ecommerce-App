import phone from "@/assets/icons/phone.svg";
import india from "@/assets/icons/india.png";
import location from "@/assets/icons/location.svg";
import cart from "@/assets/icons/cart.svg";
import plus from "@/assets/icons/plus.svg";
import search from "@/assets/icons/search.svg";

// TabBar Icons
// Active
import homeActive from "@/assets/icons/home-active.svg";
import wishlistActive from "@/assets/icons/wishlist-active.svg";
import ordersActive from "@/assets/icons/orders-active.svg";
import profileActive from "@/assets/icons/profile-active.svg";
// Inactive
import homeInactive from "@/assets/icons/home-inactive.svg";
import wishlistInactive from "@/assets/icons/wishlist-inactive.svg";
import ordersInactive from "@/assets/icons/orders-inactive.svg";
import profileInactive from "@/assets/icons/profile-inactive.svg";

const home = {
  active: homeActive,
  inactive: homeInactive,
};
const wishlist = {
  active: wishlistActive,
  inactive: wishlistInactive,
};
const orders = {
  active: ordersActive,
  inactive: ordersInactive,
};
const profile = {
  active: profileActive,
  inactive: profileInactive,
};

export default {
  phone,
  india,
  home,
  wishlist,
  orders,
  profile,
  location,
  cart,
  plus,
  search,
};
