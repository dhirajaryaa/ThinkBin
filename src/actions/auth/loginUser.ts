'use server';

import { createSessionWithCookies } from "@/lib/auth/session";
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
    try {
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
        await createSessionWithCookies(user.id)

    } catch (error) {
        console.error(error);
        return { success: false, error: "something went wrong! try again" };
    }
    // redirect 
    redirect('/dashboard');

}