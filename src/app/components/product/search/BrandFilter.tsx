"use client";
import { Box, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { ResponseBrands } from "@/app/types/v2/brands-type";

export const BrandFilter = ({
  query,
  brands,
}: {
  query: string;
  brands: ResponseBrands;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedBrands = searchParams.getAll("marca");
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      setChecked(
        brands.results.map((brand) => selectedBrands.includes(brand.slug))
      );
    };

    loadBrands();
  }, [query, searchParams]);

  const handleChildChange =
    (index: number, slug: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedChecked = [...checked];
      updatedChecked[index] = event.target.checked;
      setChecked(updatedChecked);

      const params = new URLSearchParams(searchParams.toString());
      let updatedSelected = params.getAll("marca");

      if (event.target.checked) {
        if (!updatedSelected.includes(slug)) {
          params.append("marca", slug);
        }
      } else {
        updatedSelected = updatedSelected.filter((s) => s !== slug);
        params.delete("marca");
        updatedSelected.forEach((s) => params.append("marca", s));
      }

      // 🔹 resetear siempre a página 1
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant={selectedBrands.length === 0 ? "contained" : "outlined"}
        size="small"
        color="secondary"
        onClick={handleClearAll}
        sx={{ mb: 2 }}
      >
        Todas las marcas
      </Button>

      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {brands?.results.map((brand, index) => (
          <FormControlLabel
            key={brand.slug}
            label={brand.sopsub2.nom_sub2}
            sx={{ fontWeight: 600}}
            control={
              <Checkbox
                checked={checked[index] || false}
                onChange={handleChildChange(index, brand.slug)}
                sx={{ color: "primary.main"}}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};
