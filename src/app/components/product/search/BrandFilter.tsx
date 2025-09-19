"use client";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
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

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(Array(checked.length).fill(isChecked));

    const params = new URLSearchParams(searchParams.toString());
    params.delete("marca");

    if (isChecked && brands) {
      brands.results.forEach((b) => params.append("marca", b.slug));
    }

    // 🔹 resetear siempre a página 1
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

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

  const allChecked = checked.length > 0 && checked.every(Boolean);
  const someChecked = checked.some(Boolean) && !allChecked;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        label="Todas las marcas"
        control={
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={handleParentChange}
          />
        }
      />

      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {brands?.results.map((brand, index) => (
          <FormControlLabel
            key={brand.slug}
            label={brand.sopsub2.nom_sub2}
            control={
              <Checkbox
                checked={checked[index] || false}
                onChange={handleChildChange(index, brand.slug)}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};
