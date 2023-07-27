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
import { getDateOrdinal, getDayString } from "~/lib/date";

export function CreateEventDialog({
  open,
  setOpen,
  selectedDate,
  selectedDay,
}: {
  open: boolean;
  selectedDay: number | null;
  selectedDate: Date | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-normal">
            Add schedule for
            {selectedDate && selectedDay && (
              <span className="text-blue-200">
                &nbsp;
                {getDayString(selectedDate)}
                ,&nbsp;{selectedDay}
                <sup className="text-sm">{getDateOrdinal(selectedDay)}</sup>
                &nbsp;
                {selectedDate.getFullYear()}
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            You can also invite peoples on your schedule
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input id="time" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="invititation" className="text-right">
              Invititation
            </Label>
            <Input id="invititation" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Make schedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
