'use server';

import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getNotes() {
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

    const notes = await prisma.note.findMany({
        where: {
            userId: session.userId
        },
        include: {
            tags: true
        }
    });
    if (!notes) {
        return {
            success: false,
            error: "Notes not found!"
        }
    };
    return {
        success: true,
        data: notes
    }
}