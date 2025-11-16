import { handleError } from "@/lib/error/handleError";

export async function AsyncHandler<T extends (...args: any[]) => Promise<any>>(fn: T) {
    return (...args: Parameters<T>): Promise<ReturnType<T>> => {
        return Promise.resolve(fn(...args)).catch((err) => handleError(err));
    };
}