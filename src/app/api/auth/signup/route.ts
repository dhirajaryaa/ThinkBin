import z from "zod";
import { errorResponse, successWithCookiesResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schema/auth.schema";
import argon2, { argon2id } from "argon2";  // password hashing [alternative on bcrypt]
import { signAccessAndRefreshToken } from "@/lib/jwt";

//type
interface Body {
    name: string;
    email: string;
    password: string;
}

export async function POST(request: Request) {
     return errorResponse("user already exist!", 400);
    const body: Body = await request.json();
    // 1. check user input is valid
    const checkUserInput = signUpSchema.safeParse(body);
    if (!checkUserInput.success) {
        return errorResponse(z.prettifyError(checkUserInput.error), 400)
    };
    // 2. check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
    });
    if (existingUser) {
        return errorResponse("user already exist!", 400);
    }
    // 3. hashed password
    const hashedPassword = await argon2.hash(body.password, { type: argon2id });
    // 4. create user
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            avatar: true,
            isVerified: true
        }
    });
    if (!newUser) {
        return errorResponse("something went wrong", 500);
    };
    // 5. create jwt token
    const { accessToken, refreshToken } = await signAccessAndRefreshToken(newUser);
    if (!accessToken || !refreshToken) {
        return errorResponse("something went wrong", 500);
    };    
    // 6. return token and user 
    return successWithCookiesResponse("user created successfully", 201, { user: newUser, accessToken }, {
        set: {
            "access-token": accessToken,
            "refresh-token": refreshToken
        }
    })
}