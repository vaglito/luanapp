import { Box, Typography, Grid2 } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { getCachedSession } from "@/lib/getSession";
import { redirect } from "next/navigation";



export default async function DashboardPage() {
  const session = await getCachedSession();
  if (!session?.user) {
    redirect("/login");
  }

  const { isSuperuser, isAdmin, isSeller, isTechnician } = session.user;

  if (isSuperuser || isAdmin) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel de Administración</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Usuarios Totales" placeholder /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Ventas del Mes" placeholder /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Tickets Abiertos" placeholder /></Grid2>
        </Grid2>
      </Box>
    );
  }

  if (isSeller) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel de Ventas</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Proformas Hoy" placeholder /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Ventas Cerradas" placeholder /></Grid2>
        </Grid2>
      </Box>
    );
  }

  if (isTechnician) {
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Panel Técnico</Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Equipos en Reparación" placeholder /></Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}><StatCard title="Reparados Hoy" placeholder /></Grid2>
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
          <StatCard title="Pedidos" placeholder />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <StatCard title="Total Gastado" placeholder />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <StatCard title="Estado" placeholder />
        </Grid2>
      </Grid2>
    </Box>
  );
}

