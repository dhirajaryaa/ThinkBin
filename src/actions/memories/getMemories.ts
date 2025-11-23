"use server";

import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getMemories() {
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

    const memories = await prisma.memory.findMany({
        where: {
            userId: session.userId
        },
        include: {
            tags: true
        }
    });
    if (!memories) {
        return {
            success: false,
            error: "Memories not found!"
        }
    };
    return {
        success: true,
        data: memories
    }
}
