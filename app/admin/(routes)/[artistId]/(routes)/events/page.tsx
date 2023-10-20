import EventModal from "@/components/admin/modals/event-modal";
import EventsTable from "@/components/admin/events/events-table";
import { db } from "@/lib/db";
import { Artist } from "@prisma/client";
import React from "react";

interface Props {
  params: {
    artistId: string;
  };
}

const EventsAdminPage = async (props: Props) => {
  const { params } = props;
  const artist = await db.artist.findUnique({
    where: {
      id: params.artistId,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2 w-full justify-between items-center">
        <h1>Events</h1>
        <EventModal artist={artist as Artist} />
      </div>
      <EventsTable artist={artist as Artist} />
    </div>
  );
};

export default EventsAdminPage;
