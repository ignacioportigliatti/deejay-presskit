import ArtistSetter from "@/components/artist-setter";
import NavBar from "@/components/navbar";
import { db } from "@/lib/db";
import React from "react";

interface ArtistLayoutProps {
  params: {
    artistName: string;
  };
  children: React.ReactNode;
}

const ArtistPresskitLayout = async (props: ArtistLayoutProps) => {
  const { children, params } = props;

  const artist = await db.artist.findUnique({
    where: {
      name: params.artistName
    }
  });
  const releases = await db.release.findMany({
    where: {
      artistId: artist?.id
    }
  });
  const events = await db.event.findMany({
    where: {
      artistId: artist?.id
    }
  });

  return (
    <main>
      {artist ? (
      <div className="">
        <NavBar />
        <div className="flex min-h-screen justify-center items-center">
        {children}
        </div>
        <ArtistSetter artist={artist} dataReleases={releases} dataEvents={events} />
      </div>) : (
        <div>
          Artist not found
        </div>
      )}  

      </main>
  )
}

export default ArtistPresskitLayout;