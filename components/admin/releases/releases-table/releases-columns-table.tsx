"use client";

import { Release } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteModal from "../../modals/delete-modal";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import ReleaseModal from "../../modals/release-modal";
import Image from "next/image";

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
    header: "Actions",
    enableHiding: false,
    cell: ({ row }: { row: any }) => {
      const release: Release = row.original;
      
      return (
        <div className="flex flex-row gap-1 items-end justify-end">
          <ReleaseModal release={release} artistId={release.artistId} />
          <DeleteModal item={release} apiUrl={`/api/releases?releaseId=${release.id as string}`} />
        </div>
      );
    },
  },
];
