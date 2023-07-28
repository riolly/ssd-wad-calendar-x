import type { Draft, Immutable } from "immer";
import { useImmerReducer } from "use-immer";

import type { Ordinal } from "~/lib/date";
import { getDated, getNumberOfDays } from "~/lib/date";

// --- CALENDAR ---

interface Calendar {
  selectedDate: Dated | null;
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
    // TODO: set todayDateId on mount

    default:
      break;
  }
}

export function useCalendar() {
  const [calendar, dispatch] = useImmerReducer<CalendarReducer, CalendarAction>(
    calendarReducer,
    { selectedDate: null },
  );
  return [calendar, dispatch] as const;
}

// --- DATE ---

export interface Dated {
  id: string;
  dayObj: Date;
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

// function initCalender(date: Date) {
//   const firstDate = new Date(date.setDate(1));

//   const genDayDef = () => ({
//     id: generateId,
//     day: 0,
//     isToday: false,
//   });

//   const calLength = getNumberOfDays(date)!;

//   const daysPrev = Array(firstDate.getDay()).fill(genDayDef()) as Day[];

//   let daysAftr: Day[] = [];
//   const incompleteLength = daysPrev.length + daysCurr.length;
//   if (incompleteLength % 7 !== 0) {
//     const t = Math.ceil(incompleteLength / 7);
//     daysAftr = Array(t * 7 - incompleteLength).fill(genDayDef()) as Day[];
//   }

//   return [...daysPrev, ...daysCurr, ...daysAftr];
// }
