"use server";

import { llmService } from "@/lib/ai/generation/llmService";
import { userPrompt } from "@/prompts/user";
import { askQuestionSchema } from "@/schema/ask.schema";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

interface QuestionState {
    success: boolean;
    error?: string | null;
    data?: string;
}

export async function askQuestion(query: string): Promise<QuestionState> {
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
    const context = documents.map((doc) => doc.pageContent).join("\n\n");
    const prompt = userPrompt.replace("{{user_question}}", query).replace("{{retrieved_context}}", context);

    const llmAnswer = await llmService(prompt);

    if (!llmAnswer) {
        return { success: false, error: "something went wrong!" }
    };

    return { success: true, data: llmAnswer };
}