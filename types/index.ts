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
