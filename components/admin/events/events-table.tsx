import { Artist, Event, Release } from "@prisma/client";
import { db } from "@/lib/db";
import { EventsDataTable } from "./events-table/events-data-table";
import { EventsColumnsTable } from "./events-table/events-columns-table";


interface EventsTableProps {
  artist?: Artist;
}

export default async function EventsTable(props: EventsTableProps) {
  const { artist } = props;

  async function getData(): Promise<Event[]> {
    const response = await db.event.findMany({
     where: {
        artistId: artist?.id
     }
    });
    return response;
  }

  const data = await getData();

  return (
    <div className="container mx-auto p-0">
      <EventsDataTable columns={EventsColumnsTable} data={data} />
    </div>
  );
}
