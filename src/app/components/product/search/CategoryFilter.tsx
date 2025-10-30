"use client";

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
import { Categories } from "@/app/types/categories.type";

export const CategoryFilter = ({
  query,
  data,
}: {
  query: string;
  data: Categories[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw = searchParams.get("subcategoria");
  const currentCategories = raw ? raw.split(",") : [];

  const handleCheckboxChange = (subcategorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedRaw = params.get("subcategoria");
    const selected = selectedRaw ? selectedRaw.split(",") : [];

    let updated: string[];

    if (selected.includes(subcategorySlug)) {
      updated = selected.filter((cat) => cat !== subcategorySlug);
    } else {
      updated = [...selected, subcategorySlug];
    }

    if (updated.length > 0) {
      params.set("subcategoria", updated.join(","));
    } else {
      params.delete("subcategoria");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleParentChange = (subcategories: string[], checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedRaw = params.get("subcategoria");
    const selected = selectedRaw ? selectedRaw.split(",") : [];

    let updated = selected.filter((slug) => !subcategories.includes(slug));

    if (checked) {
      updated = [...updated, ...subcategories];
    }

    if (updated.length > 0) {
      params.set("subcategoria", updated.join(","));
    } else {
      params.delete("subcategoria");
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subcategoria");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant={currentCategories.length === 0 ? "contained" : "outlined"}
        color="secondary"
        size="small"
        onClick={handleClearAll}
        sx={{ mb: 2 }}
      >
        Todas las categorías
      </Button>

      {data.map((category) => {
        const subSlugs = category.categoriesWeb.map(
          (s) => s.relay.subcategoryweb
        );
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
                  sx={{ color: "primary.main" }}
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {category.relay.categoryName}
                </Typography>
              }
            />

            {/* Subcategorías */}
            <Stack spacing={1} sx={{ ml: 3 }}>
              {category.categoriesWeb.map((sub) => (
                <FormControlLabel
                  key={sub.id}
                  control={
                    <Checkbox
                      checked={currentCategories.includes(
                        sub.relay.subcategoryweb
                      )}
                      onChange={() =>
                        handleCheckboxChange(sub.relay.subcategoryweb)
                      }
                      sx={{ color: "primary.main" }}
                    />
                  }
                  label={sub.relay.subcategoryName}
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
