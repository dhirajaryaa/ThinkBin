export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, { credentials: 'include', ...options });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }
        return data;
    } catch (error: any) {
        console.error("API Client Error:", error.message);
        throw error;
    }
}
