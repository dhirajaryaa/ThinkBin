import z from "zod";
import { errorResponse, successWithCookiesResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schema/auth.schema";
import argon2 from "argon2";  // password hashing [alternative on bcrypt]
import { signAccessAndRefreshToken } from "@/lib/jwt";

interface Body {
    email: string;
    password: string
}

export async function POST(request: Request) {
    const body: Body = await request.json();
    // 1. validate user input 
    const checkUserInput = loginSchema.safeParse(body);
    if (!checkUserInput.success) {
        return errorResponse(z.prettifyError(checkUserInput.error), 400)
    }
    // 2. check user exist
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    if (!user) {
        return errorResponse("user not found!", 404)
    };
    // 3. password match
    const validPassword = await argon2.verify(user.password, body.password);
    if (!validPassword) {
        return errorResponse("Invalid email or password", 401)
    };
    // 4. token generate & save
    const { accessToken, refreshToken } = await signAccessAndRefreshToken(user);
    if (!accessToken || !refreshToken) {
        return errorResponse("something went wrong", 500);
    };
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            refreshToken: refreshToken
        },
        select: {
           id:true,
           name:true,
           email:true,
           isVerified:true,
           avatar:true,
           createdAt:true,
           notes:true
        }
    })
    // 5. return user res
    return successWithCookiesResponse("user login successfully", 201, { user: updatedUser, accessToken }, {
        set: {
            "access-token": accessToken,
            "refresh-token": refreshToken
        }
    })
};