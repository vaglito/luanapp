import { Box, Typography } from "@mui/material";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BannersClient } from "./BannersClient";
import { getBanners } from "@/services/dashboard/admin/banner";

// Función mock para simular la petición a tu API/BD de los Banners.
// Deberás reemplazarla por tu llamada a la base de datos o API.

export default async function BannersPage() {
  const session = await auth();

  // Validamos si el usuario existe
  if (!session?.user) {
    redirect("/login");
  }

  // Restringir el acceso únicamente a administradores
  if (!session.user.isAdmin && !session.user.isSuperuser) {
    redirect("/dashboard"); // Redirige a un panel seguro si no tiene permisos
  }

  // Recuperar los datos desde el servidor (SSR)
  const banners = await getBanners();

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        fontFamily="Inter"
        sx={{ mb: 3 }}
      >
        Gestión de Banners
      </Typography>
      <BannersClient initialBanners={banners} />
    </Box>
  );
}
