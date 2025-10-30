import { Grid2, Box, Typography } from "@mui/material";
import { Brands } from "@/app/types/brands.type";
import { BrandCard } from "./brand-card";

export const GridBrand = ({ brands }: { brands: Brands[] }) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "white",
          p: 3,
          marginY: 4,
          borderRadius: 3,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h1" color="#545454" sx={{ fontWeight: "bold" }}>
          Marcas
        </Typography>
      </Box>
      <Grid2 container spacing={2}>
        {brands.map((brand) => (
          <Grid2 size={{ xs: 6, sm: 4, md: 4, lg: 3, xl: 3 }} key={brand.id}>
            <BrandCard brand={brand} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
