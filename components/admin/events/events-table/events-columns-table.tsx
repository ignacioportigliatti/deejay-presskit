"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Edit2, MoreHorizontal, Plus } from "lucide-react";
import NewEventModal from "../../modals/event-modal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import DeleteModal from "../../modals/delete-modal";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import EventModal from "../../modals/event-modal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const EventsColumnsTable: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageSrc",
    header: "Flyer/Art",
    cell: ({ row }) => {
      const imageSrc = row.original.imageSrc;
      return (
        <div className="">
          <img
            className="w-12 h-12 object-cover rounded-md object-center"
            src={imageSrc as string}
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Event Name",
    cell: ({ row }) => {
      const name = row.original.name;

      return (
        <div>
          <p>{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div>
          <p>{date}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "venue.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Venue" />;
    },
    cell: ({ row }) => {
      const venueName = row.original.venue?.name;
      return (
        <div>
          <p>{venueName}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }: { row: any }) => {
      const event = row.original;

      return (
        <div className="flex flex-row gap-1 items-end justify-end">
          <EventModal event={event} />
          <DeleteModal item={event} apiUrl={`/api/events?eventId=${event.id}`} />
        </div>
      );
    },
  },
];
