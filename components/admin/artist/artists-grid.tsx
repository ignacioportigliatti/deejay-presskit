import { Artist } from "@prisma/client";
import React from "react";
import { ArtistCard } from "./artist-card";
import { cn } from "@/lib/utils";

interface ArtistsGridProps {
  artists: Artist[];
}

const ArtistsGrid = (props: ArtistsGridProps) => {
  const { artists } = props;

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 gap-2",
        artists.length === 2
          ? "md:grid-cols-2 grid-cols-1"
          : artists.length === 3
          ? "md:grid-cols-3 grid-cols-1"
          : artists.length >= 4
          ? "md:grid-cols-4 grid-cols-1"
          : ""
      )}
    >
      {artists.map((artist: Artist, i: number) => (
        <div key={artist.name}>
          <ArtistCard artist={artist} />
        </div>
      ))}
    </div>
  );
};

export default ArtistsGrid;
