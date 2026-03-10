import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import ProfileForm from "./components/ProfileForm";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export default async function ProfilePage() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/login");
    }

    // Fetch the current profile from the backend to get fields like birthdate and phone 
    // that might not be in the NextAuth session token initially.
    let backendProfile = null;

    try {
        const res = await fetch(`${API_URL}/api/v2.0/user/me/`, {
            headers: {
                "x-api-key": `${API_KEY}`,
                "Authorization": `Bearer ${session.user.accessToken}`,
            },
            // Using no-store to ensure we always get the latest profile data
            cache: "no-store",
        });

        if (res.ok) {
            backendProfile = await res.json();
        } else {
            console.error("Failed to fetch fresh backend profile", res.status);
        }
    } catch (error) {
        console.error("Error fetching backend profile", error);
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="800" color="text.primary">
                    Mi Perfil
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gestiona tu información personal y configuración de cuenta.
                </Typography>
            </Box>

            {/* Profile Form (Client Component) */}
            <ProfileForm user={session.user} backendProfile={backendProfile} />
        </Box>
    );
}
