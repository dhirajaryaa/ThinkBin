"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface InputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagSelector({ tags, setTags }: InputProps) {
  const tagInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tag = e.currentTarget.value.trim();
      if (!tag) return;
      setTags(() => [...tags, tag]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number) => {
    return setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center gap-2 flex-wrap ring-foreground/10">
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant={"secondary"}
          className="group/tag cursor-pointer"
        >
          #{tag}
          <button
            className="hidden  group-hover/tag:block"
            onClick={() => removeTag(index)}
          >
            <X size={14} className="mt-[1px]" />
          </button>
        </Badge>
      ))}
      <input
        aria-label="add tag"
        placeholder="Add a tag here..."
        className="inline focus:outline-0 text-sm"
        onKeyDown={tagInputHandler}
      />
    </div>
  );
}

export default TagSelector;
