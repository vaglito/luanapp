"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { updateUserProfile, ProfileUpdateData } from "@/services/user-service";

export async function updateProfile(data: ProfileUpdateData) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.accessToken) {
            return { success: false, error: "No autorizado. Inicie sesión nuevamente." };
        }

        const result = await updateUserProfile(session.user.accessToken, {
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            birthdate: data.birthdate,
        });

        if (!result.success) {
            return { success: false, error: result.error };
        }

        revalidatePath("/dashboard/profile");
        return { success: true, message: "Perfil actualizado correctamente." };

    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Ocurrió un error inesperado al conectar con el servidor." };
    }
}
