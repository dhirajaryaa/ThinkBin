import { systemPrompt } from "@/prompts/system";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.TB_GROQ_API_KEY });

export const llmService = async (prompt: string) => {
    const chat = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: prompt
            },
        ],
        model: "llama-3.1-8b-instant",
    });
    return chat.choices[0].message.content || "";
}