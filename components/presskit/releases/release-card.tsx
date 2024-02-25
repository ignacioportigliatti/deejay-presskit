import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Release } from "@prisma/client";
import ReleaseModal from "../modals/release-modal";
import { FaFileAudio, FaRecordVinyl } from "react-icons/fa";
import Image from "next/image";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard(props: ReleaseCardProps) {
  const { release } = props;
  return (
    <Card className="opacity-80 hover:opacity-100 duration-300 relative">
      <CardHeader className="pb-2 w-full">
        {release.imageSrc && (
          <img
            src={release.imageSrc}
            alt={release.name}
            className=" aspect-square object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="pb-4 md:w-[200px]  w-full">
        <CardTitle className="text-lg leading-tight">
          {release.name}
        </CardTitle>
        <div className="text-xs">
          <p>{release.label}</p>
          <p>{release.date}</p>
          <p>
            {release.format === "VinylDigital" && (
              <>
                <FaRecordVinyl className="w-3 h-3 inline-block mr-1" />
                <FaFileAudio className="w-3 h-3 inline-block mr-1" />
              </>
            )}
            {release.format === "Vinyl" && (
              <>
                <FaRecordVinyl className="w-3 h-3 inline-block mr-1" />
              </>
            )}
            {release.format === "Digital" && (
              <>
                <FaFileAudio className="w-3 h-3 inline-block mr-1" />
              </>
            )}
          </p>
          <ReleaseModal release={release} button={<button className="absolute top-0 left-0 w-full h-full"></button>} />
        </div>
      </CardContent>
    </Card>
  );
}
