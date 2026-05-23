"use client";
import React from "react";
import { Button, ButtonProps, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";

// 1. Definimos tus variantes de negocio
export type MyButtonVariant =
  | "submit"
  | "alert"
  | "checkout"
  | "info"
  | "text"
  | "details";

// 2. Creamos una interfaz que extienda las props de MUI Button
// Usamos Omit para que nuestra prop 'variant' sea la prioritaria o manejamos 'customVariant'
export interface MyButtonProps extends Omit<ButtonProps, "variant"> {
  customVariant?: MyButtonVariant;
  variant?: ButtonProps["variant"]; // Opcional: permitir variantes estándar de MUI también
}

// Definimos un mapa de estilos para mantener el código limpio y extensible
const variantStyles = (theme: any, customVariant?: MyButtonVariant) => {
  const glassBase = {
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  };

  const configs = {
    submit: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
      borderColor: alpha(theme.palette.primary.main, 0.2),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        borderColor: alpha(theme.palette.primary.main, 0.4),
      },
    },
    alert: {
      backgroundColor: alpha(theme.palette.error.main, 0.1),
      color: theme.palette.error.main,
      borderColor: alpha(theme.palette.error.main, 0.2),
      "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.2),
        borderColor: alpha(theme.palette.error.main, 0.4),
      },
    },
    checkout: {
      backgroundColor: alpha(theme.palette.success.main, 0.1),
      color: theme.palette.success.main,
      borderColor: alpha(theme.palette.success.main, 0.2),
      "&:hover": {
        backgroundColor: alpha(theme.palette.success.main, 0.2),
        borderColor: alpha(theme.palette.success.main, 0.4),
      },
    },
    info: {
      backgroundColor: alpha(theme.palette.info.main, 0.1),
      color: theme.palette.info.dark,
      borderColor: alpha(theme.palette.info.main, 0.2),
    },
    text: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      color: theme.palette.text.primary,
    },
    details: {
      backgroundColor: alpha("#FFC107", 0.15),
      color: "#856404",
      borderColor: alpha("#FFC107", 0.4),
    },
  };

  return customVariant ? { ...glassBase, ...configs[customVariant] } : {};
};

// 3. Componente estilizado con acceso a tus reglas de diseño
const StyledButton = styled(Button, {
  // Evitamos que 'customVariant' se propague al elemento HTML <button>
  shouldForwardProp: (prop) => prop !== "customVariant",
})<MyButtonProps>(({ theme, customVariant }) => ({
  // Estilos base
  borderRadius: "12px",
  /*   textTransform: "none", */
  fontWeight: 600,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  padding: theme.spacing(1.2, 4),
  position: "relative",
  overflow: "hidden",

  // Aplicamos los estilos de la variante usando nuestra función de configuración
  ...variantStyles(theme, customVariant),
}));

export const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ customVariant, variant, ...props }, ref) => {
    const muiBaseVariant = customVariant ? "text" : variant || "contained";

    return (
      <StyledButton
        ref={ref}
        customVariant={customVariant}
        variant={muiBaseVariant}
        {...props} // <-- Aquí viajan automáticamente startIcon o endIcon
      />
    );
  },
);

MyButton.displayName = "MyButton";
