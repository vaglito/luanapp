"use client";

import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

import { useDashboardMenu } from "@/app/hooks/useDashboardMenu";

export function DashboardSidebar() {
  const menu = useDashboardMenu();

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "background.paper",
        height: "100vh",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={700}>Mi Cuenta</Typography>
      </Box>

      {menu.map((section) => (
        <Box key={section.section}>
          <Divider />

          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 1,
              color: "text.secondary",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {section.section}
          </Typography>

          <List disablePadding>
            {section.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <ListItemButton>
                  {item.icon && (
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
