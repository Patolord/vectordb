'use client'

import { useQuery } from "convex/react";
import CreateNoteButton from "./createNoteButton";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export default function NotesLayout({ children, }: { children: React.ReactNode }) {


    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    const notes = useQuery(api.notes.getNotes)
    return (
        <main className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>

            <div className="flex gap-12">
                <ul className="space-y-2 w-[200px]">
                    {notes?.map((note) => (
                        <li key={note._id}
                            className={cn("text-base hover:text-cyan-100", {
                                "text-cyan-200": note._id === noteId

                            })}>
                            <Link href={`/dashboard/notes/${note._id}`}>{note.text.substring(0, 24) + "..."}</Link>
                        </li>
                    ))}
                </ul>
                <div className="bg-slate-800 roudend p-4 w-full">{children}</div>

            </div>
        </main>
    )
}