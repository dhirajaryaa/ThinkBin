"use server";

import { llmService } from "@/lib/ai/generation/llmService";
import { askQuestionSchema } from "@/schema/ask.schema";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import z, { json } from "zod";

interface QuestionState {
    success: boolean;
    error?: string | null;
    data?: string | null;
}

export async function askQuestion(_prevState: QuestionState, formData: FormData): Promise<QuestionState> {
    const query = formData.get("query")?.toString() as string;
    // validate input 
    const validate = askQuestionSchema.safeParse({ query });
    if (!validate.success) {
        return { success: false, error: z.prettifyError(validate.error) }
    };
    // get simmer document from store 
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        apiKey: process.env.TB_GEMINI_API_KEY!
    });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: process.env.TB_QDRANT_HOST!,
        apiKey: process.env.TB_QDRANT_API_KEY!,
        collectionName: "tb-memories",
    });
    const documents = await vectorStore.similaritySearch(query, 4);
    // llm call
    const llmAnswer = await llmService(query, documents);

    if (!llmAnswer) {
        return { success: false, error: "something went wrong!" }
    };

    return { success: true, data: llmAnswer };
}