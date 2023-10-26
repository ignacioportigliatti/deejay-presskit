"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { useArtistTechRider } from "@/state/selected-artist";
import React from "react";
import { TechRiderCard } from "./tech-rider-card";

interface Props {}


const TechRiderGrid = (props: Props) => {
  const { techRider } = useArtistTechRider();
  
  return (
    <div className="flex gap-2">
      <TechRiderCard title="Mixers" techRider={techRider.mixers} />
      <TechRiderCard title="Digital Players" techRider={techRider.cdPlayers} />
      <TechRiderCard title="Vinyl Turntables" techRider={techRider.turntables} />
    </div>
  );
};

export default TechRiderGrid;
