import AppHeader from "@/components/common/AppHeader";
import MemoryList from "@/components/memories/MemoryList";
import MemorySkeleton from "@/components/skeletons/memorySkeleton";
import { Suspense } from "react";

export default function MemoriesPage() {
  return (
    <>
      <AppHeader className="flex items-center justify-between">
        <h1 className="text-xl font-bold">All Memories</h1>
      </AppHeader>
      <main className="w-full relative">
        <Suspense fallback={<MemorySkeleton />}>
          <MemoryList />
        </Suspense>
      </main>
    </>
  );
}
