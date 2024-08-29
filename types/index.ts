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
