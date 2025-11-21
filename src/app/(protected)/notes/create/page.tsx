import { DashboardHeader } from "@/components/common/Header";
import EditorWrapper from "@/components/notes/EditorWrapper";
import { Button } from "@/components/ui/button";
import { MoreVertical, Save } from "lucide-react";

export default function CreateNotePage() {
  return (
    <section className="w-full min-h-svh px-4 sm:px-6">
      <DashboardHeader title="Capture Memories">
        <div className="flex items-center gap-2 ">
         
          <Button variant="ghost" size={"icon-sm"}>
            <MoreVertical />
          </Button>
        </div>
      </DashboardHeader>
      <div className="w-full min-h-[90vh] pt-8">
        <EditorWrapper />
      </div>
    </section>
  );
}
