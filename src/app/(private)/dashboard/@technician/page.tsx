import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Box, Typography } from "@mui/material";

export default async function TechnicianDashboard() {
  const session = await auth();
  if (!session) redirect("/login");
  if (!session.user.isTechnician && !session.user.isAdmin && !session.user.isSuperuser) {
    redirect("/dashboard");
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">Panel Técnico</Typography>
    </Box>
  );
}
