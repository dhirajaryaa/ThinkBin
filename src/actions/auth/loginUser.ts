'use server';

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schema/auth.schema";
import argon2 from 'argon2';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes } from "node:crypto";
import z from "zod";

type LoginState = {
    success: boolean;
    error: string | null;
};

export async function loginUser(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    // validate input 
    const validate = loginSchema.safeParse({
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });
    if (!validate.success) {
        return { success: false, error: z.prettifyError(validate.error) }
    }
    const { email, password } = validate.data;

    // check user on db
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!user) {
        return { success: false, error: "user not found!" }
    };

    // match password 
    const isPasswordMatching = await argon2.verify(user.password, password);
    if (!isPasswordMatching) {
        return { success: false, error: "invalid credential!" }
    };

    // create session 
    const token = randomBytes(32).toString("hex");
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await prisma.session.create({
        data: {
            id: token,
            userId: user.id,
            expiredAt
        }
    });
    if (!session) {
        return { success: false, error: "Internal Server Error" }
    };

    const cookieStore = await cookies();

    // set cookies 
    cookieStore.set("thinkbin_user_session", session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
    });

    // redirect 
    redirect('/dashboard');

}