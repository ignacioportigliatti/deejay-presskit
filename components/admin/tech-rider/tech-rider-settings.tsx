import React from "react";
import TechRiderForm from "./tech-rider-form";

interface Props {}

const djMixerBrands = [
    "Pioneer",
    "Allen & Heath",
    "Denon",
    "Rane",
    "Reloop",
    "Behringer",
    "Native Instruments",
    "Numark",
    "Vestax",
    "Other",
    ];

const turntableBrands = [
    "Technics",
    "Reloop",
    "Stanton",
    "Audio-Technica",
    "Pioneer",
    "Numark",
    "Other",
    ];

const cdPlayerBrands = [
    "Pioneer",
    "Denon",
    "Reloop",
    "Numark",
    "Other",
    ];


const TechRiderSettings = (props: Props) => {

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        <TechRiderForm title="Mixers" techRiderType="mixer" brands={djMixerBrands} description="Select your preferred mixers to use." />
    </div>

  );
};

export default TechRiderSettings;
