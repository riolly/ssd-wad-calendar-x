import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import type { FieldErrors } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { getTimeDisplay, HOUR_FORMAT, HOURS, MINUTES } from "~/lib/date";
import { useCalendarStore, useScheduleStore } from "../utils/store";
import { TimeSelect } from "./TimeSelect";

export default function ScheduleEditDialog() {
  const scheduleDefault = useCalendarStore((state) => state.selectedSchedule)!;
  const isOpen = useCalendarStore((state) => state.isEditScheduleOpen);
  const setIsOpen = useCalendarStore((state) => state.setIsEditScheduleOpen);

  const { toast } = useToast();
  const formSchema = z.object({
    id: z.string(),
    dateId: z.string(),
    name: z.string().min(3, {
      message: "Name must be at least 3 characters.",
    }),
    time: z.object({
      hour: z.string({ required_error: "Hour must be set." }),
      minute: z.string({ required_error: "Minute must be set." }),
      format: z.string(),
    }),
    invitations: z
      .object({
        address: z.string().email("Email address is invalid."),
      })
      .array()
      .optional(),
    invite: z.union([
      z.string().email("Email address is invalid."),
      z.string().refine((v) => v === ""),
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...scheduleDefault,
      invite: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invitations",
  });

  const {
    formState: { errors },
  } = form;

  async function handleAddInvitation() {
    const valid = await form.trigger("invite");
    if (valid) {
      append({ address: form.getValues("invite")! });
      form.setValue("invite", "");
      form.setFocus("invite");
    }
  }
  function handleRemoveSchedule() {
    removeSchedule(scheduleDefault.id);
    setIsOpen(false);
    toast({
      title: "Schedule removed:",
      description: `${scheduleDefault.name} at ${getTimeDisplay(
        scheduleDefault.time,
      )}`,
    });
  }

  const editSchedule = useScheduleStore((state) => state.editSchedule);
  const removeSchedule = useScheduleStore((state) => state.removeSchedule);

  function submitHandler({ invite: _, ...input }: z.infer<typeof formSchema>) {
    editSchedule(input);
    setIsOpen(false);
    toast({
      title: "Schedule updated.",
      description: `${input.name} at ${getTimeDisplay(input.time)}`,
    });
  }

  function submitErrorHandler(error: FieldErrors<z.infer<typeof formSchema>>) {
    console.log(error, "<<<<<<< errors");
  }

  useEffect(() => {
    if (scheduleDefault) {
      form.setValue("id", scheduleDefault.id);
      form.setValue("dateId", scheduleDefault.dateId);
      form.setValue("name", scheduleDefault.name);
      form.setValue("time", scheduleDefault.time);
      form.setValue("invitations", scheduleDefault.invitations);
    }
  }, [form, scheduleDefault]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="font-normal">Change schedule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler, submitErrorHandler)}
            className="mt-4 space-y-2"
          >
            <input {...form.register("id")} type="hidden" />
            <input {...form.register("dateId")} type="hidden" />
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
                className="col-span-2 mt-5 justify-self-end"
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
            </div>

            <FormField
              control={form.control}
              name="invite"
              render={({ field }) => (
                <FormItem className="grid grid-cols-12 gap-4">
                  <FormLabel className="col-span-2 mt-2 justify-self-end text-right leading-5 text-white">
                    Invite peoples
                  </FormLabel>
                  <div className="col-span-10 flex flex-col">
                    <div className="flex">
                      <FormControl>
                        <Input
                          placeholder="john.doe@gmail.com"
                          className="rounded-r-none"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        className="col-span-2 rounded-l-none"
                        variant="outline"
                        type="button"
                        disabled={!!form.formState.errors.invite}
                        onClick={handleAddInvitation}
                      >
                        add
                      </Button>
                    </div>

                    {/* <FormDescription>Send via email</FormDescription> */}
                    <FormMessage />
                    <div className="mt-0.5 space-x-1">
                      {fields.map((inv, i) => (
                        <Badge
                          variant="secondary"
                          className="pr-0"
                          key={inv.id}
                        >
                          {inv.address}
                          <button
                            onClick={() => remove(i)}
                            type="button"
                            className="transition-opacity-opaci mx-0.5 rounded-full bg-gray-400 bg-opacity-0 p-0.5 hover:bg-opacity-75"
                          >
                            <X size={14} className="text-red-500" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit">Update</Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleRemoveSchedule}
              >
                Delete
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// function RemoveSuccess({ name }: { name: string }) {
//   return (
//     <span>
//       <span className="italic">{name}</span> has been removed
//     </span>
//   );
// }
