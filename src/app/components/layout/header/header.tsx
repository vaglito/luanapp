import { auth } from "@/auth";
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
import { ScrollHideWrapper } from "./ScrollHideWrapper";

export async function Header({ logo, exchange, brands }: any) {
  const session = await auth();

  return (
    <ScrollHideWrapper>
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease-in-out",
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
                <Image
                  src={logo}
                  alt="Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: 360,
                  }}
                  priority
                />
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
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Link href="/login">
                    <Button variant="text" startIcon={<LoginIcon />}>
                      Ingresar
                    </Button>
                  </Link>
                  <Link href="/registro">
                    <Button
                      variant="contained"
                      startIcon={<PersonIcon />}
                      sx={{ borderRadius: 2 }}
                    >
                      Registro
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
        <Navbar brands={brands} />
      </Box>
    </ScrollHideWrapper>
  );
}
