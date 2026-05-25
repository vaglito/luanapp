"use client";
import React from "react";
import { Typography, TypographyProps, styled } from "@mui/material";

export type MyTypographyVariant = "hero" | "price" | "discount" | "tag" | "glass" | "body";
type GradientType = "brand" | "blue" | "gold" | "pink";

export interface TypographyWrapperProps extends Omit<TypographyProps, "variant"> {
  /** Activa la fuente Orbitron para estilos tecnológicos/gamer */
  orbitron?: boolean;
  /** Aplica degradados predefinidos de la marca */
  gradient?: GradientType;
  customVariant?: MyTypographyVariant;
  variant?: TypographyProps["variant"];
}

const gradients: Record<GradientType, string> = {
  brand: "linear-gradient(135deg, #1a237e 0%, #5914A3 50%, #A3147F 100%)",
  blue: "linear-gradient(45deg, #1a237e 30%, #534bae 90%)",
  gold: "linear-gradient(45deg, #FFD700 0%, #FDB931 50%, #A0522D 100%)",
  pink: "linear-gradient(135deg, #A3147F 0%, #ff8cc6 100%)",
};

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => !["customVariant", "orbitron", "gradient"].includes(prop as string),
})<TypographyWrapperProps>(({ theme, customVariant, orbitron, gradient }) => ({
  // Estilos base de fuente
  ...(orbitron && { fontFamily: "var(--font-orbitron)" }),

  // Manejo de degradados
  ...(gradient && {
    background: gradients[gradient],
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  }),

  // Variante: Hero (Para títulos de gran impacto en banners)
  ...(customVariant === "hero" && {
    fontWeight: 900,
    fontSize: "clamp(2rem, 8vw, 3rem)", // Responsivo: min 2.2rem, max 3.5rem
    lineHeight: 1.1,
    letterSpacing: "-0.04em",
    textTransform: "uppercase",
  }),

  // Variante: Body (Texto normal optimizado para lectura)
  ...(customVariant === "body" && {
    fontSize: "1rem",
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("md")]: {
      fontSize: "1.1rem",
    },
  }),

  // Variante: Price (Estilo especializado para precios)
  ...(customVariant === "price" && {
    fontFamily: "var(--font-inter)",
    fontWeight: 800,
    color: theme.palette.success.main,
    fontSize: "1.5rem",
    letterSpacing: "0.05em",
  }),

  // Variante: Tag (Para badges o categorías pequeñas)
  ...(customVariant === "tag" && {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    backgroundColor: "rgba(0,0,0,0.05)",
    fontSize: "0.75rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  }),

  // Variante: Glass (Texto con fondo de cristal, ideal para superponer en imágenes)
  ...(customVariant === "glass" && {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: theme.spacing(1, 2),
    borderRadius: "8px",
    color: theme.palette.common.white,
  }),
}));

/**
 * TypographyWrapper
 *
 * Un componente base estilizado que envuelve el Typography de MUI.
 * Implementa el enfoque "wrapper" para centralizar reglas de diseño de la marca Luana.
 */
export const TypographyWrapper = React.forwardRef<HTMLElement, TypographyWrapperProps>(
  ({ customVariant, variant, ...props }, ref) => {
    // Si no hay variante MUI definida, usamos body1 por defecto
    const muiBaseVariant = variant || "body1";

    return (
      <StyledTypography
        ref={ref}
        variant={muiBaseVariant}
        customVariant={customVariant}
        {...props}
      />
    );
  }
);

TypographyWrapper.displayName = "TypographyWrapper";