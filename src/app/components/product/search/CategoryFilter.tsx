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
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {currentCategories.length > 0 && (
        <Button
          variant="text"
          color="secondary"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={handleClearAll}
          sx={{ mb: 2, alignSelf: "flex-start", textTransform: "none" }}
        >
          Limpiar categorías
        </Button>
      )}

      {data.map((category) => {
        const subSlugs = category.categoriesWeb.map(
          (s) => s.relay.subcategoryweb
        );
        const allChecked =
          subSlugs.length > 0 && subSlugs.every((slug) => currentCategories.includes(slug));
        const someChecked =
          subSlugs.some((slug) => currentCategories.includes(slug)) &&
          !allChecked;

        return (
          <Box key={category.id} sx={{ mb: 3 }}>
            {/* Checkbox padre */}
            <FormControlLabel
              control={
                <Checkbox
                  size="medium"
                  checked={allChecked}
                  indeterminate={someChecked}
                  onChange={(e) =>
                    handleParentChange(subSlugs, e.target.checked)
                  }
                  sx={{
                    color: "#9ca3af",
                    "&.Mui-checked": { color: "#5914A3" },
                    "&.MuiCheckbox-indeterminate": { color: "#5914A3" }
                  }}
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: 700, color: "#374151" }}>
                  {category.relay.categoryName}
                </Typography>
              }
            />

            {/* Subcategorías */}
            <Stack spacing={0.5} sx={{ ml: 4 }}>
              {category.categoriesWeb.map((sub) => (
                <FormControlLabel
                  key={sub.id}
                  control={
                    <Checkbox
                      size="small"
                      checked={currentCategories.includes(
                        sub.relay.subcategoryweb
                      )}
                      onChange={() =>
                        handleCheckboxChange(sub.relay.subcategoryweb)
                      }
                      sx={{
                        color: "#d1d5db",
                        "&.Mui-checked": { color: "#A3147F" }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                      {sub.relay.subcategoryName}
                    </Typography>
                  }
                />
              ))}
            </Stack>

            <Divider sx={{ mt: 3, opacity: 0.5 }} />
          </Box>
        );
      })}
    </Box>
  );
};
