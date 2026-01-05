"use client";

import { Box } from "@mui/material";
import { DashboardSidebar } from "@/app/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <DashboardSidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
