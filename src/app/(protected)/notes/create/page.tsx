import GoBackBtn from "@/components/common/GoBackBtn";
import EditorWrapper from "@/components/notes/EditorWrapper";
import { Button } from "@/components/ui/button";
import { MoreVertical, RefreshCcw } from "lucide-react";

export default function CreateNotePage() {
  return (
    <>
      <header className="flex items-center justify-between z-20 w-full sticky top-4">
        <GoBackBtn />
        <div className="flex items-center gap-2">
          <RefreshCcw className="size-5 text-muted-foreground" /> Saving...
          <Button variant="ghost" size={"icon-sm"} form="note-form">
            <MoreVertical />
          </Button>
        </div>
      </header>
      <main className="w-full h-full">
        <EditorWrapper />
      </main>
    </>
  );
}
