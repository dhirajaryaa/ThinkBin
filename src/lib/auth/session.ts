import crypto from "node:crypto"
import { getIpAddress } from "./deviceInfo";
import { cookies, headers } from "next/headers";
import { prisma } from "../prisma";
import { SESSION_COOKIE_NAME, SESSION_EXPIRATION } from "../constants";
import { userAgent } from "next/server";

type Session = {
    token: string;
    userId: string;
    ip: string;
};

const generateSessionToken = () => {
    return crypto.randomBytes(64).toString('hex').normalize();
};

const createUserSession = async ({
    token,
    userId,
    ip
}: Session) => {
    const headerList = await headers();
    const ua = userAgent({ headers: headerList });


    const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");
    return await prisma.session.create({
        data: {
            token: hashedToken,
            userId,
            ip,
            expiredAt: new Date(Date.now() + SESSION_EXPIRATION * 1000),
            uaBrowser: ua.browser.name?.split(" ")[0],
            uaOS: ua.os.name?.split(" ")[0],
            uaDevice: ua.device.type ?? "desktop",
        }
    })
}

export const createSessionWithCookies = async (userId: string) => {
    const token = generateSessionToken();
    const ip = await getIpAddress();

    const session = await createUserSession({
        token,
        userId,
        ip
    });

    // sign cookies 
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, session.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_EXPIRATION,
    });

    return;
};

