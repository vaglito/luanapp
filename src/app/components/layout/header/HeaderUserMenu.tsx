"use client";

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
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/auth/logout";

export function HeaderUserMenu() {
  const { data: session } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!session) return null;

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
          {session.user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
          <Typography variant="subtitle2">
            {session.user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {session.user.email}
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

        <MenuItem onClick={logout} sx={{ color: "error.main" }}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
