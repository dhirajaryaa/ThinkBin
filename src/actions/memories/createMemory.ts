"use server";

import type { Memory } from "@/generated/prisma/client";
import { inngestClient } from "@/inngest/client";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { createMemorySchema } from "@/schema/memory.schema";
import { cookies } from "next/headers";
import z from "zod";

interface MemoryResponse<T> {
    success: boolean;
    error?: string | null;
    message?: string | null;
    data?: T | null
}
interface UserInput {
    title?: string,
    content: string,
    tags?: string[]
}

export async function createMemory(userInput: UserInput): Promise<MemoryResponse<Memory>> {
    const validate = createMemorySchema.safeParse(userInput);
    if (!validate.success) {
        return {
            success: false,
            error: z.prettifyError(validate.error) || validate.error.message
        }
    };
    const CookieStore = await cookies();
    const session = await prisma.session.findUnique({
        where: { token: CookieStore.get(SESSION_COOKIE_NAME)?.value },
    });
    if (!session) {
        return {
            success: false,
            error: "Unauthorized Request!"
        }
    };

    const newMemory = await prisma.$transaction(async (ax) => {
        const memory = await ax.memory.create({
            data: {
                title: userInput.title || "Untitled Memory",
                content: userInput.content,
                sourceType: "TEXT",
                userId: session.userId
            }
        });
        await ax.memoryTag.createMany({
            data: userInput.tags?.map((tag) => ({
                memoryId: memory.id,
                tag
            })) ?? []
        });
        return memory
    });
    if (!newMemory) {
        return {
            success: false,
            error: "Internal Server Error! Please try again."
        }
    };

    // run inngest embedding fn.
    await inngestClient.send({
        name: "tb/content.embedded",
        data: {
            id: newMemory.id
        }
    });

    return {
        success: true,
        message: "Memory created successfully!",
        data: newMemory
    }
}
