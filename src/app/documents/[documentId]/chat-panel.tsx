"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="w-[300px] bg-gray-600 p-4 rounded flex flex-col gap-2">
      <div className="h-[250px] overflow-y-auto">
        Panel
        <div className="bg-gray-800 p-4">Test</div>
      </div>
      <div className="flex gap-1">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;

            await askQuestion({ question: text, documentId }).then(console.log);
          }}
        >
          <Input required name="text" placeholder="Type your message" />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
}
