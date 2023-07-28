import { generateId } from "@acme/db/utils";

export type Ordinal = "st" | "nd" | "rd" | "th";
export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthString(date: Date) {
  return MONTHS[date.getMonth()]!;
}

export function getDayString(date: Date) {
  return DAYS[date.getDay()]!;
}

export const getDateOrdinal = (date: Date | number): Ordinal => {
  const d = typeof date === "number" ? date : date.getDay();
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function getNumberOfDays(dateOrMonth: Date | number) {
  const daysLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const idx =
    typeof dateOrMonth === "number" ? dateOrMonth : dateOrMonth.getMonth();

  return daysLength[idx]!;
}

export function getDated(date: Date) {
  return {
    id: generateId(),
    dateObj: date,
    date: date.getDate(),
    dateOrdinal: getDateOrdinal(date),
    dayStr: getDayString(date),
    month: date.getMonth(),
    monthStr: getMonthString(date),
    year: date.getFullYear(),
  };
}
