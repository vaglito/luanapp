"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Products } from "@/types/products.type";
import { Box, Typography, Button, Chip } from "@mui/material";
import { CardImage } from "./CardProduct/card-imagen";
import { CardStock } from "./CardProduct/card-stock";
import { PriceCard } from "./CardProduct/price-card";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { isRestrictedSubcategory } from "@/utils/restricted";
import VisibilityIcon from '@mui/icons-material/Visibility';

export const CardProduct = ({
  product,
  exchange,
}: {
  product: Products;
  exchange: number;
}) => {
  const isRestricted = isRestrictedSubcategory(
    product.relay.subcategoryCode.subcategoryweb
  );
  const router = useRouter();
  const brandName = product.relay.classificationCode?.brandName || "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // Glassmorphism Card Style
        backgroundColor: "rgba(255, 255, 255, 0.95)", // Slightly more opaque
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          // Neon Glow Effect (Cyan #00E5FF)
          boxShadow: "0 0 20px rgba(0, 229, 255, 0.25), 0 0 0 1px rgba(0, 229, 255, 0.2)",
        },
      }}
    >
      {/* 1. Image Section */}
      <Box sx={{ p: 0, position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "transparent", borderBottom: "none" }}>
        <CardImage product={product} />

        {/* Brand Badge */}
        {brandName && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              zIndex: 1,
            }}
          >
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {brandName}
            </Typography>
          </Box>
        )}
      </Box>

      {/* 2. Content Section */}
      <Link href={`/productos/detalle/${product.slug}`} style={{ textDecoration: 'none', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>

          {/* Product Code */}
          <Typography variant="caption" color="primary.main" sx={{ fontSize: "0.7rem", fontWeight: 600, mb: 0.5, opacity: 0.8 }}>
            SKU: {product.relay.productId}
          </Typography>

          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-inter)", // Override orbitron for better readability on long titles
              lineHeight: 1.4,
              fontWeight: 600,
              color: "text.primary",
              fontSize: "0.95rem",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              height: "2.8em", // Fixed height for alignment
              mb: 2,
              transition: "color 0.2s",
              "&:hover": { color: "primary.main" },
            }}
            title={product.relay.productName}
          >
            {product.relay.productName}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Price & Stock */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {isRestricted ? (
              <Chip
                icon={<ReportProblemIcon fontSize="small" />}
                label="Consultar Precio"
                color="error"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            ) : (
              <PriceCard
                priceSale={product.relay.priceSale}
                priceBulk={product.relay.priceBulk}
                exchange={exchange}
              />
            )}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
              <CardStock stock={product.relay.totalStock} cod={''} />
            </Box>
          </Box>

        </Box>
      </Link>

      {/* 3. Action Button (Animated) */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained" // Default material contained
          color="primary"      // Use theme primary (Purple)
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/productos/detalle/${product.slug}`)
          }}
          startIcon={<VisibilityIcon />}
          sx={{
            borderRadius: "12px",
            textTransform: "uppercase",
            fontFamily: "var(--font-orbitron)",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            py: 1.2,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(89, 20, 163, 0.3)", // Purple glow
            }
          }}
        >
          Ver Detalles
        </Button>
      </Box>
    </Box>
  );
};
