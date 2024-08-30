import phone from "@/assets/icons/phone.svg";
import india from "@/assets/icons/india.png";
import location from "@/assets/icons/location.svg";
import cart from "@/assets/icons/cart.svg";
import plus from "@/assets/icons/plus.svg";
import search from "@/assets/icons/search.svg";
import angleDown from "@/assets/icons/angle-down.svg";
import gps from "@/assets/icons/gps.svg";
import bag from "@/assets/icons/bag.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import info from "@/assets/icons/info.svg";

// Action Icons
// Active
import homeActive from "@/assets/icons/home-active.svg";
import wishlistActive from "@/assets/icons/wishlist-active.svg";
import ordersActive from "@/assets/icons/orders-active.svg";
import profileActive from "@/assets/icons/profile-active.svg";
import heartActive from "@/assets/icons/heart-active.svg";
// Inactive
import homeInactive from "@/assets/icons/home-inactive.svg";
import wishlistInactive from "@/assets/icons/wishlist-inactive.svg";
import ordersInactive from "@/assets/icons/orders-inactive.svg";
import profileInactive from "@/assets/icons/profile-inactive.svg";
import heartInactive from "@/assets/icons/heart-inactive.svg";

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

const heart = {
  active: heartActive,
  inactive: heartInactive,
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
  angleDown,
  arrowLeft,
  gps,
  bag,
  heart,
  info,
};
