'use client'

import { useState } from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import SearchForm from "./search-form";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function SearchPage() {

    const [results, setResults] = useState<typeof api.search.searchAction._returnType>(null);

    return (
        <main>
            <div className="flex justify-between items center" >
                <h1 className="text-4xl font-bold">Search</h1>
            </div>

            <SearchForm setResults={setResults} />

            <ul className="space-y-8">
                {results?.map((result) => {
                    if (result.type === 'notes') {

                        return (
                            <Link href={`/dashboard/notes/${result.record._id}`}><li className="bg-slate-800 rounded p-4 whitespace-pre-line">
                                type: Note
                                {result.record.text.substring(0, 500) + "..."}</li></Link>)
                    }
                    else {
                        return (<Link href={`/dashboard/documents/${result.record._id}`}><li className="bg-slate-800 rounded p-4 whitespace-pre-line">
                            type: Document
                            {result.record.title}
                            {result.record.description?.substring(0, 500) + "..."}
                        </li></Link>)
                    }
                })
                }
            </ul>
        </main >
    )
}