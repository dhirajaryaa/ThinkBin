"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import EditorSkeleton from "@/components/notes/EditorSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Sparkle, Sparkles } from "lucide-react";
// editor dynamic import
export const Editor = dynamic(() => import("@/components/notes/Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

function EditorForm() {
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    const editor = editorRef.current;

    if (!editor) return;
    const body = await editor?.blocksToMarkdownLossy(editor?.document);
    console.info("MARKDOWN:", body.trim());

    // Clear form values
    setTags([]);
    editor.removeBlocks(editor.document);
  };

  const tagInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
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
          />
          {/* tag  */}
          <div className="flex items-center gap-2 flex-wrap ring-foreground/10">
            {tags.map((tag, index) => (
              <Badge key={index} variant={"secondary"}>
                #{tag}
              </Badge>
            ))}
            <input
              aria-label="add tag"
              placeholder="Add a tag here..."
              className="inline focus:outline-0 text-sm"
              onKeyUp={tagInputHandler}
            />
          </div>
          {/* body  */}
          <Editor editorRef={editorRef} />
        </div>
        <section className="flex items-center z-20 justify-between sticky bottom-2 w-full ">
          <Button variant="outline">
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
