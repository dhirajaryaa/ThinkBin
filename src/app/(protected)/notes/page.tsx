import AppHeader from "@/components/common/AppHeader";
import NoteList from "@/components/notes/NoteList";
import MemorySkeleton from "@/components/skeletons/memorySkeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const Notes = dynamic(() => import("@/components/notes/NoteList"), {
//   loading: () => <MemorySkeleton />,
// });

export default function NotesPage() {
  return (
    <>
      <AppHeader className="flex items-center justify-between">
        <h1 className="text-xl font-bold">All Notes</h1>
      </AppHeader>
      <main className="w-full relative">
        <Suspense fallback={<MemorySkeleton />}>
          <NoteList />
        </Suspense>
        {/* <MemorySkeleton /> */}
      </main>
    </>
  );
}
