"use client";
import { Box, Typography, Button, Chip, Rating } from "@mui/material";
import Link from "next/link";
import { Products } from "@/types/products.type";
import { getPrice } from "@/utils/price-product";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface FeaturedProductProps {
    product: Products;
    exchange: number;
}

export const FeaturedProduct = ({ product, exchange }: FeaturedProductProps) => {
    const price = getPrice(product, exchange);
    const slug = `/productos/detalle/${product.slug}`;
    const brandName = product.relay.classificationCode?.brandName || "";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Horizontal on Desktop
                width: "100%",
                minHeight: "350px", // Reduced height for horizontal
                // Match CardProduct Glassmorphism
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                border: "2px solid rgba(255, 215, 0, 0.5)", // Gold border
                boxShadow: "0 10px 40px -10px rgba(255, 215, 0, 0.2)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 60px -10px rgba(255, 215, 0, 0.3)",
                    "& .product-image": {
                        transform: "scale(1.05)",
                    }
                }
            }}
        >
            {/* #1 Badge */}
            <Box
                sx={{
                    position: "absolute",
                    top: 24,
                    left: 24,
                    zIndex: 10,
                }}
            >
                <Chip
                    icon={<EmojiEventsIcon sx={{ color: "#5914A3 !important" }} />}
                    label="#1 MÁS BUSCADO"
                    sx={{
                        bgcolor: "#FFD700",
                        color: "#5914A3",
                        fontWeight: 800,
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "0.9rem",
                        height: "40px",
                        px: 1.5,
                        boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
                        "& .MuiChip-label": { px: 1 }
                    }}
                />
            </Box>

            {/* 1. Image Section (Left) */}
            <Box sx={{
                flex: { xs: "0 0 300px", md: "0 0 45%" },
                p: 4,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent"
            }}>
                {brandName && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 24,
                            right: 24,
                            bgcolor: "rgba(255,255,255,0.9)",
                            backdropFilter: "blur(4px)",
                            px: 2,
                            py: 0.8,
                            borderRadius: "8px",
                            border: "1px solid rgba(0,0,0,0.05)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            zIndex: 1,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {brandName}
                        </Typography>
                    </Box>
                )}

                {/* Abstract Bg */}
                <Box
                    sx={{
                        position: "absolute",
                        width: "80%",
                        height: "80%",
                        background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, rgba(255,255,255,0) 70%)",
                        borderRadius: "50%",
                        zIndex: 0
                    }}
                />

                <Box
                    className="product-image"
                    component="img"
                    src={product.productsimages[0] ? product.productsimages[0].images : "/img/placeholder.png"}
                    alt={product.relay.productName}
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        width: "80%",
                        height: "auto",
                        maxHeight: "300px",
                        objectFit: "contain",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.1))"
                    }}
                />
            </Box>

            {/* 2. Content Section (Right) */}
            <Box sx={{
                flex: 1,
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderLeft: { md: "1px solid rgba(0,0,0,0.05)" }
            }}>
                <Typography variant="caption" color="primary.main" sx={{ fontSize: "0.85rem", fontWeight: 600, mb: 1, opacity: 0.8 }}>
                    SKU: {product.relay.productId}
                </Typography>

                <Link href={slug} style={{ textDecoration: 'none' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 800,
                            color: "text.primary",
                            fontSize: { xs: "1.5rem", md: "2.2rem" },
                            lineHeight: 1.2,
                            mb: 2,
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            WebkitLineClamp: 2,
                            transition: "color 0.2s",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        {product.relay.productName}
                    </Typography>
                </Link>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
                    <Rating value={5} readOnly size="medium" sx={{ color: "#FFD700" }} />
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>
                        El favorito de la comunidad
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {/* Price & Action Row */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, alignItems: { xs: "flex-start", lg: "flex-end" }, justifyContent: "space-between", gap: 3 }}>
                    <Box>
                        {price.discount > 0 && (
                            <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.disabled", lineHeight: 1 }}>
                                S/ {price.priceb}
                            </Typography>
                        )}
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: "var(--font-orbitron)",
                                fontWeight: 800,
                                fontSize: "3rem",
                                color: "#5914A3",
                                letterSpacing: "-1px",
                                lineHeight: 1
                            }}
                        >
                            S/ {price.price}
                        </Typography>
                    </Box>

                    <Link href={slug} style={{ textDecoration: 'none', width: "100%", maxWidth: "250px" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                borderRadius: "14px",
                                py: 1.8,
                                fontSize: "1.1rem",
                                background: "#FFD700",
                                color: "#5914A3",
                                fontWeight: 800,
                                fontFamily: "var(--font-orbitron)",
                                boxShadow: "0 8px 20px rgba(255, 215, 0, 0.3)",
                                "&:hover": {
                                    background: "#FFC107",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 12px 25px rgba(255, 215, 0, 0.4)",
                                }
                            }}
                        >
                            Lo Quiero
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};
