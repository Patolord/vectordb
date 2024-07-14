"use client";

import {
  useQuery,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { api } from "../../convex/_generated/api";

import DocumentCard from "./documentCard";

import UploadDocumentButton from "./uploadDocumentButton";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <main className="p-24 space-y-8">
      <AuthLoading>
        {documents === undefined && (
          <div className="grid grid-cols-4 gap-8">
            {new Array(8).fill("").map((_, i) => (
              <Card
                key={i}
                className="h-[200px] p-6 flex flex-col justify-between"
              >
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="w-[80px] h-[40px] rounded" />
              </Card>
            ))}
          </div>
        )}
      </AuthLoading>
      <Unauthenticated>{""}</Unauthenticated>
      <Authenticated>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">My Documents</h1>

          <UploadDocumentButton />
        </div>

        {documents === undefined && (
          <div className="grid grid-cols-4 gap-8">
            {new Array(8).fill("").map((_, i) => (
              <Card
                key={i}
                className="h-[200px] p-6 flex flex-col justify-between"
              >
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="h-[20px] rounded" />
                <Skeleton className="w-[80px] h-[40px] rounded" />
              </Card>
            ))}
          </div>
        )}

        {documents && documents.length > 0 && (
          <div className="grid grid-cols-4 gap-8">
            {documents?.map((doc) => (
              <DocumentCard document={doc} key={doc._id} />
            ))}
          </div>
        )}

        {documents && documents.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-8">
            <h2> No documents</h2>
          </div>
        )}
      </Authenticated>
    </main>
  );
}
