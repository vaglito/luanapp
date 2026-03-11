import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";
import ProfileForm from "./components/ProfileForm";
import { getUserProfile } from "@/services/user-service";

export default async function ProfilePage() {
    const session = await auth();

    if (!session || !session.user || !session.user.accessToken) {
        redirect("/login");
    }

    // Fetch the current profile from the backend to get fields like birthdate and phone 
    // that might not be in the NextAuth session token initially.
    let backendProfile = null;

    try {
        backendProfile = await getUserProfile(session.user.accessToken);
    } catch (error) {
        console.error("Error fetching backend profile:", error);
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
