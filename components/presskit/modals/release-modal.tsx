import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Artist, Release } from "@prisma/client";
import { useSelectedArtist } from "@/state/selected-artist";
import ReactPlayer from "react-player/soundcloud";
import Image from "next/image";

interface ReleaseModalProps {
  release: Release;
  button: React.ReactNode;
}

const ReleaseModal = (props: ReleaseModalProps) => {
  const { release, button } = props;

  const { selectedArtist } = useSelectedArtist();

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="w-11/12 py-10 sm:w-full max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-3xl flex items-start gap-4">
            <img
              src={release.imageSrc}
              className="w-36 h-36 object-cover rounded-md"
              alt={`${release.name} cover`}
            />
            <div className="w-full">
              <h1 className="leading-none">{release.name}</h1>
              <h3 className="text-lg leading-tight">{selectedArtist?.name}</h3>
              <h6 className="text-xs">
                {release.date} / {release.label}
              </h6>
              <h6 className="text-xs">
                {release.format === "VinylDigital"
                  ? "Vinyl & Digital"
                  : release.format}
              </h6>
              <p className="text-xs font-light mt-2">
                {release.description}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription className="text-xs">
            <p className="space-y-2"></p>
          </DialogDescription>
          <div className="flex !mt-2 h-60 gap-1 ">
            <ReactPlayer
              url={`${release.soundCloudLink}&visual=true` as string}
              light={false}
              config={{
                options: {
                  auto_play: true,
                  color: "#00ff6e",
                  visual: true,
                  show_teaser: true,
                },
              }}
              width="100%"
              height="100%"
            />
          </div>
        </DialogHeader>

        <DialogFooter className="justify-center flex gap-1 w-full flex-row">
          <DialogClose asChild>
            <Button
              type="button"
              className="!text-xs font-extralight"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReleaseModal;
