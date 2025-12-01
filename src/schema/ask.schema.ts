import z from "zod";

export const askQuestionSchema = z.object({
    query: z.string({ error: "Query is required" })
        .min(3, { error: "Query must be at least 3 characters" })
        .max(10000, { error: "Query must be less than or equal to 10000 characters" }),
});