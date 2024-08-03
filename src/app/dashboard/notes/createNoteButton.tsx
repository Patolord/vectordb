"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateNoteForm } from "./createNoteForm";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { useToast } from "@/components/ui/use-toast";

export default function CreateNoteButton() {
  //open close state
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <PlusIcon className={btnIconStyles} /> Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>
            Create a note to keep track of your thoughts and ideas.
          </DialogDescription>
        </DialogHeader>
        <CreateNoteForm onNoteCreated={() => {
          setIsOpen(false);
          toast({
            title: "Note Created",
            description: "Your note has been created.",
          })
        }

        } />
      </DialogContent>
    </Dialog>
  );
}
