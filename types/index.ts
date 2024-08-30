import { ImageSource } from "expo-image";

export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  on_boarded: boolean;
  created: Date;
}

export interface Location {
  postalCode: string;
  place: string;
  city: string;
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

export interface Category {
  id: string;
  title: string;
}

export interface SubCategory {
  id: string;
  title: string;
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
  sub_category: SubCategory;
}
