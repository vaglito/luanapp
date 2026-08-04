"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { LinearProgress, Box } from "@mui/material";

export function SearchLoadingProgress() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const mountedRef = useRef(false);

  const paramsKey = searchParams.toString();

  useEffect(() => {
    // Skip the initial mount — only react to subsequent param changes
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    // Clear any pending debounce timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Immediately hide any existing indicator
    setShow(false);

    // After 300ms of no further param changes, show the loading indicator
    debounceRef.current = setTimeout(() => {
      setShow(true);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [paramsKey]);

  // Auto-hide after 5 seconds as a safety net
  useEffect(() => {
    if (!show) return;

    const autoHide = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(autoHide);
  }, [show]);

  if (!show) return null;

  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <LinearProgress
        sx={{
          height: 4,
          "& .MuiLinearProgress-bar": {
            bgcolor: "#A3147F",
          },
        }}
      />
    </Box>
  );
}

export default SearchLoadingProgress;
