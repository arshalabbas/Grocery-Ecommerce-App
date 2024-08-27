import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

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
