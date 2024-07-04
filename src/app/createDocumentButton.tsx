"use client";

import { Button } from "@/components/ui/button";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadDocumentForm from "./uploadDocumentForm";

export default function CreateDocumentButton() {
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => createDocument({ title: "hello world" })}>
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a Document</DialogTitle>
          <DialogDescription>
            Upload a team document for you to search over in the future.
          </DialogDescription>
        </DialogHeader>
        <UploadDocumentForm />
      </DialogContent>
    </Dialog>
  );
}
