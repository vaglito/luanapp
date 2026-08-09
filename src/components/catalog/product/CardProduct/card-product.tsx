"use client";
import { memo } from "react";
import Link from "next/link";
import { Products } from "@/types/products.type";
import { Box, Typography, Chip, alpha, useTheme } from "@mui/material";
import { CardImage } from "./card-imagen";
import { CardStock } from "./card-stock";
import { PriceCard } from "./price-card";
import { ProductBadge } from "./ProductBadge";
import { isRestrictedSubcategory } from "@/utils/restricted";
import { useCart } from "@/hooks/use-cart";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCompare } from "@/hooks/use-compare";

export const CardProduct = memo(function CardProduct({
  product,
  exchange,
}: {
  product: Products;
  exchange: number;
}) {
  const theme = useTheme();
  const { addItem } = useCart();
  const { isCompared, toggleItem } = useCompare();
  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb,
  );

  const hasDiscount = !isRestricted && product.relay.priceBulk > 0 && product.relay.priceBulk < product.relay.priceSale;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.relay.priceSale - product.relay.priceBulk) / product.relay.priceSale) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRestricted) return;
    addItem(product, 1);
  };

  return (
    <Link
      href={`/productos/detalle/${product.slug}`}
      style={{ textDecoration: "none", display: "flex" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          backgroundColor: alpha("#fff", 0.9),
          borderRadius: "16px",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.08),
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: "primary.light",
            boxShadow: "0 12px 32px rgba(89, 20, 163, 0.12)",
            "& .card-name": { color: "primary.main" },
            "& .add-cart-btn": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        {/* Badge */}
        {hasDiscount && <ProductBadge type="discount" label={`-${discountPercentage}%`} />}

        {/* Compare toggle */}
        <Box
          component="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            width: 32,
            height: 32,
            borderRadius: "8px",
            border: "1.5px solid",
            borderColor: isCompared(product.id) ? "primary.main" : "divider",
            bgcolor: isCompared(product.id) ? "primary.main" : "rgba(255,255,255,0.9)",
            color: isCompared(product.id) ? "white" : "text.secondary",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: isCompared(product.id) ? "primary.dark" : "primary.main",
              color: "white",
            },
          }}
          aria-label={isCompared(product.id) ? "Quitar de comparar" : "Comparar producto"}
        >
          {isCompared(product.id) ? (
            <CheckCircleIcon sx={{ fontSize: 16 }} />
          ) : (
            <CompareArrowsIcon sx={{ fontSize: 16 }} />
          )}
        </Box>

        {/* Image */}
        <Box sx={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
          <CardImage product={product} />
        </Box>

        {/* Content */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* Name */}
          <Typography
            className="card-name"
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              lineHeight: 1.3,
              transition: "color 0.2s",
            }}
            title={product.relay.productName}
          >
            {product.relay.productName}
          </Typography>

          {/* Price */}
          <Box sx={{ mt: "auto" }}>
            {isRestricted ? (
              <Chip
                icon={<ReportProblemIcon fontSize="small" />}
                label="Consultar Precio"
                color="error"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            ) : (
              <PriceCard
                priceSale={product.relay.priceSale}
                priceBulk={product.relay.priceBulk}
                exchange={exchange}
              />
            )}
          </Box>

          {/* Stock + Add to Cart */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 0.5,
            }}
          >
            <CardStock
              stock={product.relay.totalStock}
              cod={product.relay.productId}
            />

            {/* Desktop-only add to cart button */}
            {!isRestricted && (
              <Box
                className="add-cart-btn"
                component="button"
                onClick={handleAddToCart}
                sx={{
                  display: { xs: "none", md: "inline-flex" },
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  border: "none",
                  bgcolor: "primary.main",
                  color: "white",
                  cursor: "pointer",
                  opacity: 0,
                  transform: "translateY(8px)",
                  transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  flexShrink: 0,
                  ml: 1,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "scale(1.1) !important",
                  },
                }}
                aria-label="Agregar al carrito"
              >
                <AddShoppingCartIcon sx={{ fontSize: 18 }} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
});
