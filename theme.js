"use client"
import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5914A3',
    },
    secondary: {
      main: '#A3147F',
    },
    background: {
      default: '#F9FAFB',
    },
    text: {
      primary: '#111827',
    },
    error: {
      main: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#9333EA',
    },
    success: {
      main: '#16A34A',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    subtitle2: {
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      lineHeight: 1.5,
    },
  },
});
