import { ImageSource } from "expo-image";

export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  on_boarded: boolean;
  created: Date;
}

// Location Types
export interface Location {
  id?: string;
  postalCode: string;
  place: string;
  city: string;
  district: string;
}

export interface PostOfficeData {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

// Product types
export interface Category {
  id: string;
  title: string;
}

export interface SubCategory {
  id: string;
  title: string;
  emoji: string;
  image: string;
  category: Category;
}

export interface ProductData {
  id: string;
  image: ImageSource;
  title: string;
  price: number;
  unit: string;
  stock: number;
  discount: number;
  mrp: number;
  fixed_quantity: number;
  sub_category: SubCategory;
  in_wishlist: boolean;
}

export interface ProductCursor {
  next: string | null;
  previous: string | null;
  results: ProductData[];
}

// Wishlist Types

export interface WishListItem {
  id: string;
  image: ImageSource;
  product: ProductData;
  quantity: number;
  total_price: number;
}
export interface Wishlist {
  id: string;
  title: string;
  items: WishListItem[];
  number_of_items: number;
  total_price: number;
}

// Address Types
export interface Address {
  id: string;
  name: string;
  phone: string;
  alt_phone: string;
  city_or_town: string;
  pin: string;
  district: string;
  landmark: string;
}

// orders types
export type StatusFilter =
  | "all"
  | "processing"
  | "delivered"
  | "cancelled"
  | "packed";

export interface PlaceOrder {
  addressId: string;
  items: {
    id: string;
    quantity: number;
  }[];
}

export interface Order {
  id: string;
  order_id: string;
  address: Address;
  order_date: Date;
  status: StatusFilter;
  buy_price: number;
  can_cancel: boolean;
  items: {
    product: ProductData;
    quantity: number;
    buy_price: number;
    buy_total_price: number;
  }[];
}

export interface FewerOrder {
  id: string;
  order_id: string;
  order_date: Date;
  status: StatusFilter;
  buy_price: number;
  can_cancel: boolean;
  items: string[];
  total_quantity: number;
}
