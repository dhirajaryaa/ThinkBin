import { inngestClient } from "@/inngest/client";
import { generateAndSaveEmbedding } from "@/lib/ai/embedding/saveEmbedding";
import { textSplitter } from "@/lib/ai/textSplitter";
import { prisma } from "@/lib/prisma";
import { NonRetriableError, StepError } from "inngest";

export const contentEmbedding = inngestClient.createFunction(
    { id: "content-embedding" },
    { event: "tb/content.embedded" },
    async ({ event, step }) => {
        const memoryId = event.data.id;

        // step 1. - get content form db 
        const content = await step.run("get-content-from-db", async () => {
            const doc = await prisma.memory.findUnique({ where: { id: memoryId } });
            if (!doc) {
                 throw new NonRetriableError("Memory not found")
            };
            return doc
        });
        // step 2. - chunk the content
        const chunks = await step.run("chunk-the-content", async () => {
            const mdData = `title:${content?.title};content${content?.content}`
            return await textSplitter(mdData, { chunkSize: 500, chunkOverlap: 100 });
        })
        // step 3. - generate and save embedding
        await step.run("generate-and-save-embedding", async () => {
            if (!chunks) {
                throw new NonRetriableError("Chunks not found")
            };
            return await generateAndSaveEmbedding(chunks,memoryId,content?.userId,content?.sourceType);
        })
        return { status: "success" }
    }
);
