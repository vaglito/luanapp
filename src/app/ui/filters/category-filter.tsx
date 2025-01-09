"use client"
import { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Result } from "@/app/types/products";

interface CategoryFilterProps {
  products: Result[];
  onCategoryChange: (selectedCategory: string[]) => void;
}

export function CategoryFilter({products, onCategoryChange}: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  // Obtener las marcas únicas de los productos
  const categories = Array.from(
    new Set(products.map((product) => product.sopprod.cod_cate.nom_sub1))
  );

  const handleCategoryChange = (category: string) => {
    const updatedCategory = selectedCategory.includes(category)
      ? selectedCategory.filter((c) => c !== category)
      : [...selectedCategory, category];

    setSelectedCategory(updatedCategory);
    onCategoryChange(updatedCategory);
  };

  return (
    <Box>
      <Typography variant="h6">Filtrar por Categoría</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategory.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
}