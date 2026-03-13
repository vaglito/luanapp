"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("query", searchTerm);
    }
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
        placeholder="Buscar producto..."
        variant="outlined"
        hiddenLabel
        value={searchTerm}
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
