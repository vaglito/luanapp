import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default async function SellerDashboard() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!session.user.isSeller && !session.user.isAdmin && !session.user.isSuperuser) {
    redirect("/dashboard");
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight="bold">Panel de Ventas</Typography>
    </Box>
  );
}
