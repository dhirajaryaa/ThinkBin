'use server';

import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function logoutUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
        if (!token) return {
            success: false,
            error: "session not found!"
        };

        // remove session from database
        await prisma.session.delete({
            where: { token }
        });

        // remove session from browser
        cookieStore.delete(SESSION_COOKIE_NAME);

        return {
            success: true,
            error : null
        };
    } catch (error) {
        return {
            success: false,
            error: "something went wrong!"
        }
    };
}