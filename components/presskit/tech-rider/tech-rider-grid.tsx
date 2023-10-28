"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { useArtistTechRider } from "@/state/selected-artist";
import React from "react";
import { TechRiderCard } from "./tech-rider-card";
import { FaMixer, FaRecordVinyl } from "react-icons/fa";
import { SiPioneerdj } from "react-icons/si";

interface Props {}


const TechRiderGrid = (props: Props) => {
  const { techRider } = useArtistTechRider();

  return (
    <div className="flex flex-col gap-2">
      <TechRiderCard icon={<FaMixer />} title="Mixers" techRider={techRider.mixers} />
      <TechRiderCard icon={<SiPioneerdj />} title="Digital Players" techRider={techRider.cdPlayers} />
      <TechRiderCard icon={<FaRecordVinyl />}  title="Vinyl Turntables" techRider={techRider.turntables} />
    </div>
  );
};

export default TechRiderGrid;
