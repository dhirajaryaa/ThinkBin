import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="min-h-svh w-full flex items-center justify-center">
      <div className="w-xs flex items-center justify-center gap-3 flex-col">
        <Loader2 className="size-8 sm:size-10 md:size-14 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm sm:text-lg md:text-xl">
          Please wait…
        </p>
      </div>
    </section>
  );
}
