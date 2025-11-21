import { Skeleton } from "@/components/ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="w-full h-[50vh] rounded-lg space-y-3 mt-8">
      <Skeleton className="w-full h-8 rounded-lg "></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
      <Skeleton className="w-full h-8 rounded-lg"></Skeleton>
    </div>
  );
}
