"use client"
import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5914A3",
    },
    secondary: {
      main: "#52FBFF",
    },
    error: {
      main: "#ff392a",
    },
    other: {
      main: "#A3147F",
    }
  },
  typography: {
    fontSize: 15,
    color: "#545454",
    h1: {
      fontWeight: 800,
      fontSize: 65,
    },
    h2: {
      fontWeight: 600,
      fontSize: 45,
    },
    h3: {
      fontSize: 35,
      fontWeight: 500,
    },
    h4: {
      fontSize: 25,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 18,
    },
    body1: {
      fontSize: 15,
    },
    button: {
      fontSize: 15,
      fontWeight: 600,
    },
  },
});
