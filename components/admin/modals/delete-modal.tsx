'use client'

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
import { Delete } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface DeleteModalProps {
  item: any;
  apiUrl: string;
}

const DeleteModal = (props: DeleteModalProps) => {
  const { item, apiUrl } = props;
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const response = await axios.delete(
      apiUrl
    );
    if (response.status === 200) {
      toast({
        title: `Item deleted`,
        description: `${item.name as string} deleted successfully`,
      });
      router.refresh();
    }
  };
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"xs"}
          className="w-max p-2 bg-rose-500/30 hover:bg-rose-500/80"
          variant={"defaultButton"}
        >
          <Delete className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl">Delete {item.name}</DialogTitle>
          <DialogDescription className="text-xs">
            Are you sure you want to delete {item.name}? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-center flex gap-1 w-full flex-row">
          <Button onClick={handleDelete} variant="destructive">
            Delete
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

export default DeleteModal;
