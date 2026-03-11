import "server-only";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export interface ProfileUpdateData {
    name: string;
    lastName: string;
    phone?: string;
    birthdate?: string;
}

/**
 * Encapsulates the logic to fetch the user profile from the backend.
 * This is a server-only service.
 */
export async function getUserProfile(token: string) {
    if (!API_URL || !API_KEY) {
        throw new Error("API environment variables are not configured properly.");
    }

    const res = await fetch(`${API_URL}/api/v2.0/auth/user/me/`, {
        headers: {
            "x-api-key": API_KEY,
            "Authorization": `Bearer ${token}`,
        },
        // Cache option to ensure we don't serve stale profile data
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch fresh backend profile: ${res.status}`);
    }

    return await res.json();
}

/**
 * Encapsulates the logic to PATCH the user profile in the backend.
 */
export async function updateUserProfile(token: string, data: ProfileUpdateData) {
    if (!API_URL || !API_KEY) {
        throw new Error("API environment variables are not configured properly.");
    }

    const res = await fetch(`${API_URL}/api/v2.0/auth/user/me/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            last_name: data.lastName,
            phone: data.phone,
            birthdate: data.birthdate,
        }),
    });

    const responseData = await res.json().catch(() => null);

    if (!res.ok) {
        let errorMessage = "Error al actualizar el perfil";
        if (responseData && typeof responseData === "object") {
            const errors = Object.values(responseData).flat();
            if (errors.length > 0 && typeof errors[0] === "string") {
                errorMessage = errors[0];
            }
        }
        return { success: false, error: errorMessage };
    }

    return { success: true, data: responseData };
}
