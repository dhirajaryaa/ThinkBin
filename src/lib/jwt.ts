import { JWTPayload, SignJWT, jwtVerify } from 'jose';

// types
export interface TokenPayload extends JWTPayload {
    id: string;
    email: string;
    name: string;
}

const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
const refreshSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET!);


//  sign token 
export async function signAccessAndRefreshToken(payload: TokenPayload) {
    const accessToken = await new SignJWT({
        id: payload.id,
        email: payload.email,
        name: payload.name
    })
        .setExpirationTime(process.env.ACCESS_TOKEN_EXPIRY!)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(accessSecret);
    const refreshToken = await new SignJWT({ id: payload.id })
        .setExpirationTime(process.env.REFRESH_TOKEN_EXPIRY!)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .sign(refreshSecret);

    return {
        accessToken,
        refreshToken
    }
}

// verify token 
export async function verifyToken(token: string, SECRET: Uint8Array = accessSecret) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch (err) {
        return null;
    }
}