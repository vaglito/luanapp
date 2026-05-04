"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import { Session } from "next-auth";

import { HeaderUserMenu } from "./HeaderUserMenu";

export function HeaderAuthActions({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/registro";
  const displaySession = isAuthPage ? null : session;

  // Forzamos limpieza profunda si caímos en la página de login pero quedó sesión fantasma
  useEffect(() => {
    if (session && isAuthPage) {
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
      <Link href="/login">
        <Button variant="text" startIcon={<LoginIcon />}>
          Ingresar
        </Button>
      </Link>
      <Link href="/registro">
        <Button variant="contained" startIcon={<PersonIcon />} sx={{ borderRadius: 2 }}>
          Registro
        </Button>
      </Link>
    </Box>
  );
}