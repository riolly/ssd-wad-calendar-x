"use client";

import React from "react";

import { DAYS, getDated } from "~/lib/date";
import { useCalendar, useDateds } from "../utils/store";
import DateCell, { PrevNextDateCell } from "./DateCell";
import { CreateScheduleDialog } from "./Dialog";

export default function HomePage() {
  // toDate mean today
  const toDate = new Date();
  const toDated = getDated(toDate);

  const [dateds] = useDateds();
  const [calendar, dispatch] = useCalendar(toDated);
  const { selectedDate, prevDates, nextDates } = calendar;

  const [open, setOpen] = React.useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-950 to-slate-900 text-white">
      <div className="container flex flex-col items-center py-12">
        <h1 className="mb-8 text-4xl font-semibold">
          {toDated.monthStr} {toDated.year}
        </h1>

        <div className="grid grid-cols-7 overflow-clip rounded-t-xl">
          {DAYS.map((day) => (
            <DayHeading key={day} day={day} />
          ))}
          {prevDates.map((date) => (
            <PrevNextDateCell key={date.id} {...date} />
          ))}
          {dateds.map((dated) => (
            <DateCell
              key={dated.id}
              {...dated}
              isToday={toDated.date === dated.date}
              isSelected={selectedDate?.date === dated.date}
              setOpen={setOpen}
              setSelectedDate={() => dispatch({ type: "selectDate", dated })}
            />
          ))}
          {nextDates.map((date) => (
            <PrevNextDateCell key={date.id} {...date} />
          ))}
        </div>
        <CreateScheduleDialog
          open={open}
          setOpen={setOpen}
          selectedDate={selectedDate}
        />
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
