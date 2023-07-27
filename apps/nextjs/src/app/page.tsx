import { PlusIcon } from "lucide-react";

import { DAYS, getMonthString, getNumberOfDays } from "~/lib/date";

export default function HomePage() {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const monthStr = getMonthString(todayDate);

  const firstDate = new Date(todayDate.setDate(1));

  const daysPrev = Array(firstDate.getDay()).fill({
    day: 0,
    active: false,
  }) as DayProps[];
  const daysCurr = Array.from(
    { length: getNumberOfDays(todayDate)! },
    (_, i) => ({ day: i + 1, active: todayDate.getDay() === i + 1 }),
  );
  let daysAftr: DayProps[] = [];
  if ((daysPrev.length + daysCurr.length) % 7 !== 0) {
    const t = Math.ceil((daysPrev.length + daysCurr.length) / 7);
    daysAftr = Array(t * 7 - (daysPrev.length + daysCurr.length)).fill({
      day: 0,
      active: false,
    }) as DayProps[];
  }
  const daysObj = [...daysPrev, ...daysCurr, ...daysAftr];

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-950 to-slate-900 text-white">
      <div className="container flex flex-col items-center py-12">
        <h1 className="mb-8 text-4xl font-semibold">
          {monthStr} {year}
        </h1>

        <div className="grid grid-cols-7 overflow-clip rounded-t-xl">
          {DAYS.map((day) => (
            <DayHeading key={day} day={day} />
          ))}
          {daysObj.map((item, i) => (
            <DayCard key={`${i}-${item.day}`} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}

function DayHeading(props: { day: string }) {
  return (
    <div className="flex justify-center bg-blue-100/75 py-2 text-lg font-semibold text-slate-800">
      {props.day}
    </div>
  );
}

interface DayProps {
  day: number;
  active: boolean;
}
function DayCard({ day, active }: DayProps) {
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
    <div
      className={cn(
        "relative h-32 w-44 cursor-pointer border border-white border-opacity-30 bg-slate-900 bg-opacity-30 p-2 text-slate-50 text-opacity-70",
        active &&
          "border-2 border-blue-300 border-opacity-100 font-bold text-opacity-100",
      )}
    >
      {!outsideDay && day}
      <div className="absolute -left-0.5 -top-0.5 box-content flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border-2 bg-gray-500/20 text-white opacity-0 backdrop-blur transition-opacity hover:opacity-100">
        <span className="flex">
          <span className="text-5xl">{day}</span>
          <span>{getDateOrdinal(day)}</span>
        </span>
        <span className="flex gap-1">
          <PlusIcon />
          <span>Add event</span>
        </span>
      </div>
    </div>
  );
}
