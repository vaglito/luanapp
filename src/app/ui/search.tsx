"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Box, TextField, Button } from "@mui/material";
import { useDebouncedCallback } from 'use-debounce';
import SearchIcon from "@mui/icons-material/Search";

export function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
  
    const handleSearch = useDebouncedCallback((term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
          replace(`/buscar?${params.toString()}`);
        }, 300);
  
    return (
      <Box
         // Ejecuta búsqueda al hacer submit
        sx={{
          display: "flex",
          width: { xs: "100%", md: "75%" },
        }}
      >
        <TextField
          id="search"
          label="Buscar producto..."
          variant="outlined"
          defaultValue={searchParams.get('query')?.toString()} // Vincula el valor del estado
          onChange={(e) => {
            handleSearch(e.target.value);
          }} // Maneja el cambio en el input
          sx={{ width: "100%" }}
        />
        <Button
          type="submit" // Especifica que es un botón de tipo submit
          variant="contained"
          sx={{ marginLeft: 1 }}
        >
          <SearchIcon />
        </Button>
      </Box>
    );
  }