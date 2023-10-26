import React from "react";

import { SiPioneerdj } from "react-icons/si";
import {
  digitalPlayerBrands,
  djMixerBrands,
  turntableBrands,
} from "./tech-rider-brands";
import { TechRiderForm } from "./tech-rider-form";
import { db } from "@/lib/db";
import { TechRider } from "@prisma/client";

interface Props {
  artistId: string;
}

const TechRiderSettings = async (props: Props) => {
  const { artistId } = props;
  const techRider = await db.techRider.findMany({
    where: {
      artistId,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
      <TechRiderForm
        artistId={artistId}
        techRiderEntry={techRider.filter((techRider) => techRider.mixers)}
        title="Mixers"
        techRiderType="mixers"
        brands={djMixerBrands}
        description="Select your preferred mixers to use."
      />
      <TechRiderForm
         artistId={artistId}
      techRiderEntry={techRider.filter((techRider) => techRider.cdPlayers)}
        title="Digital Players"
        techRiderType="cdPlayers"
        brands={digitalPlayerBrands}
        description="Select your preferred players to use."
      />
      <TechRiderForm
         artistId={artistId}
      techRiderEntry={techRider.filter((techRider) => techRider.turntables)}
        title="Turntables"
        techRiderType="turntables"
        brands={turntableBrands}
        description="Select your preferred turntables to use."
      />
    </div>
  );
};

export default TechRiderSettings;
