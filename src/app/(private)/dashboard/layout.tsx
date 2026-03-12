import { Box } from "@mui/material";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  const user = session?.user;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardSidebar user={user} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}

