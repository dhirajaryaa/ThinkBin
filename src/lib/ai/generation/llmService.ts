import { systemPrompt } from "@/prompts/system";
import { Document } from "@langchain/core/documents";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.TB_GROQ_API_KEY });

export const llmService = async (query: string, memories: Document[]): Promise<string> => {
    const chat = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: `Generate an answer to the following question: ${query} , based on the user's memories: ${memories.map((memory) => memory.pageContent).join(", ")}, in markdown format.`
            },
        ],
        model: "llama-3.1-8b-instant",
        response_format: { type: "text" }
    });

    return chat.choices[0].message?.content || ""
}