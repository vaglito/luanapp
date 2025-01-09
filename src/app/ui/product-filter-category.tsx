"use client";
import { useState } from "react";
import { Grid2, Box, Button } from "@mui/material";
import { ProductChart } from "@/app/ui/product-chart";
import { Result } from "../types/products";
import { CategoryFilter } from "./filters/category-filter";

interface ProductFilterClientProps {
  products: Result[];
}

export default function ProductFilterCategory({ products }: ProductFilterClientProps) {
  const [selectedCategory, setSelectedCategorys] = useState<string[]>([]);

  // Filtrar los productos según las marcas seleccionadas
  const filteredProducts = products.filter((product) =>
    selectedCategory.length === 0 || selectedCategory.includes(product.sopprod.cod_cate.nom_sub1)
  );


  const handleCategoryChange = (category: string[]) => {
    setSelectedCategorys(category);
  };

  return (
    <Grid2 container spacing={4}>
      {/* Filtros de marcas */}
      <Grid2 size={{ md: 2 }} sx={{ display: { xs: "none", md: "block" } }}>
        <CategoryFilter products={products} onCategoryChange={handleCategoryChange} />
      </Grid2>

      {/* Lista de productos filtrados */}
      <Grid2 size={{ xs: 12, md: 10 }}>
        {filteredProducts.length > 0 ? (
            <>
          <ProductChart products={filteredProducts} />
          </>
        ) : (
          <p>No se encontraron productos para esta subcategoría.</p>
        )}
      </Grid2>
    </Grid2>
  );
}
