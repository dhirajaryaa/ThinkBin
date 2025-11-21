import { Skeleton } from "@/components/ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="w-full h-[50vh] rounded-lg space-y-3">
      <Skeleton className="w-2/3 h-12 rounded-lg "></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg mt-8"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
    </div>
  );
}
