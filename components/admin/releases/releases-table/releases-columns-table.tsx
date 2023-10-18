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
import { Release } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Delete, Edit2, MoreHorizontal, Plus } from "lucide-react";
import NewReleaseModal from "../../modals/ReleaseModal";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import DeleteModal from "../../modals/DeleteModal";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ReleaseModal from "../../modals/ReleaseModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ReleaseColumnsTable: ColumnDef<Release>[] = [
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
    header: "Cover",
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
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
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
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      const label = row.original.label;
      return (
        <div>
          <p>{label}</p>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const release = row.original;
      const { toast } = useToast();
      const router = useRouter();
      const handleDelete = async () => {
        const response = await axios.delete(
          `/api/releases?releaseId=${release.id}`
        );
        if (response.status === 200) {
          toast({
            title: `Release deleted`,
            description: `${release.name} deleted successfully`,
          });
          router.refresh();
        }
      };

      return (
        <div className="flex flex-row gap-1 items-end justify-end">
          <ReleaseModal release={release} />
          <DeleteModal item={release.name} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
