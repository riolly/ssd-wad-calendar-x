import { PlusIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { useSchedules } from "../utils/store";
import type { Dated, PrevNextDate, Schedule } from "../utils/store";

interface Props extends Dated {
  isToday: boolean;
  isSelected: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: () => void;
}
export default function DayCell({
  isToday,
  isSelected,
  setOpen,
  setSelectedDate,
  ...dated
}: Props) {
  function handleClick() {
    setSelectedDate();
    setOpen(true);
  }

  const [schedules, dispatch] = useSchedules();

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative flex h-32 w-44 cursor-pointer border border-white border-opacity-30 bg-slate-900 bg-opacity-30 p-2 text-slate-50 text-opacity-70",
        isToday &&
          "border-2 border-blue-300 border-opacity-100 font-bold text-opacity-100",
      )}
    >
      <span className={cn(isToday && "underline underline-offset-4")}>
        {dated.date}
      </span>
      {schedules.map((s) => (
        <div key={s.id}>
          <p>{s.name}</p>
          <time>{s.time}</time>
          <span>
            {s.invitations?.map((email, i) => (
              <span key={`${i}-${email}`}>{email}</span>
            ))}
          </span>
        </div>
      ))}
      <div
        className="absolute -left-0.5 -top-0.5 box-content flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-blue-100 bg-gray-500/20 text-white opacity-0 backdrop-blur transition-opacity hover:opacity-100 group-focus:opacity-100 data-[selected=true]:bg-blue-500 data-[selected=true]:opacity-100"
        data-selected={isSelected}
      >
        <span className="flex">
          <span className="text-5xl">{dated.date}</span>
          <span>{dated.dateOrdinal}</span>
        </span>
        <span className="flex gap-1">
          <PlusIcon />
          <span>Add schedule</span>
        </span>
      </div>
    </button>
  );
}

export function PrevNextDateCell(date: PrevNextDate) {
  return (
    <div className="h-32 w-44 border border-white border-opacity-30 bg-gray-500 bg-opacity-30 p-2 text-gray-500">
      {date.date}
    </div>
  );
}
