"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import EditorSkeleton from "@/components/skeletons/EditorSkeleton";
import { Button } from "@/components/ui/button";
import { Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import TagSelector from "./TagSelector";
import { createNote } from "@/actions/notes/createNote";
import { createNoteSchema } from "@/schema/note.schema";
import z from "zod";
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
    const content = await editor
      ?.blocksToMarkdownLossy(editor?.document)
      .trim();

    const validate = createNoteSchema.safeParse({ title, content, tags });
    if (!validate.success) {
      toast.error(z.prettifyError(validate.error) || validate.error.message);
      return;
    }

    const res = await createNote(validate.data);
    if (res.success) {
      toast.success("Note saved successfully!", {
        description: JSON.stringify(res.data, null, 2),
      });
    } else {
      toast.error(res.error);
    }

    //?  Clear form values
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
