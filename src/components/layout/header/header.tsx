import { Suspense } from "react";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Container,
  Skeleton,
  AppBar,
  Toolbar,
  alpha,
  useTheme,
} from "@mui/material";
import { Search } from "../search";
import { CartIconButton } from "./CartIconButton";
import { MobileHeader } from "./MobileHeader";
import { HeaderAuthActions } from "./HeaderAuthActions";
import { CategoryDropdown } from "./CategoryDropdown";
import { Brands } from "@/types/brands.type";
import { DesktopNavLinks } from "./DesktopNavLinks";

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
      }}
    >
      {/* ===== MOBILE ===== */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <MobileHeader
          logo={logo}
          exchange={exchange}
          brands={brands}
          session={session}
        />
      </Box>

      {/* ===== DESKTOP 2-ROW ===== */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {/* Row 1: Logo | Search | Cart | Auth */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                py: 1.5,
              }}
            >
              {/* Logo */}
              <Box sx={{ flexShrink: 0 }}>
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto", maxWidth: 220 }}
                    priority
                  />
                </Link>
              </Box>

              {/* Search */}
              <Box sx={{ flex: 1, maxWidth: 500, mx: "auto" }}>
                <Suspense fallback={<Skeleton height={42} />}>
                  <Search />
                </Suspense>
              </Box>

              {/* Actions */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CartIconButton exchange={exchange} />
                <HeaderAuthActions session={session} />
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Row 2: Navbar — Categories + links */}
        <AppBar
          component="nav"
          position="static"
          elevation={0}
          sx={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            backgroundColor: alpha("#5914A3", 0.9),
            borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ minHeight: 48, px: { xs: 0, sm: 0 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CategoryDropdown brands={brands} />
                <DesktopNavLinks />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </Box>
  );
}
