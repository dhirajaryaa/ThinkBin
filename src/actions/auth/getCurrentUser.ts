'use server';

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function getCurrentUser() {
    try {
        // read token 
        const cookieStore = await cookies();
        const token = cookieStore.get("thinkbin_user_session")?.value;
        if (!token) return null;

        // check session with user
        const session = await prisma.session.findUnique({
            where: { id: token },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        isVerified: true,
                        notes: true,
                        createdAt: true
                    }
                }
            }
        });
        if (!session) return null;

        // check token expired 
        if (session.expiredAt < new Date()) {
            await prisma.session.delete({ where: { id: token } });
            return null;
        }
        // return user 
        return session.user;

    } catch (err) {
        console.error("getCurrentUser error:", err);
        return null;
    }
}