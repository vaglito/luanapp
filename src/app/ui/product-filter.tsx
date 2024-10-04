"use client";
import { useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { ProductChart } from "@/app/ui/product-chart";
import BrandFilter from "@/app/ui/filters/brand-filter";
import { Result } from "../types/products";

interface ProductFilterClientProps {
  products: Result[];
}

export default function ProductFilter({ products }: ProductFilterClientProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Filtrar los productos según las marcas seleccionadas
  const filteredProducts = products.filter((product) =>
    selectedBrands.length === 0 || selectedBrands.includes(product.sopprod.cod_subc.nom_sub2)
  );

  const handleBrandChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  return (
    <Grid2 container spacing={4}>
      {/* Filtros de marcas */}
      <Grid2 size={{ md: 2 }} sx={{ display: { xs: "none", md: "block" } }}>
        <BrandFilter products={products} onBrandChange={handleBrandChange} />
      </Grid2>

      {/* Lista de productos filtrados */}
      <Grid2 size={{ xs: 12, md: 10 }}>
        {filteredProducts.length > 0 ? (
          <ProductChart products={filteredProducts} />
        ) : (
          <p>No se encontraron productos para esta subcategoría.</p>
        )}
      </Grid2>
    </Grid2>
  );
}
