import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to calculate number of days between two dates
export const getDaysBetweenDates = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};


export function getBookingStatus(startDate: string, endDate: string): string {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > today) {
    return "upcoming";
  } else if (end < today) {
    return "past";
  } else {
    return "current";
  }
}
