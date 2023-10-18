import NewReleaseModal from "@/components/admin/modals/ReleaseModal";
import EventsTable from "@/components/admin/releases copy/EventsTable";
import ReleasesTable from "@/components/admin/releases/ReleasesTable";
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
      <div className="flex gap-2 items-center">
        <h1>Events</h1>
        <NewReleaseModal artist={artist as Artist} />
      </div>
      <EventsTable artist={artist as Artist} />
    </div>
  );
};

export default EventsAdminPage;
