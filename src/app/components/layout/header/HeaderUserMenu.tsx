"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { logout } from "@/app/lib/auth/logout";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

export function HeaderUserMenu({ user }: { user: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        Hola, {user.name}
      </Typography>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: 2,
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => router.push("/profile")}>
          <PersonIcon fontSize="small" sx={{ mr: 1 }} />
          Mi perfil
        </MenuItem>

        <MenuItem onClick={() => router.push("/dashboard")}>
          <DashboardIcon fontSize="small" sx={{ mr: 1 }} />
          Dashboard
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => logout()} sx={{ color: "error.main" }}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Box>
  );
}
