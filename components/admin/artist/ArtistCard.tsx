"use client";

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
import { Artist } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";


import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Delete, Edit } from "lucide-react";
import DeleteModal from "../modals/DeleteModal";

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = (props: ArtistCardProps) => {
  const { artist } = props;

  const router = useRouter();
 const { toast } = useToast();

  const handleArtistDelete = async () => {
    try {
      const response = await axios
        .delete(`/api/artists?artistId=${artist.id}`)
      if (response.status === 200) {
        toast({
          title: "Artist deleted",
          description: "Artist deleted successfully",
        })
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="min-h-full flex flex-col bg-background/40 items-center justify-center">
      <CardHeader className="text-center">
        <CardTitle>{artist.name}</CardTitle>
        <CardDescription className="text-xs">{artist.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar>
          <AvatarImage
            className="w-36 h-36 object-cover rounded-full object-center"
            alt={artist.name}
            src={artist.imageSrc}
          />
          <AvatarFallback>
            <p className="min-w-[144px] min-h-[144px] flex items-center justify-center text-3xl bg-stone-700 rounded-full">
              {artist.name.substring(0, 2).toUpperCase()}
            </p>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Button variant="defaultButton" size={'xs'} className="w-max px-2">
          <Edit className="w-4 h-4" />
          </Button>
          <DeleteModal item={artist.name} handleDelete={handleArtistDelete} />
        
      </CardFooter>
    </Card>
  );
};
