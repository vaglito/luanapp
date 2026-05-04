"use client";
import { useState } from "react";
import { Grid2, Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Brands } from "@/types/brands.type";
import { BrandCard } from "./brand-card";

export const GridBrand = ({ brands }: { brands: Brands[] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.relay.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          pt: 4,
          pb: 4,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.9) 100%)",
          borderRadius: 4,
          px: { xs: 3, md: 6 },
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(45deg, #1a237e 30%, #534bae 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Nuestras Marcas
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
        >
          Explora nuestra colección de marcas líderes y encuentra la calidad que
          buscas.
        </Typography>

        <TextField
          fullWidth
          placeholder="Buscar marca..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: "500px",
            backgroundColor: "white",
            borderRadius: "50px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              pr: 1,
              pl: 2,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid2 container spacing={3}>
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 2 }} key={brand.id}>
              <BrandCard brand={brand} />
            </Grid2>
          ))
        ) : (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron marcas que coincidan.
            </Typography>
          </Box>
        )}
      </Grid2>
    </Box>
  );
};

