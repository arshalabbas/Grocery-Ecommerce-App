import { TimeData } from "@/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

// format time from the milliseconds
export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  // Construct the formatted time
  let formattedTime = `${minutes}:${seconds}`;
  if (hours > 0) {
    formattedTime = `${hours.toString().padStart(2, "0")}:${formattedTime}`;
  }

  return formattedTime;
};

// format the time into words from milliseconds
export const formatTimeInWords = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) {
      formattedTime += ` ${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  } else if (minutes > 0) {
    formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return formattedTime;
};

// format date and time
export const formatDate = (date: Date | string) => {
  const currentDate = typeof date === "string" ? new Date(date) : date;

  let day = currentDate.getDate().toString().padStart(2, "0");
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let year = currentDate.getFullYear();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes().toString().padStart(2, "0");
  let seconds = currentDate.getSeconds().toString().padStart(2, "0");

  // Convert to 12-hour format
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Adjust hours for 12-hour format, keeping 12 as 12 instead of 0
  let formattedHours = hours.toString().padStart(2, "0");

  let formattedDate = `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${period}`;

  return formattedDate;
};

type Unit = "kg" | "g" | "ml" | "ltr" | string;

export const formatQuantity = (unit: Unit, quantity: number): string => {
  if (["kg", "ltr"].includes(unit)) return `${quantity} ${unit}`;

  if (["g", "ml"].includes(unit) && quantity < 1000)
    return `${quantity} ${unit}`;

  if (["g", "ml"].includes(unit) && quantity >= 1000)
    return `${(quantity / 1000).toFixed(1)} ${unit === "g" ? "kg" : "ltr"}`;

  return `${quantity} ${unit}`;
};

// returns the arriving message from the time data
export const arrivingMessage = (time: TimeData | undefined) => {
  if (!time) return;
  // checking if the time is more than 4:30 PM
  if (time.hour > 16 || (time.hour === 16 && time.minute > 30))
    return "Arriving Tomorrow";
  else return "Arriving Today";
};
