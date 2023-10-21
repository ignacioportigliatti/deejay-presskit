import { ArtistSidebar } from "@/components/admin/artist/artist-sidebar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import React from "react";

interface ArtistLayoutProps {
  params: {
    artistId: string;
  };
  children: React.ReactNode;
}

const ArtistLayout = async (props: ArtistLayoutProps) => {
  const { children, params } = props;

  const sidebarNavItems = [
    {
      title: "Artist Info",
      href: `/admin/${params.artistId}`,
    },
    {
      title: "Releases",
      href: `/admin/${params.artistId}/releases`,
    },
    {
      title: "Events",
      href: `/admin/${params.artistId}/events`,
    },
    {
      title: "Tech Rider",
      href: `/admin/${params.artistId}/tech-rider`,
    },
  ];

  const artist = await db.artist.findUnique({
    where: {
      id: params.artistId,
    },
  });

  return (
    <div className="flex flex-col w-full space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{artist?.name}</h2>
        <p className="text-muted-foreground">
          Edit your presskit and manage your releases and events.
        </p>
      </div>
      <Separator className="" />
      <div className="flex w-full flex-col space-y-8 md:!flex-row lg:space-y-0">
        <aside className=" w-36">
          <ArtistSidebar items={sidebarNavItems} />
        </aside>
        <div className="w-full flex-1 px-4">{children}</div>
      </div>
    </div>
  );
};

export default ArtistLayout;
