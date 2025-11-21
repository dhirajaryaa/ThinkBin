import GoBackBtn from "@/components/common/GoBackBtn";
import EditorWrapper from "@/components/notes/EditorWrapper";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Save } from "lucide-react";

export default function CreateNotePage() {
  return (
    <>
      <header className="flex items-center justify-between">
        <GoBackBtn />
        <div className="flex items-center gap-2">
          <RefreshCcw className="size-5 text-muted-foreground" />
          <Button size={"sm"} form="note-form">
            <Save />Save
          </Button>
        </div>
      </header>
      <main className="w-full h-5 pt-8">
        <EditorWrapper />
      </main>
    </>
  );
}
