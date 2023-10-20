"use client";

import { Button } from "@/components/ui/button";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useRouter } from "next/navigation";
import ArtistForm from "../artist/artist-form";
import { Artist } from "@prisma/client";
import { Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ArtistModalProps {
  artist?: Artist;
  socialLinks?: {
    name: string;
    link: string;
  }[];
}

export const artistFormSchema = z.object({
  name: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().min(2).max(750),
  socialLinks: z.array(
    z.object({
      name: z.string(),
      link: z.string(),
    })
  ),

  imageSrc: z.string().url(),
  genres: z.array(z.string()),
});

const ArtistModal = (props: ArtistModalProps) => {
  const { artist, socialLinks } = props;
  const form = useForm<z.infer<typeof artistFormSchema>>({
    defaultValues: {
      name: artist ? artist.name : "",
      location: artist ? artist.location : "",
      email: artist ? artist.email : "",
      bio: artist ? artist.bio : "",
      imageSrc: artist ? artist.imageSrc : "",
      socialLinks: artist ? artist.socialLinks : [],
      genres: artist ? artist.genres : [],
    },
    resolver: zodResolver(artistFormSchema),
  });

  const { toast } = useToast();

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof artistFormSchema>) => {
    try {
      if (artist) {
        const response = await axios.patch("/api/artists", {
          ...values,
          id: artist.id,
        });
        if (response.status === 200) {
          form.reset();
          router.refresh();
          toast({
            title: "Artist Updated",
            description: `${values.name} has succesfully been updated`,
          });
        }
      } else {
        const response = await axios
          .post("/api/artists", values)
          .then((res) => res.data);
          if (response.status === 200) {
            form.reset();
            router.refresh();
            toast({
              title: "Artist Added",
              description: `${values.name} has succesfully been added`,
            });
          }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong with your request.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {artist ? (
          <Button className="w-max px-2" size={"xs"} variant={"defaultButton"}>
            <Edit className="w-4" />
          </Button>
        ) : (
          <Button className="w-full" variant={"defaultButton"}>
            + New Artist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle>
            {artist ? `Edit ${artist.name}` : "Add Artist"}
          </DialogTitle>
          <DialogDescription>
            {artist
              ? `Edit the details of ${artist.name}. Don't forget to save your changes.`
              : "Fill the form to create a new Artist."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="flex items-center space-x-2 p-1">
            <div className="grid flex-1 gap-2">
              <ArtistForm
                form={form}
                onSubmit={onSubmit}
                socialLinks={socialLinks}
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="justify-end flex gap-2 w-full flex-row">
          <Button onClick={form.handleSubmit(onSubmit)} variant="defaultButton">
            {artist ? "Save Changes" : "Add Artist"}
          </Button>
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

export default ArtistModal;
