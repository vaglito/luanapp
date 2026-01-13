import { Box } from "@mui/material";
import { DashboardSidebar } from "@/app/components/dashboard/DashboardSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
  adminUI,
}: {
  children: React.ReactNode;
  adminUI: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  const user = session?.user;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardSidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>{user.isAdmin ? adminUI : children}</Box>
      </Box>
    </Box>
  );
}
