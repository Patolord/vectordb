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

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocument);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthLoading>Carregando...</AuthLoading>
      <Unauthenticated>
        <SignInFormPassword />
      </Unauthenticated>
      <Authenticated>
        <SignOut />
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => createDocument({ title: "hello world" })}
        >
          Click me
        </Button>

        {documents?.map((doc) => <div key={doc._id}>{doc.title}</div>)}
      </Authenticated>
    </main>
  );
}
