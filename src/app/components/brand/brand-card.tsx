"use client";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { Brands } from "@/app/types/brands.type";

export const BrandCard = ({ brand }: { brand: Brands }) => {
  return (
    <Link href={`/marcas/${brand.relay.brands}`}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 20px rgb(203, 182, 214)",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={brand.image}
            alt={`Marca ${brand.relay.brandName}`}
            width={250}
            height={100}
            style={{ objectFit: "cover", borderRadius: 3 }}
          />
        </Box>
        <Typography
          sx={{
            lineHeight: 1.2,
            fontWeight: 600,
            color: "#545454",
            fontSize: { xs: "0.85rem", sm: "1rem" },
            textAlignLast: "center",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            textAlign: "justify",
            overflow: "hidden",
            WebkitLineClamp: 3,
            textOverflow: "ellipsis",
            transition: "color 0.2s",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {brand.relay.brandName}
        </Typography>
      </Box>
    </Link>
  );
};
