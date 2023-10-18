import ArtistEdit from "@/components/admin/artist/ArtistEdit";
import NewReleaseModal from "@/components/admin/modals/ReleaseModal";
import ReleasesTable from "@/components/admin/releases/ReleasesTable";
import { db } from "@/lib/db";
import { Artist } from "@prisma/client";
import React from "react";

interface ArtistPageProps {
  params: {
    artistId: string;
  };
}

const ArtistPage = async (props: ArtistPageProps) => {
  const { params } = props;

  const artist = await db.artist.findUnique({
    where: {
      id: params.artistId,
    },
  });

  return (
    <div className="space-y-2">
      <p>{artist?.name} Info</p>
      <ArtistEdit artist={artist as Artist} />
    </div>
  );
};

export default ArtistPage;
