"use client";

import { useArtistEvents, useSelectedArtist } from "@/state/selected-artist";
import { Event } from "@prisma/client";
import React, { useEffect } from "react";
import { EventCard } from "./event-card";

const EventsGrid = () => {
  const { events } = useArtistEvents();

  return (
    <div className="p-9">
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {events.map((event: Event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center h-full flex items-center text-white text-2xl">
          No events yet
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
