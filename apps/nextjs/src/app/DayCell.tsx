import { PlusIcon } from "lucide-react";

import { getDateOrdinal } from "~/lib/date";
import { cn } from "~/lib/utils";

export interface DayProps {
  day: number;
  isToday: boolean;
  selectedDay: number | null;
}
interface Props extends DayProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number | null>>;
}
export default function DayCell({
  day,
  isToday,
  selectedDay,
  setOpen,
  setSelectedDay,
}: Props) {
  const outsideDay = day === 0;

  function handleClick() {
    setSelectedDay(day);
    setOpen(true);
  }

  if (outsideDay) {
    return (
      <div
        className="h-32 w-44 border border-white border-opacity-30 bg-gray-500 bg-opacity-30"
        data-outside={outsideDay}
      />
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative flex h-32 w-44 cursor-pointer border border-white border-opacity-30 bg-slate-900 bg-opacity-30 p-2 text-slate-50 text-opacity-70",
        isToday &&
          "border-2 border-blue-300 border-opacity-100 font-bold text-opacity-100",
      )}
    >
      {!outsideDay && day}
      <div
        className="absolute -left-0.5 -top-0.5 box-content flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-blue-100 bg-gray-500/20 text-white opacity-0 backdrop-blur transition-opacity hover:opacity-100 group-focus:opacity-100 data-[selected=true]:bg-blue-500 data-[selected=true]:opacity-100"
        data-selected={selectedDay === day}
      >
        <span className="flex">
          <span className="text-5xl">{day}</span>
          <span>{getDateOrdinal(day)}</span>
        </span>
        <span className="flex gap-1">
          <PlusIcon />
          <span>Add event</span>
        </span>
      </div>
    </button>
  );
}
