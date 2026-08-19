"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const queryParam = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  // Reset the field when the URL query param changes externally (e.g. a
  // different search box navigates), without a setState-in-effect. This is
  // the "adjusting state during rendering" pattern React explicitly supports:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevQueryParam, setPrevQueryParam] = useState(queryParam);
  if (queryParam !== prevQueryParam) {
    setPrevQueryParam(queryParam);
    setSearchTerm(queryParam);
  }

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
