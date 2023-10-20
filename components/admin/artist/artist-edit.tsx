"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { artistFormSchema } from "../modals/artist-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Artist } from "@prisma/client";
import ArtistForm from "./artist-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ArtistEditProps {
  artist: Artist;
}

const ArtistEdit = (props: ArtistEditProps) => {
  const { artist } = props;
  const form = useForm<z.infer<typeof artistFormSchema>>({
    defaultValues: {
      name: artist.name,
      location: artist.location,
      email: artist.email,
      bio: artist.bio,
      imageSrc: artist.imageSrc,
      socialLinks: artist.socialLinks,
      genres: artist.genres,
    },
    resolver: zodResolver(artistFormSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof artistFormSchema>) => {
    if (
      values.name === artist.name &&
      values.location === artist.location &&
      values.email === artist.email &&
      values.bio === artist.bio &&
      values.imageSrc === artist.imageSrc &&
      values.socialLinks === artist.socialLinks &&
      values.genres === artist.genres
    ) {
      toast({
        title: "No Changes",
        description: `No changes were made to ${values.name}`,
      });
      return;
    } else {
      try {
        const response = await axios.patch("/api/artists", {
          ...values,
          id: artist.id,
        });
        if (response.status === 200) {
          toast({
            title: "Artist Updated",
            description: `${values.name} has succesfully been updated`,
          });
          router.refresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="space-y-2">
      <ArtistForm
        form={form}
        socialLinks={artist.socialLinks}
        onSubmit={onSubmit}
      />
      <div className="w-full flex justify-end">
        <Button onClick={form.handleSubmit(onSubmit)} variant={"defaultButton"}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ArtistEdit;
