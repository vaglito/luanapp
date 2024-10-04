"use client";
import { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Result } from "@/app/types/products";

interface BrandFilterProps {
  products: Result[];
  onBrandChange: (selectedBrands: string[]) => void;
}

export default function BrandFilter({ products, onBrandChange }: BrandFilterProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Obtener las marcas únicas de los productos
  const brands = Array.from(
    new Set(products.map((product) => product.sopprod.cod_subc.nom_sub2))
  );

  const handleBrandChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onBrandChange(updatedBrands);
  };

  return (
    <Box>
      <Typography variant="h6">Filtrar por Marca</Typography>
      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </Box>
  );
}