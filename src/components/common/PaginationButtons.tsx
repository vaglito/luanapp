"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  marca?: string | string[];
  subcategoria?: string | string[];
}

export function PaginationButtons({
  currentPage,
  totalPages,
  marca,
  subcategoria,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Page param
    params.set("page", page.toString());

    // Marca: soporta string y array
    if (Array.isArray(marca) && marca.length > 0) {
      params.delete("marca");
      marca.forEach((m) => params.append("marca", m));
    } else if (typeof marca === "string" && marca.trim() !== "") {
      params.set("marca", marca);
    } else {
      params.delete("marca");
    }

    // Subcategoria: soporta string y array
    if (Array.isArray(subcategoria) && subcategoria.length > 0) {
      params.delete("subcategoria");
      subcategoria.forEach((s) => params.append("subcategoria", s));
    } else if (typeof subcategoria === "string" && subcategoria.trim() !== "") {
      params.set("subcategoria", subcategoria);
    } else {
      params.delete("subcategoria");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2} alignItems="center" className="mt-4">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
}
