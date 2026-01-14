import { Box } from "@mui/material";
import { DashboardSidebar } from "@/app/components/dashboard/DashboardSidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  admin,
  seller,
  technician,
  children,
}: {
  admin: React.ReactNode;
  seller: React.ReactNode;
  technician: React.ReactNode;
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  const user = session?.user;
  let activePanel = children;

  if (user.isAdmin) {
    activePanel = admin;
  } else if (user.isTechnician) {
    activePanel = technician;
  } else if (user.isSeller) {
    activePanel = seller;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardSidebar user={user} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>{activePanel}</Box>
      </Box>
    </Box>
  );
}
