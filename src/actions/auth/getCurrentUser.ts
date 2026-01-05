"use server";

import { SESSION_COOKIE_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";

export async function getCurrentUser() {
    try {
        const headerList = await headers();
        const ua = userAgent({ headers: headerList });

        const cookieStore = await cookies();
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

        if (!token) return null;

        const session = await prisma.session.findUnique({
            where: { token },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                        isVerified: true,
                        memories: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!session) return null;

        //? expiration check
        if (session.expiredAt < new Date()) {
            await prisma.session.delete({ where: { token } });
            return null;
        };

        // Device fingerprint check (multi-device safe)
        const browser = ua.browser.name?.split(" ")[0];
        const os = ua.os.name?.split(" ")[0];
        const device = ua.device.type ?? "desktop";

        const deviceMatch =
            session.uaBrowser === browser &&
            session.uaOS === os &&
            session.uaDevice === device;

        if (!deviceMatch) return null;

        return session.user;
    } catch (err) {
        return null;
    }
}
