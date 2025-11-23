import z from "zod";

export const createNoteSchema = z.object({
    title: z.string().optional(),
    tags: z.array(z.string({ error: "Tag is required" })).optional(),
    content: z.string({ error: "Content is required" })
        .min(3, { error: "Content must be at least 3 characters" })
        .max(10000, { error: "Content must be less than or equal to 10000 characters" })
});