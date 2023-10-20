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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/file-upload";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { $Enums, Artist, Release } from "@prisma/client";
import { Edit, FileAudio } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FaRecordVinyl } from "react-icons/fa";

interface NewReleaseModalProps {
  artist?: Artist;
  artistId?: string;
  release?: Release;
}

const releaseFormSchema = z.object({
  name: z.string().min(2).max(50),
  label: z.string().min(2).max(50),
  date: z.string().min(2).max(50),
  imageSrc: z.string().url(),
  soundCloudLink: z.string().url(),
  buyLink: z.string().max(100).optional(),
  description: z.string().max(150).optional(),
  format: z.enum(["Vinyl", "Digital", "VinylDigital"], {
    required_error: "You need to select a format type.",
  }),
});

const ReleaseModal = (props: NewReleaseModalProps) => {
  const { artist, release, artistId } = props;
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof releaseFormSchema>>({
    defaultValues: {
      name: release ? release.name : "",
      label: release ? (release.label as string) : "",
      date: release ? release.date : "",
      imageSrc: release ? release.imageSrc : "",
      soundCloudLink: release ? (release.soundCloudLink as string) : "",
      buyLink: release ? (release.buyLink as string) : "",
      description: release ? release.description : "",
      format: release
        ? (release.format as $Enums.ReleaseFormat)
        : "VinylDigital",
    },
    resolver: zodResolver(releaseFormSchema),
  });

  const { toast } = useToast();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof releaseFormSchema>) => {
    const newRelease = {
      name: values.name,
      label: values.label,
      date: values.date,
      imageSrc: values.imageSrc,
      soundCloudLink: values.soundCloudLink,
      buyLink: values.buyLink,
      description: values.description,
      format: values.format,
      artistId: artistId,
    };

    try {
      if (release) {
        const response = await axios.patch("/api/releases", {
          ...newRelease,
          id: release.id,
        });
        if (response.status === 200) {
          toast({
            title: "Release updated",
            description: `${response.data.name} by ${response.data.artist.name} updated successfully`,
          });
          router.refresh();
          setOpen(false);
        }
      } else {
        const response = await axios.post("/api/releases", {...newRelease, artistId: artist?.id});
        if (response.status === 200) {
          form.reset();
          router.refresh();
          toast({
            title: "Release created",
            description: `${response.data.name} by ${response.data.artist.name} created successfully}`,
          });
          setOpen(false);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      setOpen(false);
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {release ? (
          <Button className="w-max px-2" size={"xs"} variant={"defaultButton"}>
            <Edit className="w-4" />
          </Button>
        ) : (
          <Button className="w-16" size={"xs"} variant={"defaultButton"}>
            + Add
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle>{release ? `Edit Release` : "Add Release"}</DialogTitle>
          <DialogDescription>
            {release
              ? `Edit the details of ${release.name}. Don't forget to save your changes.`
              : "Add a new release to your artist's presskit."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="flex items-center space-x-2 p-1">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form
                  className="flex flex-wrap space-x-1 w-full sm:w-full sm:max-w-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="w-full grid grid-cols-1">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="sr-only">
                            Release Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              placeholder="Release Name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="sr-only">
                            Release Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              id="name"
                              className="text-xs"
                              placeholder="Short Description (Optional / 150 characters max.)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-0" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="sr-only">Label</FormLabel>
                          <FormControl>
                            <Input
                              id="label"
                              placeholder="Record Label"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="space-y-1 w-full">
                          <FormLabel className="sr-only">
                            Release Date
                          </FormLabel>
                          <FormControl>
                            <Input type="date" id="date" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imageSrc"
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-1  border rounded-md border-white/10 w-full">
                          <FormLabel className="sr-only">
                            Artist Image
                          </FormLabel>
                          <FormControl>
                            <FileUpload
                              endpoint="releaseCover"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field, fieldState }) => (
                        <FormItem className="space-y-1 flex items-center justify-between border rounded-md border-white/10 w-full">
                          <FormLabel className="sr-only">
                            Release Format
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              className="grid grid-cols-3 w-full p-2"
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <div className="flex flex-col items-center">
                                <FaRecordVinyl className="w-4 h-4" />
                                <Label htmlFor="Vinyl">Vinyl</Label>
                                <RadioGroupItem
                                  value={"Vinyl" as $Enums.ReleaseFormat}
                                  id="Vinyl"
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <FileAudio className="w-4 h-4" />
                                <Label htmlFor="Digital">Digital</Label>
                                <RadioGroupItem
                                  className="mt-1"
                                  value="Digital"
                                  id="Digital"
                                />
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="flex gap-1">
                                  <FaRecordVinyl className="w-4 h-4" />
                                  <FileAudio className="w-4 h-4" />
                                </div>
                                <Label htmlFor="VinylDigital">Both</Label>
                                <RadioGroupItem
                                  value="VinylDigital"
                                  id="VinylDigital"
                                />
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-0" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1">
                    <FormField
                      control={form.control}
                      name="soundCloudLink"
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormLabel className="sr-only">
                            Soundcloud Link
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="soundCloudLink"
                              placeholder="SoundCloud Link"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="buyLink"
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormLabel className="sr-only">Artist Name</FormLabel>
                          <FormControl>
                            <Input
                              id="buyLink"
                              placeholder="Buy Link (optional)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage className="text-xs leading-none !pt-0 !mt-0" />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="justify-end flex gap-2 w-full flex-row">
          <Button onClick={form.handleSubmit(onSubmit)} variant="defaultButton">
            {release ? "Update" : "Create"}
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

export default ReleaseModal;
