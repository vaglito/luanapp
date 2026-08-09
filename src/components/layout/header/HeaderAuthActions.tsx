"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Session } from "next-auth";
import { useCart } from "@/hooks/use-cart";

import { HeaderUserMenu } from "./HeaderUserMenu";

export function HeaderAuthActions({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/registro";
  const displaySession = isAuthPage ? null : session;

  // Forzamos limpieza profunda si caímos en la página de login pero quedó sesión fantasma
  useEffect(() => {
    if (session && isAuthPage) {
      useCart.getState().removeAll();
      signOut({ redirect: false }).then(() => {
        router.refresh();
      });
    }
  }, [session, isAuthPage, router]);

  if (displaySession) {
    return <HeaderUserMenu user={displaySession.user} />;
  }

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Button
        component={Link}
        href="/login"
        variant="text"
        startIcon={<LoginIcon />}
        sx={{
          color: "text.secondary",
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 1.5,
          px: 2,
          "&:hover": { bgcolor: "action.hover", color: "primary.main" },
        }}
      >
        Ingresar
      </Button>
      <Button
        component={Link}
        href="/registro"
        variant="contained"
        startIcon={<PersonAddIcon />}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 1.5,
          px: 2.5,
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 12px rgba(89,20,163,0.3)" },
        }}
      >
        Registro
      </Button>
    </Box>
  );
}
