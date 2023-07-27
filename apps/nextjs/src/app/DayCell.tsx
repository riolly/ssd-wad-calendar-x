import { PlusIcon } from "lucide-react";

import { getDateOrdinal } from "~/lib/date";
import { cn } from "~/lib/utils";

export interface DayProps {
  day: number;
  active: boolean;
}
interface Props extends DayProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DayCard({ day, active, setOpen }: Props) {
  const outsideDay = day === 0;

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
      onClick={() => setOpen(true)}
      className={cn(
        "group relative flex h-32 w-44 cursor-pointer border border-white border-opacity-30 bg-slate-900 bg-opacity-30 p-2 text-slate-50 text-opacity-70",
        active &&
          "border-2 border-blue-300 border-opacity-100 font-bold text-opacity-100",
      )}
    >
      {!outsideDay && day}
      <div className="group-focus::opacity-100 absolute -left-0.5 -top-0.5 box-content flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-blue-100 bg-gray-500/20 text-white opacity-0 backdrop-blur transition-opacity hover:opacity-100">
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
