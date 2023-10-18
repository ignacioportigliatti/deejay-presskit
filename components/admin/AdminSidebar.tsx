"use client";

import React from "react";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Artist } from "@prisma/client";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";

interface AdminSidebarProps {
  artists?: Artist[];
}

export default function AdminSidebar(props: AdminSidebarProps) {
  const { artists } = props;
  const pathName = usePathname();

  return (
    <div className="hidden md:flex w-48 py-10 px-4 bg-stone-800 min-h-screen sticky top-0 h-full flex-col items-center justify-between">
      <div className="flex flex-col  text-center">
        <h1 className="text-white">DJ Presskit</h1>
        <h6 className="text-sm text-stone-400">Admin Page</h6>
      </div>
      <div className="flex w-full flex-col gap-1">
        <Button
          size={"xs"}
          disabled={pathName === "/admin"}
          className={pathName === "/admin" ? "pointer-events-none" : ""}
          variant={"sidebarButton"}
        >
          <Link href={"/admin"}>All Artists</Link>
          {pathName === `/admin` && (
            <Separator className="bg-white/50 w-8 mx-auto transition-all duration-300" />
          )}
        </Button>

        {artists &&
          artists.length > 0 &&
          artists.map((artist, i) => (
            <div key={artist.name}>
              <Button
                size={"xs"}
                disabled={pathName.includes(artist.id)}
                className={pathName.includes(artist.id) ? "pointer-events-none" : ""}
                variant={"sidebarButton"}
              >
                <Link href={`/admin/${artist.id}`}>{artist.name}</Link>
                {pathName.includes(artist.id) && (
                  <Separator className="bg-white/50 w-8 mx-auto transition-all duration-300" />
                )}
              </Button>
            </div>
          ))}
      </div>
      <div className="min-h-[48px]">
        <UserButton />
      </div>
    </div>
  );
}
