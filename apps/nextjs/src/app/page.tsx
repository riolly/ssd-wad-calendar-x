"use client";

import React from "react";

import { DAYS, getMonthString, getNumberOfDays } from "~/lib/date";
import type { DayProps } from "./DayCell";
import DayCard from "./DayCell";
import { CreateEventDialog } from "./Dialog";

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
  const days = [...daysPrev, ...daysCurr, ...daysAftr];

  const [open, setOpen] = React.useState(false);

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
          {days.map((item, i) => (
            <DayCard key={`${i}-${item.day}`} {...item} setOpen={setOpen} />
          ))}
        </div>
        <CreateEventDialog open={open} setOpen={setOpen} />
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
