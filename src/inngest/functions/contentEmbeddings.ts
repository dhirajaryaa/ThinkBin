import { inngestClient } from "@/inngest/client";
import { generateEmbedding } from "@/lib/ai/generateEmbedding";
import { textSplitter } from "@/lib/ai/textSplitter";
import { prisma } from "@/lib/prisma";

export const contentEmbedding = inngestClient.createFunction(
    { id: "content-embedding" },
    { event: "tb/content.embedded" },
    async ({ event, step }) => {
        const memoryId = event.data.id;

        // step 1. - get content form db 
        const content = await step.run("get-content-from-db", async () => {
            return await prisma.memory.findUnique({ where: { id: memoryId } })
        });
        // step 2. - chunk the content
        const chunks = await step.run("chunk-the-content", async () => {
            const mdData = `title:${content?.title};content${content?.content}`
            return await textSplitter(mdData, { chunkSize: 500, chunkOverlap: 100 });
        })
        // step 3. - generate embedding
        const vectors = await step.run("generate-embedding", async () => {
            return await generateEmbedding(chunks);
        })
        // step 4. - save embedding with chunkIndex
        await step.run("save-embedding", async () => {
            if (!vectors) return { status: "failed" };
            // db save embedding
            await Promise.all(
                vectors.map(async (vector, index) => {
                    const embeddingStr = `[${vector.values?.join(',')}]`;
                    await prisma.$executeRawUnsafe(`
        INSERT INTO "MemoryChunk" ("id","memoryId", "chunkIndex", "content", "embedding")
        VALUES (gen_random_uuid(),'${memoryId}', ${index}, '${chunks[index]}', '${embeddingStr}')
      `);
                })
            );
            return "success";
        })
        return { status: "success" }
    }
);
