"use client";

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Link from "next/link";

export interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

const defaultIcon = (
  <SearchOffIcon sx={{ fontSize: 80, color: "#d1d5db", mb: 2 }} />
);

const defaultPrimaryAction: EmptyStateAction = {
  label: "Volver al catálogo",
  href: "/",
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = defaultIcon,
  title,
  description,
  primaryAction,
  secondaryAction,
}) => {
  const primary = primaryAction ?? defaultPrimaryAction;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: "center",
        borderRadius: 4,
        bgcolor: "#fff",
        border: "1px dashed #e5e7eb",
      }}
    >
      {icon}
      <Typography variant="h4" color="#545454" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
      >
        {description}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
        {primary.href != null && primary.href !== undefined ? (
          <Link href={primary.href} passHref style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#A3147F",
                borderRadius: 50,
                px: 4,
                "&:hover": { bgcolor: "#800e63" },
              }}
            >
              {primary.label}
            </Button>
          </Link>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={primary.onClick}
            sx={{
              bgcolor: "#A3147F",
              borderRadius: 50,
              px: 4,
              "&:hover": { bgcolor: "#800e63" },
            }}
          >
            {primary.label}
          </Button>
        )}

        {secondaryAction && (
          secondaryAction.href != null && secondaryAction.href !== undefined ? (
            <Link href={secondaryAction.href} passHref style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#A3147F",
                  color: "#A3147F",
                  borderRadius: 50,
                  px: 4,
                  "&:hover": {
                    borderColor: "#800e63",
                    bgcolor: "rgba(163, 20, 127, 0.04)",
                  },
                }}
              >
                {secondaryAction.label}
              </Button>
            </Link>
          ) : (
            <Button
              variant="outlined"
              size="large"
              onClick={secondaryAction.onClick}
              sx={{
                borderColor: "#A3147F",
                color: "#A3147F",
                borderRadius: 50,
                px: 4,
                "&:hover": {
                  borderColor: "#800e63",
                  bgcolor: "rgba(163, 20, 127, 0.04)",
                },
              }}
            >
              {secondaryAction.label}
            </Button>
          )
        )}
      </Box>
    </Paper>
  );
};

export default EmptyState;
