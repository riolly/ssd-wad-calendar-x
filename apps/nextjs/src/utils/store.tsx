import type { Draft, Immutable } from "immer";
import { useImmerReducer } from "use-immer";

import { generateId } from "@acme/db/utils";

import type { Ordinal } from "~/lib/date";
import { getDated, getDateOrdinal, getNumberOfDays } from "~/lib/date";

// --- CALENDAR ---

export type PrevNextDate = Pick<Dated, "id" | "date" | "dateOrdinal">;

interface Calendar {
  selectedDate: Dated | null;
  prevDates: PrevNextDate[];
  nextDates: PrevNextDate[];
}
type CalendarReducer = Immutable<Calendar>;
interface CalendarAction {
  type: "selectDate";
  dated: Dated;
}

function calendarReducer(
  calendar: Draft<CalendarReducer>,
  action: CalendarAction,
) {
  switch (action.type) {
    case "selectDate": {
      calendar.selectedDate = action.dated;
      break;
    }

    default:
      break;
  }
}

function initCalendarReducer(toDated: Dated): Calendar {
  const firstDate = new Date(toDated.dateObj.setDate(1));
  const prevFillDaysLenght = firstDate.getDay(); // as gap before the first day
  const prevMonthDaysLenght = getNumberOfDays(
    toDated.month === 1 ? 12 : toDated.month - 1,
  );
  const prevDates = Array.from({ length: prevFillDaysLenght }, (_, i) => {
    const date = prevMonthDaysLenght - (prevFillDaysLenght - (i + 1));
    return {
      id: generateId(),
      date: date,
      dateOrdinal: getDateOrdinal(date),
    };
  }) as PrevNextDate[];

  const incompleteLength = prevFillDaysLenght + getNumberOfDays(toDated.month);
  const nextMonthDaysLenght =
    Math.ceil(incompleteLength / 7) * 7 - incompleteLength;
  const nextDates = Array.from({ length: nextMonthDaysLenght }, (_, i) => {
    return {
      id: generateId(),
      date: i + 1,
      dateOrdinal: getDateOrdinal(i + 1),
    };
  }) as PrevNextDate[];
  return { selectedDate: null, prevDates, nextDates };
}

export function useCalendar(toDated: Dated) {
  const [calendar, dispatch] = useImmerReducer<
    CalendarReducer,
    CalendarAction,
    Dated
  >(calendarReducer, toDated, initCalendarReducer);
  return [calendar, dispatch] as const;
}

// --- DATE ---

export interface Dated {
  id: string;
  dateObj: Date;
  date: number;
  dayStr: string;
  dateOrdinal: Ordinal;
  month: number;
  monthStr: string;
  year: number;
}
type DatedReducer = Immutable<Dated[]>;
interface DatedAction {
  type: "nextMonth" | "prevMonth";
}

function datedReducer(dated: Draft<DatedReducer>, action: DatedAction) {
  // TODO: crete next prev month
  switch (action.type) {
    case "nextMonth":
      console.log(dated);
      break;

    case "prevMonth":
      console.log(dated);
      break;

    default:
      break;
  }
}

function initDatedReducer(todayDate: Date): Dated[] {
  const tDate = new Date(todayDate);
  const daysLength = getNumberOfDays(todayDate);

  return Array.from({ length: daysLength }, (_, i) => {
    tDate.setDate(i + 1);
    return getDated(new Date(tDate));
  });
}

export function useDateds() {
  const [dateds, dispatch] = useImmerReducer<DatedReducer, DatedAction, Date>(
    datedReducer,
    new Date(),
    initDatedReducer,
  );
  return [dateds, dispatch] as const;
}

// --- SCHEDULE ---

// export interface ScheduleEntity {
//   id: string;
//   name: string;
//   time: string;
//   dayId: string;
//   invitations?: string[];
// }
