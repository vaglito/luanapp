"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, TextField } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Estado local para controlar el valor del campo de búsqueda
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  // Actualiza el estado cuando los parámetros de la URL cambian
  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    // Actualiza el término de búsqueda
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Reinicia el parámetro `page` si existe
    if (params.has("page")) {
      params.delete("page");
    }

    // Reemplaza la URL con los nuevos parámetros
    replace(`/buscar?${params.toString()}`);
  }, 300);

  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: "100%", md: "75%" },
      }}
    >
      <TextField
        id="search"
        label="Buscar producto..."
        variant="outlined"
        value={searchTerm} // Vincula el estado al campo de búsqueda
        onChange={(e) => {
          const term = e.target.value;
          setSearchTerm(term); // Actualiza el estado local
          handleSearch(term); // Llama a la función de búsqueda
        }}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}
