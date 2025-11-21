import { DashboardHeader } from "@/components/common/Header";
import EditorWrapper from "@/components/notes/EditorWrapper";

export default function CreateNotePage() {
  return (
    <section className="w-full min-h-svh px-4 sm:px-6">
      <DashboardHeader title="Capture Memories" />
      <div className="w-full min-h-[90vh] pt-8">
        <EditorWrapper />
      </div>
    </section>
  );
}
