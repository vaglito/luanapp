"use client";
import { createTheme } from "@mui/material/styles";
import { Orbitron, Inter } from "next/font/google";

// Definimos las fuentes aquí para que MUI las reconozca si fuera necesario, 
// aunque idealmente se usan las clases next/font en layout.
const orbitron = Orbitron({ subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const themeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5914A3", // Luana Purple (User RGB: 89, 20, 163)
            light: "#8a4fbb",
            dark: "#3d0e72",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#A3147F", // Magenta (User RGB: 163, 20, 127)
            light: "#c55fa8",
            dark: "#720e59",
            contrastText: "#FFFFFF",
        },
        info: {
            main: "#00E5FF", // Neon Cyan (User liked this)
            light: "#6EFFE8",
            dark: "#00B1CC",
        },
        background: {
            default: "#F3F4F6", // Gris muy claro para contraste limpio
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111827",
            secondary: "#4B5563",
        },
        action: {
            hover: "rgba(98, 0, 234, 0.08)",
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 800,
            fontSize: "2.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        h2: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: "0.02em",
        },
        h3: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 700,
            fontSize: "1.75rem",
        },
        h4: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 600,
        },
        h5: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 600,
        },
        h6: {
            fontFamily: orbitron.style.fontFamily,
            fontWeight: 600,
            letterSpacing: "0.02em",
        },
        subtitle1: {
            fontWeight: 500,
        },
        button: {
            fontFamily: inter.style.fontFamily, // Clean font
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: "none", // Normal case
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px", // Modern rounded
                    textTransform: "none",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    },
                },
                containedPrimary: {
                    background: "#5914A3", // Solid Color
                    "&:hover": {
                        background: "#4a0f8c",
                    }
                },
                outlined: {
                    borderWidth: "1px", // Standard border
                    "&:hover": {
                        borderWidth: "1px",
                        backgroundColor: "rgba(89, 20, 163, 0.04)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
                    transition: "all 0.3s ease",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                },
            },
        },
    },
});
