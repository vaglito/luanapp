import apiPrivate from "../apiPrivate";
import axios from "axios";

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
    try {
        const response = await apiPrivate.get("/api/v2.0/auth/user/me/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        const status = axios.isAxiosError(error) ? error.response?.status : "Unknown";
        throw new Error(`Failed to fetch fresh backend profile: ${status}`);
    }
}

/**
 * Encapsulates the logic to PATCH the user profile in the backend.
 */
export async function updateUserProfile(token: string, data: ProfileUpdateData) {
    try {
        const response = await apiPrivate.patch("/api/v2.0/auth/user/me/", {
            name: data.name,
            last_name: data.lastName,
            phone: data.phone,
            birthdate: data.birthdate,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { success: true, data: response.data };
    } catch (error: unknown) {
        let errorMessage = "Error al actualizar el perfil";
        
        if (axios.isAxiosError(error) && error.response?.data) {
            const responseData = error.response.data;
            const errors = Object.values(responseData as Record<string, unknown>).flat();
            if (errors.length > 0 && typeof errors[0] === "string") {
                errorMessage = errors[0];
            }
        }
        return { success: false, error: errorMessage };
    }
}
