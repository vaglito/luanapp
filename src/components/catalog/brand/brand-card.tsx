"use client";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Paper } from "@mui/material";
import { Brands } from "@/types/brands.type";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const BrandCard = ({ brand }: { brand: Brands }) => {
  return (
    <Link
      href={`/marcas/${brand.relay.brands}`}
      style={{ textDecoration: "none" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          backgroundColor: "white",
          borderRadius: 3,
          border: "1px solid #f0f0f0",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px -10px rgba(0, 0, 0, 0.15)",
            borderColor: "transparent",
            "& .brand-action": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 120,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            overflow: "hidden",
            borderRadius: 2,
            backgroundColor: "white",
          }}
        >
          <Image
            src={brand.image}
            alt={`Marca ${brand.relay.brandName}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain", padding: "16px" }}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#2d3436",
            textAlign: "center",
            mb: 1,
          }}
        >
          {brand.relay.brandName}
        </Typography>

        {/* Hover Action Indicator */}
        <Box
          className="brand-action"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            fontSize: "0.8rem",
            fontWeight: 600,
            opacity: 0,
            transform: "translateY(10px)",
            transition: "all 0.3s ease",
          }}
        >
          Ver productos <ArrowForwardIcon sx={{ fontSize: 16, ml: 0.5 }} />
        </Box>
      </Paper>
    </Link>
  );
};

