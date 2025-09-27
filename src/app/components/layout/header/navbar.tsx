"use client";
import { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { DrawerMobile } from "./drawer";


interface Props {
  window?: () => Window;
}

const navlinks = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
  },
  {
    id: 2,
    title: "Marcas",
    path: "/marcas",
  },
  {
    id: 3,
    title: "Nuestra Empresa",
    path: "/sobre-nosotros",
  },
  {
    id: 4,
    title: "Busca tu comprobante",
    path: "https://see.corporacionluana.pe/",
  },
];
const drawerWidth = 240;

export function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{}}>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navlinks.map((links) => (
              <Link href={links.path} key={links.id}>
                <Button sx={{ color: "#fff" }}>{links.title}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerMobile navlinks={navlinks}/>
        </Drawer>
      </nav>
    </Box>
  );
}
