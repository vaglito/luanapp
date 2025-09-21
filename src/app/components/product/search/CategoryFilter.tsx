"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Box,
  Typography,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ResponseCategories } from "@/app/types/v2/categorys-type";

export const CategoryFilter = ({
  query,
  categories,
}: {
  query: string;
  categories: ResponseCategories;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategories = searchParams.getAll("subcategoria");

  const handleCheckboxChange = (subcategorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selected = params.getAll("subcategoria");

    if (selected.includes(subcategorySlug)) {
      // quitar
      const updated = selected.filter((cat) => cat !== subcategorySlug);
      params.delete("subcategoria");
      updated.forEach((cat) => params.append("subcategoria", cat));
    } else {
      // agregar
      params.append("subcategoria", subcategorySlug);
    }

    params.set("page", "1"); // reset paginación
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleParentChange = (subcategories: string[], checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategoria");

    let selected = currentCategories.filter(
      (slug) => !subcategories.includes(slug)
    );

    if (checked) {
      selected = [...selected, ...subcategories];
    }

    selected.forEach((s) => params.append("subcategoria", s));
    params.set("page", "1"); // reset paginación
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategoria");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box>
      <Button
        variant={currentCategories.length === 0 ? "contained" : "outlined"}
        color="primary"
        size="small"
        onClick={handleClearAll}
        sx={{ mb: 2 }}
      >
        Todas las categorías
      </Button>

      {categories.results.map((category) => {
        const subSlugs = category.subcategories.map((s) => s.slug);
        const allChecked =
          subSlugs.every((slug) => currentCategories.includes(slug)) &&
          subSlugs.length > 0;
        const someChecked =
          subSlugs.some((slug) => currentCategories.includes(slug)) &&
          !allChecked;

        return (
          <Box key={category.id} sx={{ mb: 2 }}>
            {/* Checkbox padre */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={(e) =>
                    handleParentChange(subSlugs, e.target.checked)
                  }
                  color="primary"
                />
              }
              label={
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: 600 }}
                >
                  {category.soplinea.nom_line}
                </Typography>
              }
            />

            {/* Subcategorías */}
            <Stack spacing={1} sx={{ ml: 3 }}>
              {category.subcategories.map((sub) => (
                <FormControlLabel
                  key={sub.pk}
                  control={
                    <Checkbox
                      checked={currentCategories.includes(sub.slug)}
                      onChange={() => handleCheckboxChange(sub.slug)}
                      color="primary"
                    />
                  }
                  label={sub.sopsub1.nom_sub1}
                />
              ))}
            </Stack>

            <Divider sx={{ mt: 2 }} />
          </Box>
        );
      })}
    </Box>
  );
};
