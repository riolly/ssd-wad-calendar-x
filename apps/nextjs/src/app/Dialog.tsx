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
import type { Dated } from "../utils/store";

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
      <DialogContent className="sm:max-w-[425px]">
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
