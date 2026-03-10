"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export interface ProfileUpdateData {
    name: string;
    lastName: string;
    phone?: string;
    birthdate?: string;
}

export async function updateProfile(data: ProfileUpdateData) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.accessToken) {
            return { success: false, error: "No autorizado. Inicie sesión nuevamente." };
        }

        // El endpoint backend (corpluana/sauth) fue actualizado a RetrieveUpdateAPIView
        const res = await fetch(`${API_URL}/api/v2.0/user/me/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${API_KEY}`,
                "Authorization": `Bearer ${session.user.accessToken}`,
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
            // Manejar errores de validación del DRF
            let errorMessage = "Error al actualizar el perfil";
            if (responseData && typeof responseData === "object") {
                const errors = Object.values(responseData).flat();
                if (errors.length > 0 && typeof errors[0] === "string") {
                    errorMessage = errors[0];
                }
            }
            return { success: false, error: errorMessage };
        }

        revalidatePath("/dashboard/profile");
        return { success: true, message: "Perfil actualizado correctamente." };

    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Ocurrió un error inesperado al conectar con el servidor." };
    }
}
