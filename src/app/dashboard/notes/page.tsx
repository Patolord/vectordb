'use client'

import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";


export default function NotesPage() {

    const notes = useQuery(api.notes.getNotes)
    return (
        <div>PLease select a note</div>
    )
}