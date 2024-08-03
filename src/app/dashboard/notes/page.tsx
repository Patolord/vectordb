import CreateNoteButton from "./createNoteButton";

export default function NotesPage() {
    return (
        <main className="w-full space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">Notes</h1>
                <CreateNoteButton />
            </div>
        </main>
    )
}