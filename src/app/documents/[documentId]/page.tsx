"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import ChatPanel from "./chat-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="document" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            <div className="bg-gray-600 p-4 rounded-xl flex-1 h-[500px]">
              {document.documentUrl && (
                <iframe
                  style={{
                    border: "2px solid blue",
                    opacity: 0.8,
                    transform:
                      "rotate(10deg) translate(10px, 35px) skewX(10deg) ",
                    perspective: "200px",
                  }}
                  className="w-full h-full"
                  src={document.documentUrl}
                />
              )}
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <ChatPanel documentId={params.documentId} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
