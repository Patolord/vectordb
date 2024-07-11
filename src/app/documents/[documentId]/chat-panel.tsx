"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.askQuestion);

  return (
    <div className="bg-gray-900 p-4 rounded flex flex-col gap-2">
      <div className="h-[250px] overflow-y-auto space-y-3">
        <div className="dark:bg-slate-950 rounded p-2 ">
          AI: Ask any question using AI about this document below
        </div>
        <div
          className={cn({ "bg-slate-800": true }, " rounded p-2 text-right")}
        >
          YOU: Ask any question using AI about this document below
        </div>
      </div>
      <div className="flex gap-1">
        <form
          className="flex-1"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const text = formData.get("text") as string;

            await askQuestion({ question: text, documentId }).then(console.log);
          }}
        >
          <div className="flex gap-2">
            <Input
              className="flex-1"
              required
              name="text"
              placeholder="Type your message"
            />
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
