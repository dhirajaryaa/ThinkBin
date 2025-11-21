"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import EditorSkeleton from "@/components/notes/EditorSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Sparkle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import TagSelector from "./TagSelector";
// editor dynamic import
export const Editor = dynamic(() => import("@/components/notes/Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

function EditorForm() {
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    const editor = editorRef.current;

    if (!editor) return;
    const body = await editor?.blocksToMarkdownLossy(editor?.document);

    console.info("Title:", title);
    console.info("Tags:", tags);
    console.info("MARKDOWN:", body.replace(/\n+/g, "\n").trim());

    toast.success("Note saved successfully!");

    // Clear form values
    setTags([]);
    setTitle("");
    editor.removeBlocks(editor.document);
  };

  return (
    <>
      <section className="mx-auto max-w-4xl w-full h-full mt-6">
        <div className="px-8 space-y-4">
          {/* title  */}
          <input
            name="title"
            aria-label="title"
            className="font-bold text-4xl w-full placeholder:text-muted-foreground/80 focus:outline-none"
            placeholder="Untitled Note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* tag  */}
          <TagSelector tags={tags} setTags={setTags} />
          {/* body  */}
          <Editor editorRef={editorRef} />
        </div>
        <section className="flex items-center z-20 justify-between sticky bottom-2 w-full ">
          <Button
            variant="outline"
            onClick={() => toast.info("AI suggestions coming soon ✨")}
          >
            <Sparkles /> AI Suggestions
          </Button>
          <Button onClick={handleSubmit}>
            <Save />
            Save Note
          </Button>
        </section>
      </section>
    </>
  );
}

export default EditorForm;
