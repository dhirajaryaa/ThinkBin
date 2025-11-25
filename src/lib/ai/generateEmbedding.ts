import { GoogleGenAI } from "@google/genai";

export const generateEmbedding = async (chunks: string[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.TB_GEMINI_API_KEY });
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: chunks,
        config: {
            outputDimensionality: 1536
        },
    });    
    return response.embeddings;
}