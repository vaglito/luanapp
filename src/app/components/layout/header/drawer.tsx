"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface NavLink {
  id: number;
  title: string;
  path: string;
}

interface DrawerMobileProps {
  navlinks: NavLink[];
}

export function DrawerMobile({ navlinks }: DrawerMobileProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ marginY: 2, marginX: 1 }}>
        <Link href="/">
          <Image
            src="/logo-corporacion-luana.jpg"
            width={0}
            height={0}
            alt="Logo de corporacion luana mobile"
            sizes="100vw"
            className="h-full w-full"
          />
        </Link>
      </Box>
      <Divider />
      <List>
        {navlinks.map((links) => (
          <Link key={links.id} href={links.path}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={links.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
