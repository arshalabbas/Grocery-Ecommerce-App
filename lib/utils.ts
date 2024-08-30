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
