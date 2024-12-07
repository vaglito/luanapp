"use client";
import { useState, useEffect } from 'react'
import { Skeleton, Grid2 } from "@mui/material";
import { useMediaQuery } from "@mui/material";

export function ProductSkeleton() {
  return (
    <Grid2 container spacing={2} my={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Grid2
          key={index}
          size={{ xs: 6, md: 4, lg: 3, xl: 3 }} // Tamaños según el breakpoint
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
            p: 2,
            width: "100%",
            maxWidth: "278px",
          }}
        >
          {/* Imagen del producto */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ borderRadius: "8px" }}
          />
          {/* Título del producto */}
          <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
          {/* Precio del producto */}
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
        </Grid2>
      ))}
    </Grid2>
  );
}
