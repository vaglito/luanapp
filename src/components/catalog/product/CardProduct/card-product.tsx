"use client";
import { memo } from "react";
import Link from "next/link";
import { Products } from "@/types/products.type";
import { Box, Typography, Chip } from "@mui/material";
import { CardImage } from "./card-imagen";
import { CardStock } from "./card-stock";
import { PriceCard } from "./price-card";
import { ProductBadge } from "./ProductBadge";
import { isRestrictedSubcategory } from "@/utils/restricted";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export const CardProduct = memo(function CardProduct({
  product,
  exchange,
}: {
  product: Products;
  exchange: number;
}) {
  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb,
  );

  const hasDiscount = !isRestricted && product.relay.priceBulk > 0 && product.relay.priceBulk < product.relay.priceSale;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.relay.priceSale - product.relay.priceBulk) / product.relay.priceSale) * 100) 
    : 0;

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
          backgroundColor: "background.paper",
          borderRadius: "16px",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 24px rgba(89, 20, 163, 0.12)",
            borderColor: "primary.light",
            "& .card-name": { color: "primary.main" },
          },
        }}
      >
        {/* Badge */}
        {hasDiscount && <ProductBadge type="discount" label={`-${discountPercentage}%`} />}

        {/* Image */}
        <CardImage product={product} />

        {/* Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Name */}
          <Typography
            className="card-name"
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              lineHeight: 1.35,
              mb: 1.5,
              transition: "color 0.2s",
            }}
            title={product.relay.productName}
          >
            {product.relay.productName}
          </Typography>

          {/* Price + Stock */}
          <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 0.75 }}>
            {isRestricted ? (
              <Chip
                icon={<ReportProblemIcon fontSize="small" />}
                label="Consultar Precio"
                color="error"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600, alignSelf: "flex-start" }}
              />
            ) : (
              <PriceCard
                priceSale={product.relay.priceSale}
                priceBulk={product.relay.priceBulk}
                exchange={exchange}
              />
            )}

            <CardStock
              stock={product.relay.totalStock}
              cod={product.relay.productId}
            />
          </Box>
        </Box>
      </Box>
    </Link>
  );
});
