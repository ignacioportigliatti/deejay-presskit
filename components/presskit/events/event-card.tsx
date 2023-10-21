import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@prisma/client";
import EventModal from "../modals/event-modal";

interface EventCardProps {
  event: Event;
}

export function EventCard(props: EventCardProps) {
  const { event } = props;
  return (
    <Card className="md:w-[210px] opacity-80 hover:opacity-100 hover:border-white/70 relative duration-300 !p-0 w-full">
      <CardHeader className="p-0">
        {event.imageSrc && (
          <img
            src={event.imageSrc}
            alt={event.name}
            className="object-cover rounded-t-md"
          />
        )}
      </CardHeader>
      <CardContent className="p-2 md:w-[200px]  w-full">
        <CardTitle className="text-lg">{event.name}</CardTitle>
        <CardDescription className="text-xs ">
          <p>{event.venue.name}</p>
          <p>{event.venue.location}</p>
          <p>{event.date}</p>
          <EventModal event={event} button={<button className="absolute top-0 w-full h-full"></button>} />
        </CardDescription>
      </CardContent>
    </Card>
  );
}
