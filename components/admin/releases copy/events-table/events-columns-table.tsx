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
import NewEventModal from "../../modals/EventModal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import DeleteModal from "../../modals/DeleteModal";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import EventModal from "../../modals/EventModal";

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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;
      const { toast } = useToast();
      const router = useRouter();
      const handleDelete = async () => {
        const response = await axios.delete(`/api/events?eventId=${event.id}`);
        if (response.status === 200) {
          toast({
            title: `Event deleted`,
            description: `${event.name} deleted successfully`,
          });
          router.refresh();
        }
      };

      return (
        <div className="flex flex-row gap-1 items-end justify-end">
          <EventModal event={event} />
          <DeleteModal item={event.name} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
