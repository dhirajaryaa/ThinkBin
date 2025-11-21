import GoBackBtn from "@/components/common/GoBackBtn";
import EditorForm from "@/components/notes/EditorForm";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export default function CreateNotePage() {
  return (
    <>
      <header className="flex items-center justify-between z-20 w-full sticky top-4">
        <GoBackBtn />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size={"icon-sm"}>
            <MoreVertical />
          </Button>
        </div>
      </header>
      <main className="w-full relative">
        <EditorForm />
      </main>
    </>
  );
}
