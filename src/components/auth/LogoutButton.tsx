"use client";

import { logout } from "@/lib/auth/logout";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export function LogoutButton() {
  return (
    <Button color="error" startIcon={<LogoutIcon />} onClick={() => logout()}>
      Salir
    </Button>
  );
}

