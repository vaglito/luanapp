"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

// Extend Module for custom values if needed, or stick to standard first
export const themeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#5914A3", // Luana Purple
            light: "#8a4fbb",
            dark: "#3d0e72",
        },
        secondary: {
            main: "#A3147F", // Magenta
            light: "#c55fa8",
            dark: "#720e59",
        },
        background: {
            default: "#F9FAFB",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111827",
            secondary: "#6B7280",
        },
        error: {
            main: "#DC2626",
        },
        warning: {
            main: "#F59E0B",
        },
        success: {
            main: "#16A34A",
        },
        // Custom logic usually goes here or via specific style overrides
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: "3rem",
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
        },
        h2: {
            fontSize: "2.25rem",
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
        },
        h3: {
            fontSize: "1.875rem",
            fontWeight: 600,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 500,
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: 1.5,
        },
        button: {
            textTransform: "none", // Modern UI rarely uses all-caps buttons
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12, // Modern default radius
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 40, // Pill shape buttons by default
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Sutil lift
                    },
                },
                containedPrimary: {
                    // Gradient can be applied here if we want universal gradient buttons
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // Disable tinted overlays in dark mode if we switch
                },
                elevation1: {
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    border: "1px solid #f0f0f0",
                    boxShadow: "none",
                }
            }
        }
    },
});
