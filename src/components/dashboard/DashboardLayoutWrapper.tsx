"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
} from "@mui/material";
import { User } from "next-auth";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardBottomNav } from "./DashboardBottomNav";

const SIDEBAR_WIDTH = 280;

interface DashboardLayoutWrapperProps {
  children: React.ReactNode;
  user: User;
}

export function DashboardLayoutWrapper({
  children,
  user,
}: DashboardLayoutWrapperProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <DashboardSidebar
      user={user}
      onCloseMobile={() => setMobileOpen(false)}
    />
  );

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* 
        Bottom App Bar (Mobile Only)
      */}
      <DashboardBottomNav
        user={user}
        onMenuClick={handleDrawerToggle}
      />

      {/* Mobile Drawer (Temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          zIndex: 1200, // Mobile overlay
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Native Sticky Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", sm: "block" },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: "sticky",
          // The Global Header is approx 80px-100px. 
          // We set top offset so it slides perfectly underneath.
          top: "80px", 
          // Height is constrained so internal menu scrolls without breaking document layout
          height: "calc(100vh - 80px)", 
          overflowY: "auto",
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
           // Subtle internal scrollbar
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "4px" },
        }}
      >
        {drawerContent}
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { xs: "100%", sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          pb: { xs: 10, sm: 2 }, // Extra space on mobile so Bottom Nav doesn't obscure content
          minHeight: "calc(100vh - 80px)", // Guarantee it pushes the footer down
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
