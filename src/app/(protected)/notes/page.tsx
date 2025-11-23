import AppHeader from "@/components/common/AppHeader";
import MemorySkeleton from "@/components/skeletons/memorySkeleton";

export default function NotesPage() {
  return (
    <>
      <AppHeader className="flex items-center justify-between">
        <h1 className="text-xl font-bold">All Notes</h1>
      </AppHeader>
      <main className="w-full relative">
       <MemorySkeleton />
      </main>
    </>
  );
}
