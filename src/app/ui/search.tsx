"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    // Actualiza el término de búsqueda
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Reinicia el parámetro `page` siempre que cambie el término de búsqueda
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
        defaultValue={searchParams.get("query") || ""}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        sx={{ width: "100%" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginLeft: 1 }}
      >
        <SearchIcon />
      </Button>
    </Box>
  );
}
