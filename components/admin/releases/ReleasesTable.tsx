import { Artist, Release } from "@prisma/client";
import { ReleaseColumnsTable } from "./releases-table/releases-columns-table";
import { ReleasesDataTable } from "./releases-table/releases-data-table";
import { db } from "@/lib/db";


interface ReleasesTableProps {
  artist?: Artist;
}

export default async function ReleasesTable(props: ReleasesTableProps) {
  const { artist } = props;

  async function getData(): Promise<Release[]> {
    const response = await db.release.findMany({
     where: {
        artistId: artist?.id
     }
    });
    return response;
  }

  const data = await getData();

  return (
    <div className="container mx-auto p-0">
      <ReleasesDataTable columns={ReleaseColumnsTable} data={data} />
    </div>
  );
}
