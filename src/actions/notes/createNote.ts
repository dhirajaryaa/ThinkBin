'use server';

import type { Note } from "@/generated/prisma/client";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { createNoteSchema } from "@/schema/note.schema";
import { cookies } from "next/headers";
import z from "zod";

interface NoteResponse<T> {
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

export async function createNote(userInput: UserInput): Promise<NoteResponse<Note>> {
    // console.log(userInput);
    const validate = createNoteSchema.safeParse(userInput);
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

    const newNote = await prisma.$transaction(async (ax) => {
        const note = await ax.note.create({
            data: {
                title: userInput.title || "Untitled Note",
                content: userInput.content,
                sourceType: "TEXT",
                userId: session.userId
            }
        });
        await ax.noteTag.createMany({
            data: userInput.tags?.map((tag) => ({
                noteId: note.id,
                tag
            })) ?? []
        });
        return note
    });
    if (!newNote) {
        return {
            success: false,
            error: "Internal Server Error! Please try again."
        }
    };

    return {
        success: true,
        message: "Notes created successfully!",
        data: newNote
    }
}