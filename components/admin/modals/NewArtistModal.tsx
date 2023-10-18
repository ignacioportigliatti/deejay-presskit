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
import ArtistForm from "../artist/ArtistForm";

interface Props {}

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

const NewArtistModal = (props: Props) => {
  const form = useForm<z.infer<typeof artistFormSchema>>({
    defaultValues: {
      name: "",
      location: "",
      email: "",
      bio: "",
      imageSrc: "",
      genres: [],
      socialLinks: [
        {
          name: "",
          link: "",
        },
      ],
    },
    resolver: zodResolver(artistFormSchema),
  });

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof artistFormSchema>) => {
    const response = await axios
      .post("/api/artists", values)
      .then((res) => res.data);
    form.reset();
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"defaultButton"}>
          + New Artist
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle>Add Artist</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="flex items-center space-x-2 p-1">
            <div className="grid flex-1 gap-2">
              <ArtistForm form={form} onSubmit={onSubmit} />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="justify-end flex gap-2 w-full flex-row">
          <Button onClick={form.handleSubmit(onSubmit)} variant="defaultButton">
            Create
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

export default NewArtistModal;
