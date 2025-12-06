import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.TB_GROQ_API_KEY });

export const llmService = async (query: string): Promise<string> => {
    const chat = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: "Explain the importance of fast language models",
            },
        ],
        model: "llama-3.1-8b-instant",
    });

    return chat.choices[0].message?.content || ""
}