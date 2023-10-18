"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Artist, Event } from "@prisma/client";
import { Edit } from "lucide-react";

interface NewEventModalProps {
  artist?: Artist;
  event?: Event;
}

const eventFormSchema = z.object({
  name: z.string().nonempty({ message: "Event name is required" }),
  description: z.string().max(150, {
    message: "Description must be less than 150 characters",
  }),
  date: z.string(),
  imageSrc: z.string(),
  venue: z.object({
    name: z.string(),
    location: z.string(),
    socialLink: z.string().optional(),
  }),
});

const EventModal = (props: NewEventModalProps) => {
  const { artist, event } = props;
  const form = useForm<z.infer<typeof eventFormSchema>>({
    defaultValues: {
      name: event?.name,
      description: event?.description,
      date: event?.date,
      imageSrc: event?.imageSrc,
      venue: {
        name: event?.venue?.name,
        location: event?.venue?.location,
        socialLink: event?.venue?.socialLink,
      },
    },
    resolver: zodResolver(eventFormSchema),
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    const newEvent = {
      ...values,
      artistId: artist?.id,
    };

    try {
      if (event) {
        const response = await axios.patch("/api/events", {
          ...newEvent,
          id: event.id,
        });
        if (response.status === 200) {
          form.reset();
          router.refresh();
          toast({
            title: "Event updated",
            description: `${response.data.name} by ${artist?.name} updated successfully}`,
          });
        }
      } else {
        const response = await axios.post("/api/events", newEvent);
        if (response.status === 200) {
          form.reset();
          router.refresh();
          toast({
            title: "Event created",
            description: `${response.data.name} by ${artist?.name} created successfully}`,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {event ? (
          <Button className="w-max px-2" size={"xs"} variant={"defaultButton"}>
            <Edit className="w-4" />
          </Button>
        ) : (
          <Button className="w-16" size={"xs"} variant={"defaultButton"}>
            + Add
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle>
            {event ? `Edit ${event.name}` : "Add Event"}
          </DialogTitle>
          <DialogDescription>
            Add a new event to your artist's presskit.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="flex items-center space-x-2 p-1">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form
                  className="flex flex-wrap space-x-1 w-[80%] sm:w-full sm:max-w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="sr-only">Event Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Event Name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-[49%]">
                        <FormLabel className="sr-only">Event Date</FormLabel>
                        <FormControl>
                          <Input type="date" id="date" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venue.name"
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-[49%]">
                        <FormLabel className="sr-only">Label</FormLabel>
                        <FormControl>
                          <Input
                            id="venue.name"
                            placeholder="Venue Name"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venue.location"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormLabel className="sr-only">
                          Venue Location {"(optional)"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="venue.location"
                            placeholder="Venue Location"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="venue.socialLink"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-1">
                        <FormLabel className="sr-only">Artist Name</FormLabel>
                        <FormControl>
                          <Input
                            id="venue.socialLink"
                            placeholder="Venue Social Media Link (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="sr-only">
                          Event Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            id="name"
                            className="text-xs"
                            placeholder="Short Description (Optional / 150 characters max.)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imageSrc"
                    render={({ field, fieldState }) => (
                      <FormItem className="space-y-1 w-full">
                        <FormLabel className="sr-only">
                          Event Flyer/Image
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            endpoint="eventFlyer"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage className="text-xs leading-0" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="justify-end flex gap-2 w-full flex-row">
          <Button onClick={form.handleSubmit(onSubmit)} variant="defaultButton">
            {event ? "Update" : "Create"}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="!text-xs font-extralight"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
