"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 2, mt: 1 }}
    >
      <Link
        href="/"
        underline="hover"
        color="inherit"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        <HomeIcon sx={{ fontSize: 18 }} />
        Inicio
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return isLast ? (
          <Typography
            key={item.label}
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            underline="hover"
            color="inherit"
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
