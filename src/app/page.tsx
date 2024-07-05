"use client";

import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { api } from "../../convex/_generated/api";

import { SignOut } from "./(auth)/SignOut";
import { SignInFormPassword } from "./(auth)/SignInForm";
import { Button } from "@/components/ui/button";
import DocumentCard from "./documentCard";

import UploadDocumentButton from "./uploadDocumentButton";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="p-24 space-y-8">
      <AuthLoading>Carregando...</AuthLoading>
      <Unauthenticated>{""}</Unauthenticated>
      <Authenticated>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">My Documents</h1>

          <UploadDocumentButton />
        </div>

        <div className="grid grid-cols-4 gap-8">
          {documents?.map((doc) => (
            <DocumentCard document={doc} key={doc._id} />
          ))}
        </div>
      </Authenticated>
    </main>
  );
}
