"use client";

import { ArrowLeft, Brain, Save } from "lucide-react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import { Button } from "@/components/ui/button";
import EditorSkeleton from "@/components/notes/EditorSkeleton";
// editor dynamic import
export const Editor = dynamic(() => import("@/components/notes/Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

function EditorWrapper() {
  const editorRef = useRef<BlockNoteEditor | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editor = editorRef.current;
    if (!editor) return;
    const markdown = await editor?.blocksToMarkdownLossy(editor?.document);
    console.log("MARKDOWN:", markdown.trim());
  };

  return (
    <div className="container mx-auto max-w-4xl h-full w-full">
      <Button size={"sm"} className="mb-3" variant={"ghost"}>
        <ArrowLeft />
        Back
        <span className="hidden sm:inline">Back</span>
      </Button>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto max-w-4xl h-full px-8 w-full"
      >
        <input
          name="title"
          aria-label="title"
          className="font-bold text-4xl mb-8 w-full placeholder:text-muted-foreground/80 focus:outline-none"
          placeholder="Untitled Note"
        />

        <Editor editorRef={editorRef} />
      </form>
    </div>
  );
}

export default EditorWrapper;
