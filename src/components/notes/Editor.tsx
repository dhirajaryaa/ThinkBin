"use client";

import type { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@/styles/blocknote.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";

interface InputProps {
  editorRef?: React.RefObject<BlockNoteEditor | null>;
}

export default function Editor({ editorRef }: InputProps) {
  const editor: BlockNoteEditor = useCreateBlockNote({
placeholders: {
  default: "Start brainstorming... or use '/' for actions",
  heading: "Name your idea...",
  bulletListItem: "Add a thought...",
  numberedListItem: "Add a step...",
  checkListItem: "Add an action...",
  new_comment: "Share your feedback...",
  edit_comment: "Refine your thought...",
  comment_reply: "Add your perspective...",
}

  });
  // set editor ref
  useEffect(() => {
    if (editorRef) editorRef.current = editor;
  }, [editor, editorRef]);

  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      id="thinkbin-editor"
      className="min-h-full w-full h-[50vh]"
    />
  );
}
