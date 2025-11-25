import { serve } from "inngest/next";
import { inngestClient } from "@/inngest/client";
import { contentEmbedding } from "@/inngest/functions/contentEmbeddings";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngestClient,
    functions: [
        contentEmbedding
    ],
});