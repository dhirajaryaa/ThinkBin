import EditorWrapper from "@/components/notes/EditorWrapper";

export default function CreateNotePage() {
  return (
    <>
      <main className="w-full min-h-svh">
        <div className="w-full min-h-[90vh] pt-8">
          <EditorWrapper />
        </div>
      </main>
    </>
  );
}
