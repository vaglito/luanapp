// src/components/layout/Header.tsx
import { auth } from "@/auth"; // Tu configuración de Auth.js
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Button, Divider, Skeleton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

import { Navbar } from "./navbar";
import { Search } from "../search";
import { HeaderUserMenu } from "./HeaderUserMenu";
import { CartIconButton } from "./CartIconButton";

export async function Header({ logo, exchange, brands }: any) {
  // Obtenemos la sesión en el servidor. Es mucho más rápido que useSession.
  const session = await auth();

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            py: 2,
          }}
        >
          {/* LOGO */}
          <Box sx={{ flexShrink: 0 }}>
            <Link href="/">
              <Image src={logo} alt="Logo" width={200} height={50} priority />
            </Link>
          </Box>

          {/* SEARCH */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 600 }}>
              <Suspense fallback={<Skeleton height={40} />}>
                <Search />
              </Suspense>
            </Box>
          </Box>

          {/* ACTIONS */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* El carrito necesita estado, así que es un Client Component pequeño */}
            <CartIconButton exchange={exchange} />

            <Divider orientation="vertical" flexItem sx={{ height: 24 }} />

            {session ? (
              // Si hay sesión, pasamos los datos al menú de cliente
              <HeaderUserMenu user={session.user} />
            ) : (
              // Si no hay sesión, mostramos botones de navegación simples
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="text"
                  startIcon={<LoginIcon />}
                  component={Link}
                  href="/login"
                >
                  Ingresar
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  component={Link}
                  href="/register"
                  sx={{ borderRadius: 2 }}
                >
                  Crear cuenta
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
      <Navbar brands={brands} />
    </Box>
  );
}
