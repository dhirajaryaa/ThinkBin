import { DashboardHeader } from "@/components/common/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateNotePage() {
  return (
    <section className="w-full min-h-svh p-4 sm:px-6">
      <DashboardHeader title="Capture Knowable" />
      <ScrollArea className="w-full h-[90vh] overflow-auto pt-4">
        
      </ScrollArea>
    </section>
  );
}
