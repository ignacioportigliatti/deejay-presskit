import ReleaseModal from "@/components/admin/modals/ReleaseModal";
import ReleasesTable from "@/components/admin/releases/ReleasesTable";
import { db } from "@/lib/db";
import { Artist } from "@prisma/client";
import React from "react";

interface Props {
  params: {
    artistId: string;
  };
}

const ReleasesAdminPage = async (props: Props) => {
  const { params } = props;
  const artist = await db.artist.findUnique({
    where: {
      id: params.artistId,
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <h1>Releases</h1>
        <ReleaseModal artist={artist as Artist} />
      </div>
      <ReleasesTable artist={artist ? artist : undefined} />
    </div>
  );
};

export default ReleasesAdminPage;
