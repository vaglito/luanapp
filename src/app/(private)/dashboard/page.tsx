import { Grid2 } from "@mui/material";
import { StatCard } from "@/app/components/dashboard/StatCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserRoles } from "@/app/lib/getUserRoles";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const roles = getUserRoles(session?.user);
  if (!session) {
    redirect("/login");
  }

  return (
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
  );
}
