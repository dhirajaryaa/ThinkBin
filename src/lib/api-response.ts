import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ApiSuccessResponse<T = any> extends ApiResponse<T> {
    success: true;
}

export interface ApiErrorResponse extends ApiResponse {
    success: false;
}

//  ========== susses response =========== 
export const successResponse = <T>(
    message: string,
    status: number = 200,
    data?: T
): Response => {

    const json: ApiSuccessResponse<T> = {
        success: true,
        message,
        data
    }
    return new Response(JSON.stringify(json), {
        status,
        headers: {
            "Content-Type": "application/json"
        }
    })
};

//  ========== success + cookies response =========== 
export const successWithCookiesResponse = <T>(
    message: string,
    status: number = 200,
    data: T,
    cookies?: {
        delete?: string,
        set?: Record<string, string>
    }
) => {

    const json: ApiSuccessResponse<T> = {
        success: true,
        message,
        data
    }
    const res = NextResponse.json(json, {
        status
    });

    if (cookies) {
        // Delete cookies
        if (cookies?.delete) {
            const toDelete = Array.isArray(cookies.delete)
                ? cookies.delete
                : [cookies.delete];

            toDelete.forEach((ck) => res.cookies.delete(ck));
        }
        // Set cookies
        if (cookies?.set) {
            Object.entries(cookies.set).forEach(([key, value]) => {
                res.cookies.set(key, value, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict"
                });
            });
        }
    }

    return res;
};

//  ========== error response =========== 
export const errorResponse = (
    message: string,
    status: number = 500,
    data?: any
): Response => {

    const json: ApiErrorResponse = {
        success: false,
        message,
        data
    }
    return new Response(JSON.stringify(json), {
        status,
        headers: {
            "Content-Type": "application/json"
        }
    })
};