"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Result } from "@/app/types/products";

export function Filters({ product }: { product: Result[] }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const categories = Array.from(
    new Map(
      product.map((p) => [
        p.sopprod.cod_cate.subcategory?.slug || p.sopprod.cod_cate.nom_sub1,
        p.sopprod.cod_cate.nom_sub1,
      ])
    )
  );

  const brands = Array.from(
    new Map(
      product.map((p) => [
        p.sopprod.cod_subc.nom_sub2,
        p.sopprod.cod_subc.trademark?.slug || p.sopprod.cod_subc.cod_sub2,
      ])
    )
  );

  const handleFilterChange = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(filter, value);
    } else {
      params.delete(filter);
    }

    // 🔥 Resetear page a 1 cuando cambian los filtros
    if (params.has("page")) {
      params.set("page", "1");
    }

    replace(`/buscar?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginBottom: 3,
      }}
    >
      {/* Filtro de Marca */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Marca</InputLabel>
        <Select
          value={searchParams.get("marca") || ""}
          onChange={(e) => handleFilterChange("marca", e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {brands.map(([name, slug]) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filtro de Subcategoría */}
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Subcategoría</InputLabel>
        <Select
          value={searchParams.get("subcategoria") || ""}
          onChange={(e) => handleFilterChange("subcategoria", e.target.value)}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map(([slug, name]) => (
            <MenuItem key={slug} value={slug}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
