import ArtistHero from "@/components/presskit/artist/artist-hero";
import { db } from "@/lib/db";
import React from "react";

interface ArtistPresskitPageProps {
  params: {
    artistName: string;
  };
}

const ArtistPresskitPage = async (props: ArtistPresskitPageProps) => {
  const { params } = props;

  const artist = await db.artist.findUnique({
    where: {
      name: params.artistName as string,
    },
  });


  return (
    <>
      {artist && (
        <ArtistHero artist={artist} />
      )}
    </>
  );
};

export default ArtistPresskitPage;
