import { Skeleton } from "@/components/ui/skeleton";

function MemorySkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 mt-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-full space-y-2">
          <Skeleton className="w-1/3 h-8" />
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-full h-30" />
        </div>
      ))}
    </section>
  );
}

export default MemorySkeleton;
