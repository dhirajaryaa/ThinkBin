"use server";

import { askQuestionSchema } from "@/schema/ask.schema";
import z from "zod";

interface QuestionState {
    success: boolean;
    error?: string | null;
    data?: string | null;
}

export async function askQuestion(_prevState: QuestionState, formData: FormData): Promise<QuestionState> {
    const query = formData.get("query")?.toString() as string;
    const validate = askQuestionSchema.safeParse({ query });
    if (!validate.success) {
        return { success: false, error: z.prettifyError(validate.error) }
    };

    console.log(query);

    return { success: true, data: query }
}