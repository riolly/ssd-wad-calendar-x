import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldError, FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
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
  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    time: z.object({
      hour: z.string({ required_error: "Hour must be set." }),
      minute: z.string({ required_error: "Minute must be set." }),
      format: z.string(),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      time: {
        hour: undefined,
        minute: undefined,
        format: "PM",
      },
    },
  });

  const {
    formState: { errors },
  } = form;

  function submitHandler(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  function submitErrorHandler(error: FieldErrors<z.infer<typeof formSchema>>) {
    console.log(error);
  }

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler, submitErrorHandler)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-12 gap-4">
                  <FormLabel className="col-span-2 mt-2 justify-self-end text-right leading-5 text-white">
                    Activity <br />
                    or event
                  </FormLabel>
                  <div className="col-span-10">
                    <FormControl>
                      <Input
                        placeholder="ex: meeting, shopping, running, etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <Label
                htmlFor="time"
                className="col-span-2 mt-4 justify-self-end"
              >
                Time
              </Label>

              <div className="col-span-6 flex flex-col">
                <div className="grid grid-cols-12 gap-4" id="time">
                  <TimeSelect
                    name="time.hour"
                    label="Hour"
                    className="col-span-4"
                    placeholder="Hour"
                    opts={HOURS}
                  />
                  <TimeSelect
                    name="time.minute"
                    className="col-span-4"
                    placeholder="Minute"
                    label="Minute"
                    opts={MINUTES}
                  />
                  <TimeSelect
                    name="time.format"
                    label="12 hour format"
                    className="col-span-4"
                    opts={HOUR_FORMAT}
                  />
                </div>
                <p className="text-destructive flex flex-col text-sm font-medium">
                  {errors.time?.hour && <span>{errors.time.hour.message}</span>}
                  {errors.time?.minute && (
                    <span>{errors.time.minute.message}</span>
                  )}
                </p>
              </div>

              {/* <Input id="time" className="col-span-5" /> */}
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <Label htmlFor="invititation" className="col-span-2 text-right">
                Invititation
              </Label>
              <Input id="invititation" className="col-span-6" />
            </div>

            <DialogFooter className="flex">
              <Button type="submit">Make schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
