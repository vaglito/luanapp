"use client";
import { Box, Typography, Card, CardContent, CardMedia, Chip, Button } from "@mui/material";
import Link from "next/link";
import { Products } from "@/types/products.type";
import { getPrice } from "@/utils/price-product";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";

interface CardRankingProps {
    product: Products;
    rank: number;
    exchange: number;
}

export const CardRanking = ({ product, rank, exchange }: CardRankingProps) => {
    const price = getPrice(product, exchange);
    const slug = `/productos/detalle/${product.slug}`;

    // Rank Colors
    const getRankColor = (p: number) => {
        if (p === 1) return "linear-gradient(135deg, #FFD700 0%, #FDB931 100%)"; // Gold
        if (p === 2) return "linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)"; // Silver
        if (p === 3) return "linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)"; // Bronze
        return "rgba(255, 255, 255, 0.1)"; // Others
    };

    const isTop3 = rank <= 3;

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                mb: 3,
                borderRadius: "20px",
                overflow: "visible", // for badge
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: isTop3 ? "1px solid rgba(89, 20, 163, 0.2)" : "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.05)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                position: "relative",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(89, 20, 163, 0.15)",
                },
            }}
        >
            {/* Rank Badge */}
            <Box
                sx={{
                    position: "absolute",
                    top: -10,
                    left: -10,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: getRankColor(rank),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    zIndex: 10,
                    border: "2px solid white",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "var(--font-orbitron)",
                        fontWeight: 800,
                        color: isTop3 ? "white" : "text.secondary",
                        textShadow: isTop3 ? "0 2px 4px rgba(0,0,0,0.3)" : "none",
                    }}
                >
                    {rank}
                </Typography>
            </Box>

            {/* Image */}
            <Box
                sx={{
                    width: { xs: "100%", sm: 220 },
                    minWidth: { sm: 220 },
                    height: { xs: 200, sm: "auto" },
                    position: "relative",
                    bgcolor: "white",
                    borderRadius: { xs: "20px 20px 0 0", sm: "20px 0 0 20px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <CardMedia
                    component="img"
                    image={product.productsimages[0] ? product.productsimages[0].images : "/img/placeholder.png"}
                    alt={product.relay.productName}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.05)" }
                    }}
                />
            </Box>

            {/* Content */}
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", p: { xs: 3, md: 4 } }}>
                <Box sx={{ mb: 1 }}>
                    {isTop3 && (
                        <Chip
                            icon={<StarIcon style={{ color: "white" }} />}
                            label="Más Buscado"
                            size="small"
                            sx={{
                                bgcolor: "#5914A3",
                                color: "white",
                                fontWeight: 700,
                                mb: 1,
                                fontFamily: "var(--font-orbitron)"
                            }}
                        />
                    )}
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                            fontFamily: "var(--font-inter)",
                            fontWeight: 700,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            mb: 1,
                            fontSize: { xs: "1.1rem", md: "1.25rem" }
                        }}
                    >
                        {product.relay.productName}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 2 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "var(--font-orbitron)",
                            fontWeight: 700,
                            color: "primary.main"
                        }}
                    >
                        S/ {price.price}
                    </Typography>
                    {price.discount > 0 && (
                        <Typography
                            variant="body1"
                            sx={{
                                textDecoration: "line-through",
                                color: "text.secondary",
                                fontSize: "1rem"
                            }}
                        >
                            S/ {price.priceb}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
                    <Link href={slug} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="text"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                fontWeight: 700,
                                "&:hover": { bgcolor: "transparent", textDecoration: "underline" }
                            }}
                        >
                            Ver Detalles
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};
