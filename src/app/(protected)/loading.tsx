import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="h-[90vh] w-full flex items-center justify-center">
      <div className="w-xs flex items-center justify-center gap-3 flex-col">
        <Loader2 className="size-8 sm:size-10 animate-spin" />
        <p className="text-muted-foreground font-medium text-sm sm:text-lg">
          Please wait…
        </p>
      </div>
    </section>
  );
}
