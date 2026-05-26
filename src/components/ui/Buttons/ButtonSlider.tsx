"use client";
import React from "react";
import { IconButton, IconButtonProps, alpha, styled } from "@mui/material";

interface ButtonSliderProps extends IconButtonProps {
  /** El icono que se mostrará dentro del botón */
  icon: React.ReactNode;
  /** Define si el botón se posiciona a la izquierda o derecha */
  side: "left" | "right";
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "side",
})<Omit<ButtonSliderProps, "icon">>(({ theme, side }) => ({
  display: "flex", // Visible en todos los breakpoints por defecto
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 100, // Aumentamos para asegurar visibilidad sobre el slider
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  width: 40,
  height: 40,
  [theme.breakpoints.up("sm")]: {
    width: 48,
    height: 48,
  },
  color: theme.palette.primary.main,
  border: "1px solid rgba(255,255,255,0.8)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  // Lógica de posicionamiento responsivo
  ...(side === "left"
    ? {
        left: 8, // Más espacio desde el borde izquierdo en móviles
        [theme.breakpoints.up("sm")]: { left: -10 },
        [theme.breakpoints.up("md")]: { left: -20 },
      }
    : {
        right: 8, // Más espacio desde el borde derecho en móviles
        [theme.breakpoints.up("sm")]: { right: -10 },
        [theme.breakpoints.up("md")]: { right: -20 },
      }),

  "&:hover": {
    backgroundColor: alpha("#fff", 0.9),
    color: "#5914A3",
    transform: "translateY(-50%) scale(1.1)",
    boxShadow: "0 8px 25px rgba(89, 20, 163, 0.25)",
  },
  // Estilo cuando Swiper desactiva el botón (ej. al inicio o final)
  "&.swiper-button-disabled": {
    opacity: 0.3, // En lugar de 0, para que se vea que existe pero no es clickeable
    cursor: "default",
    pointerEvents: "none",
  },
  // Asegurar que el icono interno tenga un tamaño consistente
  "& .MuiSvgIcon-root": {
    fontSize: 24,
  },
}));

export const ButtonSlider = ({ icon, side, ...props }: ButtonSliderProps) => {
  return (
    <StyledIconButton side={side} {...props}>
      {icon}
    </StyledIconButton>
  );
};
