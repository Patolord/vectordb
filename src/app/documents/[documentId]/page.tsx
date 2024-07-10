"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatPanel from "./chat-panel";

export default function DocumentPage({
  params,
}: {
  params: { documentId: Id<"documents"> };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  if (!document) return <div>No Access</div>;

  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>
      <div className="flex gap-6">
        <div className="bg-gray-600 p-4 rounded flex-1">
          {document.documentUrl && <iframe src={document.documentUrl} />}
        </div>

        <ChatPanel documentId={params.documentId} />
      </div>
    </main>
  );
}
