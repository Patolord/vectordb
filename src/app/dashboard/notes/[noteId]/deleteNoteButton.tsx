"use client";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useMutation } from "convex/react";
import { Trash, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import LoadingButton from "@/components/loading-button";

export function DeletenoteButton({
    noteId,
}: {
    noteId: Id<"notes">;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const deleteNote = useMutation(api.notes.deleteNote);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <AlertDialogTrigger>
                <Button variant='destructive' size="icon" className="absolute -top-3 -right-3" >
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this note?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Your note can not be recovered after it's been deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <LoadingButton
                        onClick={() => {
                            setIsLoading(true);
                            deleteNote({
                                noteId,
                            })
                                .then(() => {
                                    router.push("/dashboard/notes");
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                });
                        }}
                        isLoading={isLoading}
                        loadingText="Deleting..."
                    >
                        Delete
                    </LoadingButton>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}