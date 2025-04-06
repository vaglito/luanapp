"use client";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const BrandFilter = ({ query }: { query: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentBrand = searchParams.get("marca");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `https://luanatech.pe/api/v2.0/brands/search?search=${query}`
        );
        const data = await response.json();
        setBrands(data.results);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, [query]);

  const handleClick = (brandSlug?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (brandSlug) {
      params.set("marca", brandSlug);
    } else {
      params.delete("marca");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button
        variant={!currentBrand ? "contained" : "outlined"}
        size="small"
        color="primary"
        onClick={() => handleClick()}
      >
        Todas las marcas
      </Button>

      {brands.map((brand: any) => (
        <Button
          key={brand.slug}
          variant={currentBrand === brand.slug ? "contained" : "outlined"}
          size="small"
          color="primary"
          onClick={() => handleClick(brand.slug)}
        >
          {brand.sopsub2.nom_sub2}
        </Button>
      ))}
    </Box>
  );
};
