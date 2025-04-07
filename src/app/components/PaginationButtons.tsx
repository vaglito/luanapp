import { Box, Button } from "@mui/material";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  query?: string;
  marca?: string;
  subcategoria?: string;
}

export const PaginationButtons = ({
  totalPages,
  currentPage,
  query = "",
  marca = "",
  subcategoria = "",
}: PaginationProps) => {
  return (
    <Box display="flex" justifyContent="center" mt={3} flexWrap="wrap">
      {Array.from({ length: totalPages }, (_, index) => {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (marca) params.set("marca", marca);
        if (subcategoria) params.set("subcategoria", subcategoria);
        params.set("page", (index + 1).toString());

        return (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            color={currentPage === index + 1 ? "primary" : "primary"}
            component={Link}
            href={`/buscar?${params.toString()}`}
            sx={{ mx: 0.5, my: 1 }}
          >
            {index + 1}
          </Button>
        );
      })}
    </Box>
  );
};
