'use client'

import { useParams } from "next/navigation"
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function NotePage() {


    const { noteId } = useParams<{ noteId: Id<"notes"> }>();
    const note = useQuery(api.notes.getNote, { noteId })

    return (
        <div>
            {note?.text}
        </div>
    )
}