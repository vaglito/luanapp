"use client";
import React from "react";
import { Chip, ChipProps, alpha, styled } from "@mui/material";

export type MyChipVariant =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "neutral";

export interface MyChipProps extends Omit<ChipProps, "variant" | "color"> {
  /** Variante personalizada con estilo glassmorphism */
  customVariant?: MyChipVariant;
  /** Permite forzar el uso de variantes estándar de MUI si fuera necesario */
  variant?: ChipProps["variant"];
}

/**
 * Función que mapea los colores del tema a estilos Glassmorphism.
 * Para agregar variantes, solo necesitas añadir la clave al tipo MyChipVariant
 * y asegurar que exista en el palette de tu Theme.
 */
const variantStyles = (theme: any, customVariant: MyChipVariant = "primary") => {
  // Mapeo de colores base desde el tema
  const colorMapping: Record<MyChipVariant, string> = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    error: theme.palette.error.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    neutral: theme.palette.text.secondary,
  };

  const mainColor = colorMapping[customVariant];

  return {
    backgroundColor: alpha(mainColor, 0.08),
    color: mainColor,
    borderColor: alpha(mainColor, 0.25),
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid",
    boxShadow: `0 4px 12px 0 ${alpha(mainColor, 0.1)}`,
    "& .MuiChip-icon": {
      color: "inherit",
    },
    "& .MuiChip-label": {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  };
};

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "customVariant",
})<MyChipProps>(({ theme, customVariant }) => ({
  borderRadius: "8px", // Estilo más moderno y rectangular que el chip redondo estándar
  transition: "all 0.2s ease-in-out",
  height: "auto",
  padding: theme.spacing(0.5, 0),

  ...variantStyles(theme, customVariant),

  "&:hover": {
    backgroundColor: (customVariant && alpha(variantStyles(theme, customVariant).color, 0.15)) || "inherit",
    transform: "translateY(-1px)",
  },
}));

export const MyChip = React.forwardRef<HTMLDivElement, MyChipProps>(
  ({ customVariant = "primary", ...props }, ref) => {
    return <StyledChip ref={ref} customVariant={customVariant} {...props} />;
  }
);

MyChip.displayName = "MyChip";