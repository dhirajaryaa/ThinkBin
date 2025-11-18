'use server';

import z from "zod";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schema/auth.schema";
import argon2 from 'argon2';
import { redirect } from "next/navigation";

type SignUpState = {
    success: boolean;
    error: string | null;
}

export async function signupUser(_prevState: SignUpState, formData: FormData): Promise<SignUpState> {
    // validate input 
    const validate = signUpSchema.safeParse({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string
    });

    if (!validate.success) {
        return { success: false, error: z.prettifyError(validate.error) }
    }
    try {
        const { name, email, password } = validate.data;

        // check user on db 
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (user) {
            return { success: false, error: "user already exist!" }
        };

        //    hash password 
        const hashedPassword = await argon2.hash(password);

        //create user 
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
    } catch (error) {
        console.error(error);
        return { success: false, error: "something went wrong! try again" };
    }
    redirect("/login");
}