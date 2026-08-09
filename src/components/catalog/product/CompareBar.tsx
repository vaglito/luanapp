"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, Button, Typography, alpha, useTheme, Grow, Fade } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CloseIcon from "@mui/icons-material/Close";
import { useCompare } from "@/hooks/use-compare";
import { convertUsdToPen } from "@/lib/currency";
import { Products } from "@/types/products.type";

export function CompareBar({ exchange = 3.75 }: { exchange?: number }) {
  const theme = useTheme();
  const { items, removeItem, clearAll } = useCompare();

  const prevItemsRef = useRef<Products[]>([]);
  const [exitingProducts, setExitingProducts] = useState<Products[]>([]);

  useEffect(() => {
    const prevIds = prevItemsRef.current.map((i) => i.id);
    const currentIds = items.map((i) => i.id);

    const removed = prevIds.filter((id) => !currentIds.includes(id));
    if (removed.length > 0) {
      const removedProducts = prevItemsRef.current.filter((p) =>
        removed.includes(p.id)
      );
      setExitingProducts((prev) => [...prev, ...removedProducts]);
      const timer = setTimeout(() => {
        setExitingProducts((prev) =>
          prev.filter((p) => !removed.includes(p.id))
        );
      }, 300);
      return () => clearTimeout(timer);
    }

    prevItemsRef.current = items;
  }, [items]);

  if (items.length === 0 && exitingProducts.length === 0) return null;

  const allProducts = [...items, ...exitingProducts.filter((ep) => !items.some((i) => i.id === ep.id))];

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

        {/* Thumbnails with name + price */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flex: 1,
            overflow: "hidden",
            alignItems: "flex-end",
          }}
        >
          {allProducts.map((item) => {
            const isExiting = exitingProducts.some((ep) => ep.id === item.id);
            const content = (
              <Box
                key={item.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                  maxWidth: 80,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 44,
                    height: 44,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "grey.100",
                  }}
                >
                  <Box
                    component="img"
                    src={item.productsimages?.[0]?.images || "/not-found.png"}
                    alt={item.relay.productName}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {!isExiting && (
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
                  )}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    fontWeight: 500,
                    mt: 0.3,
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 80,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.relay.productName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "primary.main",
                    lineHeight: 1.2,
                  }}
                >
                  S/. {convertUsdToPen(item.relay.priceSale, exchange).toFixed(2)}
                </Typography>
              </Box>
            );

            if (isExiting) {
              return (
                <Fade key={item.id} in={false} timeout={300}>
                  <Box sx={{ flexShrink: 0 }}>{content}</Box>
                </Fade>
              );
            }

            return (
              <Grow key={item.id} in={true} timeout={300}>
                <Box sx={{ flexShrink: 0 }}>{content}</Box>
              </Grow>
            );
          })}
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
