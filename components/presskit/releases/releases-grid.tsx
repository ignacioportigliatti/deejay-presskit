"use client";

import { useArtistReleases, useSelectedArtist } from "@/state/selected-artist";
import { Release } from "@prisma/client";
import React, { useEffect } from "react";
import { ReleaseCard } from "./release-card";
import { cn } from "@/lib/utils";

const ReleasesGrid = () => {
  const { releases } = useArtistReleases();

  return (
    <div className="p-9">
      {releases.length > 0 ? (
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3",
          releases.length === 2 && "lg:grid-cols-2 md:grid-cols-2",
          releases.length === 1 && "lg:grid-cols-1 md:grid-cols-1"
        )}>
          {releases.map((release: Release) => (
            <div key={release.id} className="relative">
              <ReleaseCard release={release} />
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
