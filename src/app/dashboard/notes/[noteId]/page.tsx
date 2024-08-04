'use client'

import { useParams } from "next/navigation"
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { DeletenoteButton } from "./deleteNoteButton";

export default function NotePage() {


    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    const note = useQuery(api.notes.getNote, { noteId })

    if (!note) return null

    return (
        <div className="relative">
            <DeletenoteButton noteId={note._id} />

            <div className="pr-3 whitespace-pre-line"> {note?.text}</div>

        </div>
    )
}