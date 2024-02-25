"use client";

import { Button } from "@/components/ui/button";
import { Artist } from "@prisma/client";
import { Calendar } from "lucide-react";
import React from "react";
import { SiPioneerdj } from "react-icons/si";
import { FaRecordVinyl } from "react-icons/fa";
import BiographyModal from "../modals/biography-modal";
import Link from "next/link";
import Image from "next/image";

interface ArtistHeroProps {
  artist: Artist;
}

const ArtistHero = (props: ArtistHeroProps) => {
  const { artist } = props;

  return (
    <div className="relative h-full min-h-screen w-full lg:max-h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative max-h-96 lg:max-h-screen mx-auto lg:h-full max-w-96 lg:max-w-full aspect-square flex-col lg:px-20 lg:py-14 text-white lg:dark:border-r lg:flex">
        <img
          className=" lg:absolute h-[50vh] lg:p-0 top-0 left-0 w-full max-h-[50vh] lg:max-h-full object-cover object-top"
          src={artist.imageSrc}
          alt={`${artist.name}`}
        />
        <div className="relative hidden lg:block z-20 mt-auto bg-black/80 rounded-md p-6">
          <blockquote className=" space-y-2">
            <p className="text-[14px] font-light leading-tight">
              {`"${artist.bio.split("\n")[0]}"`}
            </p>
            <footer className="text-xs font-semibold">{artist.name}</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-2 lg:w-[350px]">
          <div className="flex flex-col text-center">
            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight">
              {artist.name}
            </h1>
            <p className="text-sm text-muted-foreground">{artist.location}</p>
          </div>

          <div className="flex gap-1">
            {artist.genres.map((genre) => {
              return (
                <div
                  key={genre}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-foreground"
                >
                  {genre}
                </div>
              );
            })}
          </div>
          <BiographyModal
            artist={artist}
            button={
              <Button variant={"defaultButton"} className="!mt-4 w-full">
                Biography
              </Button>
            }
          />
          <div className="grid w-full grid-cols-3 gap-2">
            <Link href={`/${artist.name}/releases`}>
              <Button
                variant="defaultButton"
                className="w-full flex items-center justify-center flex-col gap-1 border rounded-lg p-4"
              >
                <FaRecordVinyl className="w-8 h-8" />
                <p className="text-sm font-light">Releases</p>
              </Button>
            </Link>
            <Link href={`/${artist.name}/gigs`}>
              <Button
                variant="defaultButton"
                className="w-full flex items-center justify-center flex-col gap-1 border rounded-lg p-4"
              >
                <Calendar className="w-8 h-8 bg-[--theme-primary]" />
                <p className="text-sm font-light">Gigs</p>
              </Button>
            </Link>
            <Link href={`/${artist.name}/tech-rider`}>
              <Button
                variant="defaultButton"
                className="w-full flex items-center justify-center flex-col gap-1 border rounded-lg p-4"
              >
                <SiPioneerdj className="w-8 h-8" />
                <p className="text-sm font-light">Tech Ride</p>
              </Button>
            </Link>
          </div>
          <Button variant={"defaultButton"} className=" w-full">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistHero;
