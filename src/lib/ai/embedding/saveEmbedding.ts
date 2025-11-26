import { Document } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

export interface DocumentMetadata {
    contentName: string;
    userId: string;
    chunkIndex: number;
    timestamp: string;
    sourceType?: string;
};

export const generateAndSaveEmbedding = async (chunks: string[], memoryId: string, userId: string, sourceType?: string) => {
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        apiKey: process.env.TB_GEMINI_API_KEY!
    });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: process.env.TB_QDRANT_HOST!,
        apiKey: process.env.TB_QDRANT_API_KEY!,
        collectionName: "tb-memories",
    })
    // create documents 
    const documents = chunks.map((chunk, index) => new Document({
        pageContent: chunk,
        metadata: {
            contentName: memoryId,
            userId: userId,
            chunkIndex: index,
            totalChunks: chunks.length,
            timestamp: new Date().toISOString(),
            sourceType: sourceType || "TEXT"
        } as DocumentMetadata,
    }));

    const ids = await vectorStore.addDocuments(documents);
    return ids;
}