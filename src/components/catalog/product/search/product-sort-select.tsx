"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export const ProductSortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    if (event.target.value) {
      params.set("ordering", event.target.value);
    } else {
      params.delete("ordering");
    }
    params.set("page", "1"); // Reiniciamos a la primera página tras ordenar
    router.push(`?${params.toString()}`);
  };

  const currentOrdering = searchParams.get("ordering") || "";

  return (
    <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 } }}>
      <Select
        value={currentOrdering}
        onChange={handleChange}
        displayEmpty
        sx={{ bgcolor: "white", borderRadius: 2 }}
      >
        <MenuItem value="">Relevancia</MenuItem>
        <MenuItem value="relay___price_sale">Precio: Menor a Mayor</MenuItem>
        <MenuItem value="-relay___price_sale">Precio: Mayor a Menor</MenuItem>
      </Select>
    </FormControl>
  );
};