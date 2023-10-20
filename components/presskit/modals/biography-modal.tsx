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

import { Artist } from "@prisma/client";

interface BiographyModalProps {
  artist: Artist;
  button: React.ReactNode;
}

const BiographyModal = (props: BiographyModalProps) => {
  const { artist, button } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            <h1>{artist.name}</h1>
            <h6 className="text-xs">{artist.location}</h6>
            
          </DialogTitle>
          <DialogDescription className="text-xs">
          <p className="space-y-2">
          {artist.bio.split("\n").map((paragraph, index) => {
            return <p key={index} className="text-sm">{paragraph}</p>;
          })}
        </p>
          </DialogDescription>
          <div className="flex !mt-2 gap-1">
            <p className="text-xs mr-2">Genres:</p>
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

export default BiographyModal;
