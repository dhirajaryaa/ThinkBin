"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  HtmlHTMLAttributes,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import EditorSkeleton from "@/components/notes/EditorSkeleton";
import { Input } from "../ui/input";
import { string } from "zod";
import { Badge } from "../ui/badge";
// editor dynamic import
export const Editor = dynamic(() => import("@/components/notes/Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

function EditorWrapper() {
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editor = editorRef.current;
    const form = e.currentTarget;

    if (!editor || !form) return;
    // Get form values safely
    const formData = new FormData(form);
    const title = formData.get("title");
    const body = await editor?.blocksToMarkdownLossy(editor?.document);
    console.info("TITLE:", title);
    console.info("MARKDOWN:", body.trim());

    // Clear form values
    setTags([]);
    editor.removeBlocks(editor.document);
    form.reset();
  };

  const tagInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="container mx-auto max-w-4xl w-full">
      <form
        id="note-form"
        onSubmit={handleSubmit}
        className="container mx-auto max-w-4xl h-full px-8 w-full space-y-4"
      >
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
      </form>
    </div>
  );
}

export default EditorWrapper;
