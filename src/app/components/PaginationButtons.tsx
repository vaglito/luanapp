"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // Page param
    params.set("page", page.toString());

    // Marca: soporta string y array
    if (Array.isArray(marca) && marca.length > 0) {
      params.delete("marca"); // limpiar antes de agregar
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
    <div className="flex gap-2 justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}
