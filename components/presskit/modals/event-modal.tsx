import React from "react";

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
import { Button } from "@/components/ui/button";

import { Artist, Event } from "@prisma/client";
import { useSelectedArtist } from "@/state/selected-artist";
import ReactPlayer from "react-player/soundcloud";
import Image from "next/image";

interface EventModalProps {
  event: Event;
  button: React.ReactNode;
}

const EventModal = (props: EventModalProps) => {
  const { event, button } = props;

  const { selectedArtist } = useSelectedArtist();

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-start gap-4">
            <Image
              src={event.imageSrc}
              className="w-36 h-36 object-cover rounded-md"
              alt={`${event.name} cover`}
            />
            <div className="w-full">
              <h1 className="leading-none">{event.name}</h1>
              <h3 className="text-lg leading-tight">{selectedArtist?.name}</h3>
              <h6 className="text-xs">
                {event.date} / {event.venue.name}
              </h6>
              <h6 className="text-xs">
                {event.venue.location}
              </h6>
              <p className="text-xs font-light mt-2">
                {event.description}
                {event.description}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-xs">
            <p className="space-y-2"></p>
          </DialogDescription>
          <div className="flex !mt-2 h-60 gap-1 ">
            <Image src={event.imageSrc} alt={event.name} />
          </div>
        </DialogHeader>

        <DialogFooter className="justify-center flex gap-1 w-full flex-row">
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
