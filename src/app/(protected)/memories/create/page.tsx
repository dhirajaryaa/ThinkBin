import AppHeader from "@/components/common/AppHeader";
import GoBackBtn from "@/components/common/GoBackBtn";
import EditorForm from "@/components/memories/EditorForm";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export default function CreateMemoryPage() {
  return (
    <>
      <AppHeader className="flex items-center justify-between">
        <GoBackBtn />
        <div className="flex items-center gap-2">
          <Button variant="ghost" size={"icon-sm"}>
            <MoreVertical />
          </Button>
        </div>
      </AppHeader>
      <main className="w-full relative">
        <EditorForm />
      </main>
    </>
  );
}
