"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

export const CategoryFilter = ({ query }: { query: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get("subcategoria");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await fetch(
          `https://luanatech.pe/api/v2.0/categorys/search?search=${query}`
        );
        const data = await response.json();
        setCategories(data.results);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubCategory();
  }, [query]);

  const handleClick = (subcategorySlug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (subcategorySlug) {
      params.set("subcategoria", subcategorySlug);
    } else {
      params.delete("subcategoria");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box>

      <Button
        variant={!currentCategory ? "contained" : "outlined"}
        color="primary"
        size="small"
        onClick={() => handleClick()}
        sx={{ mb: 2 }}
      >
        Todas las categorías
      </Button>

      {categories.map((category: any) => (
        <Box key={category.id} sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom color="text.primary" sx={{ fontWeight: 600 }}>
            {category.soplinea.nom_line}
          </Typography>
          <Stack spacing={1}>
            {category.subcategories.map((sub: any) => (
              <Button
                key={sub.pk}
                variant={currentCategory === sub.slug ? "contained" : "outlined"}
                color="primary"
                size="small"
                onClick={() => handleClick(sub.slug)}
              >
                {sub.sopsub1.nom_sub1}
              </Button>
            ))}
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};
