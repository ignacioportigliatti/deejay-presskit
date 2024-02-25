"use client";

import { useArtistReleases, useSelectedArtist } from "@/state/selected-artist";
import { Release } from "@prisma/client";
import React, { useEffect } from "react";
import { ReleaseCard } from "./release-card";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface ReleasesByYear {
  [year: string]: Release[];
}

const ReleasesGrid = () => {
  const { releases } = useArtistReleases();

  const releasesByYear: { [year: string]: Release[] } = {};

  releases.forEach(release => {
    const year = release.date.split('-')[0]; // Extracting the year from the date string
    if (!releasesByYear[year]) {
      releasesByYear[year] = []; // Initializing an array for releases of this year if not already done
    }
    releasesByYear[year].push(release); // Pushing the release to the array of its respective year
  });

  const years = Object.keys(releasesByYear);

  return (
    <div className="pt-24 lg:px-48 lg:pt-0">
      {years.length > 0 ? (
        <div className={cn(
          "flex flex-col w-full h-full items-center justify-center gap-4",
        )}>
          <h1 className="text-3xl mb-10">Releases</h1>
          {years.map((year, index) => (
            <div className="flex flex-col lg:flex-row relative justify-center items-center lg:gap-20" key={year}>
              <h2 className="text-2xl lg:absolute lg:-left-28 lg:-rotate-90 font-bold mb-2">{year}</h2>
              <Carousel className="w-full max-w-7xl">
                <CarouselContent className="">
                  {releasesByYear[year].map((release: Release) => (
                    <CarouselItem key={release.id} className="basis-[310px] lg:basis-[220px]">
                      <ReleaseCard release={release} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center h-full flex items-center text-white text-2xl">
          No releases yet
        </div>
      )}
    </div>
  );
};

export default ReleasesGrid;
