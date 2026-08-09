"use client";

import Link from "next/link";
import { Box, Button, Typography, alpha, useTheme } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import { useCompare } from "@/hooks/use-compare";

export function CompareBar() {
  const theme = useTheme();
  const { items, removeItem, clearAll } = useCompare();

  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: alpha("#fff", 0.92),
        borderTop: "1px solid",
        borderColor: "divider",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        px: { xs: 2, sm: 4 },
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <CompareArrowsIcon sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography variant="body2" sx={{ fontWeight: 600, flexShrink: 0 }}>
          {items.length} producto{items.length > 1 ? "s" : ""} seleccionado{items.length > 1 ? "s" : ""}
        </Typography>

        {/* Mini thumbnails */}
        <Box sx={{ display: "flex", gap: 1, flex: 1, overflow: "hidden" }}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                position: "relative",
                width: 36,
                height: 36,
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                flexShrink: 0,
                bgcolor: "grey.100",
              }}
            >
              <Box
                component="img"
                src={item.productsimages?.[0]?.images || "/not-found.png"}
                alt={item.relay.productName}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                onClick={() => removeItem(item.id)}
                sx={{
                  position: "absolute",
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: 10,
                }}
              >
                <CloseIcon sx={{ fontSize: 10 }} />
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          component={Link}
          href="/comparar"
          variant="contained"
          size="small"
          disabled={items.length < 2}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            flexShrink: 0,
            boxShadow: "none",
          }}
        >
          Comparar
        </Button>

        <Button
          onClick={clearAll}
          size="small"
          sx={{
            textTransform: "none",
            color: "text.secondary",
            flexShrink: 0,
          }}
        >
          Limpiar
        </Button>
      </Box>
    </Box>
  );
}
