import { Suspense } from "react";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Skeleton } from "@mui/material";

import { Navbar } from "./navbar";
import { Search } from "../search";
import { CartIconButton } from "./CartIconButton";
import { MobileHeader } from "./MobileHeader";
import { HeaderAuthActions } from "./HeaderAuthActions";

import { Brands } from "@/types/brands.type";

interface HeaderProps {
  logo: string;
  exchange: number;
  brands: Brands[];
}

export async function Header({ logo, exchange, brands }: HeaderProps) {
  const authSession = await auth();
  const session = (authSession as any)?.error === "RefreshAccessTokenError" ? null : authSession;

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* ===== MOBILE HEADER (xs only) ===== */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileHeader
          logo={logo}
          exchange={exchange}
          brands={brands}
          session={session}
        />
      </Box>

      {/* ===== DESKTOP HEADER (sm and up) ===== */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
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
                  style={{ width: "100%", height: "auto", maxWidth: 360 }}
                  priority
                />
              </Link>
            </Box>

            {/* SEARCH */}
            <Box sx={{ flexGrow: 1, maxWidth: 600 }}>
              <Suspense fallback={<Skeleton height={40} />}>
                <Search />
              </Suspense>
            </Box>

            {/* ACTIONS */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CartIconButton exchange={exchange} />
              <HeaderAuthActions session={session} />
            </Box>
          </Box>
        </Container>
        {/* Desktop purple nav bar */}
        <Navbar brands={brands} />
      </Box>
    </Box>
  );
}
