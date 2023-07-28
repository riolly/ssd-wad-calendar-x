import type { Dispatch, SetStateAction } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { HOUR_FORMAT, HOURS, MINUTES } from "~/lib/date";
import type { Dated } from "../utils/store";
import { TimeSelect } from "./TimeSelect";

export function CreateScheduleDialog({
  open,
  setOpen,
  selectedDate,
}: {
  open: boolean;
  selectedDate: Dated | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="font-normal">
            Add schedule for
            {selectedDate && (
              <span className="text-blue-200">
                &nbsp;
                {selectedDate.dayStr}
                ,&nbsp;{selectedDate.date}
                <sup className="text-sm">{selectedDate.dateOrdinal}</sup>
                &nbsp;
                {selectedDate.year}
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            You can also invite peoples on your schedule
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-5" />
          </div>
          <div className="grid grid-cols-12 items-center gap-4">
            <Label htmlFor="time" className="col-span-2 text-right">
              Time
            </Label>

            <TimeSelect
              className="col-span-2"
              placeholder="Hour"
              opts={HOURS}
            />
            <TimeSelect
              className="col-span-2"
              placeholder="Minute"
              opts={MINUTES}
            />
            <TimeSelect
              className="col-span-2"
              opts={HOUR_FORMAT}
              defaultValue="AM"
            />

            {/* <Input id="time" className="col-span-5" /> */}
          </div>

          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="invititation" className="text-right">
              Invititation
            </Label>
            <Input id="invititation" className="col-span-5" />
          </div>
        </div>

        <DialogFooter className="flex">
          <Button type="submit">Make schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
