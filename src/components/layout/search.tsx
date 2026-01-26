"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Estado local para controlar el valor del campo de búsqueda
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  // Actualiza el estado cuando los parámetros de la URL cambian
  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Si hay un término de búsqueda, agrégalo
    if (searchTerm) {
      params.set("query", searchTerm);
    }

    // 🔥 Elimina `marca` y `subcategoria` cuando cambia la búsqueda
    replace(`/buscar?${params.toString()}`);
  };

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
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ width: "100%" }}
      />
    </Box>
  );
}
