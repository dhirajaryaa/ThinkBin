"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import EditorSkeleton from "@/components/skeletons/EditorSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import TagSelector from "./TagSelector";
import { createMemory } from "@/actions/memories/createMemory";
import { createMemorySchema } from "@/schema/memory.schema";
import z from "zod";
// editor dynamic import
export const Editor = dynamic(() => import("@/components/memories/Editor"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

function EditorForm() {
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    const editor = editorRef.current;

    if (!editor) return;
    const content = await editor
      ?.blocksToMarkdownLossy(editor?.document)
      .trim();

  const validate = createMemorySchema.safeParse({ title, content, tags });
    if (!validate.success) {
      toast.error(z.prettifyError(validate.error));
      return;
    }

    const res = await createMemory(validate.data);
    if (res.success) {
      toast.success("Memory saved successfully!");
    } else {
      toast.error(res.error);
    }

    //?  Clear form values
    setTags([]);
    setTitle("");
    editor.removeBlocks(editor.document);
    setLoading(false);
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
            placeholder="Untitled Memory"
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
            onClick={() => toast.info("AI suggestions coming soon ✨",{closeButton:true})}
          >
            <Sparkles /> AI Suggestions
          </Button>
          <Button onClick={handleSubmit}>
            {loading ? <Loader2 className="animate-spin size-5" /> : <Save />}
            Save Memory
          </Button>
        </section>
      </section>
    </>
  );
}

export default EditorForm;
