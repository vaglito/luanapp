import { Box, Typography, Grid2 } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";



export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const { isSuperuser, isAdmin, isSeller, isTechnician } = session.user;

  if (isSuperuser || isAdmin) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel de Administración</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Usuarios Totales" value="15" /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Ventas del Mes" value="S/ 12,400" /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Tickets Abiertos" value="3" /></Grid2>
        </Grid2>
      </Box>
    );
  }

  if (isSeller) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel de Ventas</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Proformas Hoy" value="8" /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Ventas Cerradas" value="5" /></Grid2>
        </Grid2>
      </Box>
    );
  }

  if (isTechnician) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel Técnico</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Equipos en Reparación" value="12" /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Reparados Hoy" value="2" /></Grid2>
        </Grid2>
      </Box>
    );
  }

  // Fallback for Customer
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Mi Panel Principal</Typography>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <StatCard title="Pedidos" value="12" />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <StatCard title="Total Gastado" value="S/ 0.00" />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <StatCard title="Estado" value="Activo" />
        </Grid2>
      </Grid2>
    </Box>
  );
}

